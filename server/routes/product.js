const router = require('express').Router();
const Product = require('../schema').product;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/products'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.get('/table-data', async (req, res) => {
    const products = await Product.find({});
    if (!products) res.json({ data: [] });
    else res.json({ data: products });
});

router.get('/get-products', async (req, res) => {
    const products = await Product.find({}, { _id: 0 });
    if (!products) res.json({ data: [] });
    else res.json({ data: products });
});


router.post('/add', upload.single('image'), async (req, res) => {
    const data = JSON.parse(req.body.data);
    const newProduct = new Product({
        name: data.name,
        slug: slugify(data.name, { lower: true }),
        keywords: data.keywords,
        description: data.description,
        image: {
            data: fs.readFileSync((path.resolve('../client/public/products') + '/' + req.file.filename)),
            contentType: req.file.mimetype
        },
        featured: data.featured
    });
    newProduct.save();
    res.json({ data: 'success' });
});

router.post('/update', async (req, res) => {
    const data = req.body;
    const product = await Product.findOne({ _id: data._id });
    product.name = data.name;
    product.slug = slugify(data.name, { lower: true });
    product.keywords = data.keywords;
    product.description = data.description;
    product.save();
    res.json({ data: 'success' });
});

router.get('/get-by-ids', async (req, res) => {
    let id = '';
    if ('id' in req.query) id = req.query.id;
    const getIds = id.split(',');
    const products = await Product.find({ _id: getIds });
    if (!products) res.json({ data: [] });
    else res.json({ data: products });
});

router.post('/delete', async (req, res) => {
    try {
        // const data = req.body.data;
        // data.forEach(async category => {
        //     await AdPackage.deleteMany({ category: category._id });
        //     category.productCategories.forEach(async productCategory => {
        //         productCategory.productSubCategories.forEach(async productSubCategory => {
        //             await Product.deleteMany({ productSubCategory: productSubCategory._id });
        //         })
        //         await ProductSubCategory.deleteMany({ productCategory: productCategory._id });
        //     });
        //     await ProductCategory.deleteMany({ category: category._id });
        //     category.productBrands.forEach(async productBrand => {
        //         await Product.deleteMany({ productBrand: productBrand._id });
        //     });
        //     await ProductBrand.deleteMany({ category: category._id });
        // });
        // await Category.deleteMany({ _id: req.body.ids });
        res.json({ data: 'success' });
    } catch (error) {
        console.log(error);
        res.json({ data: 'failed' });
    }
});

module.exports = router;