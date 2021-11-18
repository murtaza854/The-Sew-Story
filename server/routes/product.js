const router = require('express').Router();
const productController = require('../controllers').product;
const imageController = require('../controllers').image;
const detailController = require('../controllers').detail;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

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
        console.log(data);
        console.log(req.files);
        const obj = await productController.create({
            name: data.name,
            slug: slugify(data.name),
            productCode: data.productCode,
            story: data.story,
            storyImageFileName: images[images.length - 1].filename,
            storyImagePath: '/productUploads/' + images[images.length - 1].filename,
            active: data.active,
            category_id: data.category.id,
            price: data.price,
            quantity: data.quantity
        });
        console.log(obj);
        data.details.forEach(async (detail) => {
            await detailController.create({
                product_id: obj.id,
                label: detail.label,
                text: detail.text,
                type_id: detail.type
            });
        });
        console.log('detailController');
        for (let index = 0; index < images.length - 1; index++) {
            const element = images[index];
            await imageController.create({
                product_id: obj.id,
                fileName: element.filename,
                path: '/productUploads/' + element.filename
            });
        }
        console.log('imageController');
        res.json({ data: obj });
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