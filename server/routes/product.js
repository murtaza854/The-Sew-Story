const router = require('express').Router();
const productController = require('../controllers').product;
const imageController = require('../controllers').image;
const detailController = require('../controllers').detail;
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
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/productUploads'))
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await productController.getAll();
        res.json({ data: products });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post('/getById', async (req, res) => {
    try {
        const product = await productController.getById(req.body.id);
        res.json({ data: product });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

router.post('/add', upload.array('images'), async (req, res) => {
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
            productCode: data.productCode,
            story: data.story,
            storyImageFileName: images[images.length - 1].filename,
            storyImagePath: '/productUploads/' + images[images.length - 1].filename,
            storyWrittenBy: data.storyWrittenBy,
            active: data.active,
            category_id: data.category.id,
            price: data.price,
            quantity: data.quantity
        });
        data.details.forEach(async (detail) => {
            await detailController.create({
                product_id: obj.id,
                label: detail.label,
                text: detail.text,
                type_id: detail.type,
                order: detail.order
            });
        });
        for (let index = 0; index < images.length - 1; index++) {
            const element = images[index];
            await imageController.create({
                product_id: obj.id,
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
        const product = await stripe.products.create({
            id: obj.id,
            name: data.name,
            active: data.active,
            tax_code: 'txcd_99999999',
            images: stripeImages,
            url: `${API_URL1}/${obj.category.slug}/${obj.slug}`,
            // type: 'good',
        });
        const price = await stripe.prices.create({
            currency: 'USD',
            product: product.id,
            unit_amount: data.price * 100,
          });
        console.log(product);
        console.log(price);
        const productData = await productController.getById(obj.id);
        res.json({ data: productData });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithImage', upload.single('image'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        fs.unlinkSync(path.resolve('../client/public/productUploads/' + data.oldFileName));
        await productController.update(
            {
                id: data.id,
                name: data.name,
                slug: slugify(data.name),
                active: data.active,
                comingSoon: data.comingSoon,
                fileName: req.file.filename,
                imagePath: '/productUploads/' + req.file.filename
            }
        );
        const editObj = await productController.getById(data.id);
        res.json({ data: editObj });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithoutImage', async (req, res) => {
    try {
        await productController.update({
            id: req.body.id,
            name: req.body.name,
            slug: slugify(req.body.name),
            active: req.body.active,
            comingSoon: req.body.comingSoon
        });
        const editObj = await productController.getById(req.body.id);
        res.json({ data: editObj });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

module.exports = router;