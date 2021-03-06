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
        // cb(null, path.resolve('../client/public/productUploads'))
        cb(null, path.resolve('./build/productUploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// const productImagesUrl = API_URL1;
const productImagesUrl = API_URL3;

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
    const data = JSON.parse(req.body.data);
    const images = req.files;
    try {
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
        const stripeImages = [];
        for (let index = 0; index < images.length - 2; index++) {
            const element = images[index];
            stripeImages.push(API_URL1 + '/productUploads/' + element.filename);
            if (index === 7) {
                break;
            }
        }
        const storyImagePath = '/productUploads/' + images[images.length - 2].filename;
        const primaryImagePath = '/productUploads/' + images[images.length - 1].filename;
        const product = await stripe.products.create({
            name: data.name,
            statement_descriptor: data.productCode,
            active: data.active,
            tax_code: 'txcd_99999999',
            url: `${productImagesUrl}/${data.category.slug}/${slug}`,
        });
        const price = await stripe.prices.create({
            currency: 'USD',
            product: product.id,
            unit_amount: parseFloat(data.price) * 100,
            tax_behavior: data.taxBehavior,
        });
        await productController.create({
            id: product.id,
            name: data.name,
            slug: slug,
            image: primaryImagePath,
            shortDescription: data.shortDescription,
            productCode: data.productCode,
            story: data.story,
            storyImageFileName: images[images.length - 2].filename,
            storyImagePath: storyImagePath,
            storyWrittenBy: data.storyWrittenBy,
            active: data.active,
            category_id: data.category.id,
            quantity: data.quantity
        });
        for (let index = 0; index < images.length - 2; index++) {
            const element = images[index];
            await imageController.create({
                product_id: product.id,
                fileName: element.filename,
                path: '/productUploads/' + element.filename
            });
        }
        data.details.forEach(async (detail) => {
            await detailController.create({
                product_id: product.id,
                label: detail.label,
                text: detail.text,
                type_id: detail.type,
                order: detail.order
            });
        });
        await priceController.create({
            id: price.id,
            product_id: product.id,
            amount: data.price,
            active: true,
            taxBehavior: data.taxBehavior
        });
        // await stripe.products.update(product.id, {
        //     images: stripeImages
        // });
        res.json({ data: true });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/removeImage', async (req, res) => {
    const { imageURL } = req.body;
    try {
        const fileName = imageURL.split('/productUploads/')[1];
        const filePath = path.resolve('../client/public/productUploads/' + fileName);
        // fs.unlinkSync(filePath);
        const deleted = await imageController.delete({
            fileName: fileName
        });
        if (deleted[0]) fs.unlinkSync(filePath);
        res.json({ success: true });
    } catch (error) {
        res.json({ data: null, error: error });
    }
});

router.post('/update', upload.array('images'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const images = req.files;
    console.log(data);
    console.log(images);
    try {
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
        const stripeImages = [];
        for (let index = 0; index < images.length - parseInt(data.count); index++) {
            const element = images[index];
            stripeImages.push(API_URL1 + '/productUploads/' + element.filename);
            if (index === 7) {
                break;
            }
        }
        const storyImageFileName = data.storyImageToBeDeleted !== '' ? images[images.length - parseInt(data.count)].filename : null;
        const storyImagePath = data.storyImageToBeDeleted !== '' ? '/productUploads/' + images[images.length - parseInt(data.count)].filename : null;
        const primaryImageFileName = data.primaryImageToBeDeleted !== '' ? images[images.length - 1].filename : null;
        const primaryImagePath = data.primaryImageToBeDeleted !== '' ? '/productUploads/' + images[images.length - 1].filename : null;
        const product = await stripe.products.update(data.id, {
            name: data.name,
            statement_descriptor: data.productCode,
            active: data.active,
            url: `${productImagesUrl}/${data.category.slug}/${slug}`,
        });
        const priceCurrentCheckActive = await priceController.checkIfAmountIsActive({ product_id: data.id, amount: data.price });
        if (priceCurrentCheckActive.amount === data.price) {
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
                unit_amount: parseFloat(data.price) * 100,
                tax_behavior: data.taxBehavior,
            });
            await priceController.create({
                id: price.id,
                product_id: product.id,
                amount: data.price,
                active: true,
                taxBehavior: data.taxBehavior
            });
        }
        const values = {
            id: data.id,
            name: data.name,
            slug: slug,
            productCode: data.productCode,
            shortDescription: data.shortDescription,
            story: data.story,
            storyWrittenBy: data.storyWrittenBy,
            active: data.active,
            category_id: data.category.id,
            quantity: data.quantity
        };
        let count = 0;
        if (primaryImageFileName) {
            values.image = primaryImagePath;
            const fileName = data.primaryImageToBeDeleted.split('/productUploads/')[1];
            // const filePath = path.resolve('../client/public/productUploads/' + fileName);
            const filePath = path.resolve('./build/productUploads/' + fileName);
            fs.unlinkSync(filePath);
        }
        if (storyImageFileName) {
            values.storyImageFileName = storyImageFileName;
            values.storyImagePath = storyImagePath;
            const fileName = data.storyImageToBeDeleted;
            // const filePath = path.resolve('../client/public/productUploads/' + fileName);
            const filePath = path.resolve('./build/productUploads/' + fileName);
            fs.unlinkSync(filePath);
        }
        await productController.update(values);
        await imageController.deleteByFileNames({ fileNames: data.imagesToBeDeleted });
        data.imagesToBeDeleted.forEach(async (image) => {
            // fs.unlinkSync(path.resolve('../client/public/productUploads/' + image));
            fs.unlinkSync(path.resolve('./build/productUploads/' + image));
        });
        for (let index = 0; index < images.length - parseInt(data.count); index++) {
            const element = images[index];
            await imageController.create({
                product_id: data.id,
                fileName: element.filename,
                path: '/productUploads/' + element.filename
            });
        }
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
        res.json({ data: true });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

module.exports = router;