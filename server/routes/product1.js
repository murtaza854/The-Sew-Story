const router = require('express').Router();
const productController = require('../controllers').product;
const categoryController = require('../controllers').category;
const priceController = require('../controllers').price;
const imageController = require('../controllers').image;
const detailController = require('../controllers').detail;
const typeController = require('../controllers').type;
const couponController = require('../controllers').coupon;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');
const dotenv = require('dotenv');
dotenv.config();

const {
    API_URL1,
    API_URL2,
    API_URL3,
    STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_LIVE
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
// const stripe = require("stripe")(STRIPE_SECRET_KEY_LIVE);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/productUploads'))
        // cb(null, path.resolve('./build/productUploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/getAll-client', async (req, res) => {
    const { categorySlug, limit } = req.query;
    try {
        const category = await categoryController.findBySlug({
            slug: categorySlug
        });
        if (limit) {
            const products = await productController.getAllByCategoryId({
                category_id: category.id,
                limit: limit
            });
            const coupons = await couponController.getAllClient();
            res.json({ data: products, coupons });
        } else {
            const products = await productController.getAllByCategoryId({
                category_id: category.id
            });
            const coupons = await couponController.getAllClient();
            res.json({ data: products, coupons });
        }
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await productController.getAll();
        res.json({ data: products });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.get('/getProduct-client', async (req, res) => {
    const { slug } = req.query;
    try {
        const product = await productController.findBySlugClient({
            slug: slug
        });
        const types = await typeController.getAllClient();
        const coupons = await couponController.getAllClient();
        res.json({ data: product, types: types, coupons });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post('/getById', async (req, res) => {
    try {
        const product = await productController.getById(req.body.id);
        res.json({ data: product });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/add', upload.array('images'), async (req, res) => {
    let id = null;
    try {
        const data = JSON.parse(req.body.data);
        const images = req.files;
        let slug = slugify(data.name, { lower: true });
        while (true) {
            const product = await productController.findBySlug({ slug: slug });
            if (product) {
                if (parseInt(product.slug.split('-')[1]) > 0) {
                    slug = slug + '-' + parseInt(product.slug.split('-')[1]) + 1;
                } else {
                    slug = slug + '-1';
                }
            } else {
                break;
            }
        }
        const obj = await productController.create({
            name: data.name,
            slug: slug,
            shortDescription: data.shortDescription,
            productCode: data.productCode,
            story: data.story,
            storyImageFileName: images[images.length - 1].filename,
            storyImagePath: '/productUploads/' + images[images.length - 1].filename,
            storyWrittenBy: data.storyWrittenBy,
            active: data.active,
            category_id: data.category.id,
            quantity: data.quantity
        });
        id = obj.dataValues.id
        data.details.forEach(async (detail) => {
            await detailController.create({
                product_id: obj.dataValues.id,
                label: detail.label,
                text: detail.text,
                type_id: detail.type,
                order: detail.order
            });
        });
        for (let index = 0; index < images.length - 1; index++) {
            const element = images[index];
            await imageController.create({
                product_id: obj.dataValues.id,
                fileName: element.filename,
                path: '/productUploads/' + element.filename
            });
        }
        const stripeImages = [];
        for (let index = 0; index < images.length - 1; index++) {
            const element = images[index];
            stripeImages.push(API_URL1 + '/productUploads/' + element.filename);
            if (index === 7) {
                break;
            }
        }
        const category = await categoryController.getById(obj.dataValues.category_id);
        const product = await stripe.products.create({
            id: obj.dataValues.id,
            name: data.name,
            active: data.active,
            tax_code: 'txcd_99999999',
            images: stripeImages,
            url: `${API_URL1}/${category.slug}/${obj.dataValues.slug}`,
            // type: 'good',
        });
        const price = await stripe.prices.create({
            currency: 'USD',
            product: product.id,
            unit_amount: data.price * 100,
            tax_behavior: 'exclusive',
        });
        await priceController.create({
            id: price.id,
            product_id: obj.dataValues.id,
            amount: data.price,
            active: true
        });
        res.json({ data: true });
    } catch (error) {
        await productController.deleteById(id);
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithImage', upload.array('images'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const images = req.files;
        let slug = slugify(data.name, { lower: true });
        while (true) {
            const product = await productController.findBySlug({ slug: slug });
            if (product && data.name === product.name) {
                slug = product.slug;
                break;
            }
            if (product) {
                if (parseInt(product.slug.split('-')[1]) > 0) {
                    slug = slug + '-' + parseInt(product.slug.split('-')[1]) + 1;
                } else {
                    slug = slug + '-1';
                }
            } else {
                break;
            }
        }
        let storyImageFileName = data.storyOldFileName;
        let storyImagePath = '';
        let count = 0;
        if (data.storyImageToBeDeleted !== '') {
            count = 1;
            try {
                fs.unlinkSync(path.resolve('../client/public/productUploads/' + data.storyOldFileName));
                // fs.unlinkSync(path.resolve('./build/productUploads/' + data.storyOldFileName));
                storyImageFileName = images[images.length - 1].filename;
                storyImagePath = '/productUploads/' + images[images.length - 1].filename;
            } catch (error) {
                storyImageFileName = images[images.length - 1].filename;
                storyImagePath = '/productUploads/' + images[images.length - 1].filename;
            }
        }
        await productController.update({
            id: data.id,
            name: data.name,
            slug: slug,
            shortDescription: data.shortDescription,
            productCode: data.productCode,
            story: data.story,
            storyImageFileName: storyImageFileName,
            storyImagePath: storyImagePath,
            storyWrittenBy: data.storyWrittenBy,
            active: data.active,
            category_id: data.category.id,
            quantity: data.quantity
        });
        const obj = await productController.getById(data.id);
        await detailController.deleteByProductId({ product_id: data.id });
        data.details.forEach(async (detail) => {
            await detailController.create({
                product_id: data.id,
                label: detail.label,
                text: detail.text,
                type_id: detail.type,
                order: detail.order
            });
        });
        await imageController.deleteByFileNames({ fileNames: data.imagesToBeDeleted });
        data.imagesToBeDeleted.forEach(async (image) => {
            fs.unlinkSync(path.resolve('../client/public/productUploads/' + image));
            // fs.unlinkSync(path.resolve('./build/productUploads/' + image));
        });
        for (let index = 0; index < images.length - count; index++) {
            const element = images[index];
            await imageController.create({
                product_id: data.id,
                fileName: element.filename,
                path: '/productUploads/' + element.filename
            });
        }
        const stripeImages = [];
        for (let index = 0; index < images.length - count; index++) {
            const element = images[index];
            stripeImages.push(API_URL1 + '/productUploads/' + element.filename);
            if (index === 7) {
                break;
            }
        }
        const category = await categoryController.getById(obj.dataValues.category_id);
        const product = await stripe.products.update(obj.dataValues.id.toString(), {
            name: data.name,
            active: data.active,
            tax_code: 'txcd_99999999',
            images: stripeImages,
            url: `${API_URL1}/${category.slug}/${obj.dataValues.slug}`,
            // type: 'good',
        });
        const priceCurrentCheckActive = await priceController.checkIfAmountIsActive({ product_id: data.id, amount: data.price });
        if (priceCurrentCheckActive.amount === data.price) {
            res.json({ data: true });
        } else {
            await priceController.updateProductActiveFalse({ product_id: data.id, active: data.active });
            const prices = await stripe.prices.list({
                product: data.id,
            });
            prices.data.forEach(async (price) => {
                await stripe.prices.update(price.id, {
                    active: false,
                });
            });
            const price = await stripe.prices.create({
                currency: 'USD',
                product: product.id,
                unit_amount: data.price * 100,
                tax_behavior: 'exclusive',
            });
            await priceController.create({
                id: price.id,
                product_id: data.id,
                amount: data.price,
                active: true
            });
            res.json({ data: true });
        }
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithoutImage', async (req, res) => {
    try {
        let slug = slugify(req.body.name, { lower: true });
        while (true) {
            const product = await productController.findBySlug({ slug: slug });
            if (product && req.body.name === product.name) {
                slug = product.slug;
                break;
            }
            if (product) {
                if (parseInt(product.slug.split('-')[1]) > 0) {
                    slug = slug + '-' + parseInt(product.slug.split('-')[1]) + 1;
                } else {
                    slug = slug + '-1';
                }
            } else {
                break;
            }
        }
        let storyImageFileName = req.body.storyOldFileName;
        let storyImagePath = '';
        if (req.body.storyImageToBeDeleted !== '') {
            fs.unlinkSync(path.resolve('../client/public/productUploads/' + req.body.storyOldFileName));
            // fs.unlinkSync(path.resolve('./build/productUploads/' + req.body.storyOldFileName));
            storyImageFileName = images[images.length - 1].filename;
            storyImagePath = '/productUploads/' + images[images.length - 1].filename;
        }
        await productController.update({
            id: req.body.id,
            name: req.body.name,
            slug: slug,
            productCode: req.body.productCode,
            shortDescription: req.body.shortDescription,
            story: req.body.story,
            storyImageFileName: storyImageFileName,
            storyImagePath: storyImagePath,
            storyWrittenBy: req.body.storyWrittenBy,
            active: req.body.active,
            category_id: req.body.category.id,
            quantity: req.body.quantity
        });
        const obj = await productController.getById(req.body.id);
        await detailController.deleteByProductId({ product_id: req.body.id });
        req.body.details.forEach(async (detail) => {
            await detailController.create({
                product_id: req.body.id,
                label: detail.label,
                text: detail.text,
                type_id: detail.type,
                order: detail.order
            });
        });
        await imageController.deleteByFileNames({ fileNames: req.body.imagesToBeDeleted });
        req.body.imagesToBeDeleted.forEach(async (image) => {
            fs.unlinkSync(path.resolve('../client/public/productUploads/' + image));
            // fs.unlinkSync(path.resolve('./build/productUploads/' + image));
        });
        const category = await categoryController.getById(obj.dataValues.category_id);
        const product = await stripe.products.update(obj.dataValues.id.toString(), {
            name: req.body.name,
            active: req.body.active,
            tax_code: 'txcd_99999999',
            url: `${API_URL1}/${category.slug}/${obj.dataValues.slug}`,
            // type: 'good',
        });
        const priceCurrentCheckActive = await priceController.checkIfAmountIsActive({ product_id: req.body.id, amount: req.body.price });
        if (priceCurrentCheckActive.amount === req.body.price) {
            res.json({ data: true });
        } else {
            await priceController.updateProductActiveFalse({ product_id: req.body.id, active: req.body.active });
            const prices = await stripe.prices.list({
                product: data.id,
            });
            prices.data.forEach(async (price) => {
                await stripe.prices.update(price.id, {
                    active: false,
                });
            });
            const price = await stripe.prices.create({
                currency: 'USD',
                product: product.id,
                unit_amount: req.body.price * 100,
                tax_behavior: 'exclusive',
            });
            await priceController.create({
                id: price.id,
                product_id: req.body.id,
                amount: req.body.price,
                active: true
            });
            res.json({ data: true });
        }
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

module.exports = router;