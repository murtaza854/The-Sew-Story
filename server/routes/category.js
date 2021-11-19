const router = require('express').Router();
const categoryController = require('../controllers').category;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('../client/public/categoryUploads'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

router.get('/getAllCategories', async (req, res) => {
    try {
        const categories = await categoryController.getAll();
        res.json({ data: categories });
    } catch (error) {
        res.json({ data: [], error: error });
    }
});

router.post('/getById', async (req, res) => {
    try {
        const category = await categoryController.getById(req.body.id);
        res.json({ data: category });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const obj = await categoryController.create(
            {
                name: data.name,
                slug: slugify(data.name),
                active: data.active,
                comingSoon: data.comingSoon,
                homePage: data.homePage,
                ourStoryPage: data.ourStoryPage,
                fileName: req.file.filename,
                imagePath: '/categoryUploads/' + req.file.filename
            }
        );
        res.json({ data: obj });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithImage', upload.single('image'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        fs.unlinkSync(path.resolve('../client/public/categoryUploads/' + data.oldFileName));
        await categoryController.update(
            {
                id: data.id,
                name: data.name,
                slug: slugify(data.name),
                active: data.active,
                comingSoon: data.comingSoon,
                homePage: data.homePage,
                ourStoryPage: data.ourStoryPage,
                fileName: req.file.filename,
                imagePath: '/categoryUploads/' + req.file.filename
            }
        );
        const editObj = await categoryController.getById(data.id);
        res.json({ data: editObj });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

router.post('/updateWithoutImage', async (req, res) => {
    try {
        await categoryController.update({
            id: req.body.id,
            name: req.body.name,
            slug: slugify(req.body.name),
            active: req.body.active,
            comingSoon: req.body.comingSoon,
            homePage: req.body.homePage,
            ourStoryPage: req.body.ourStoryPage,
        });
        const editObj = await categoryController.getById(req.body.id);
        res.json({ data: editObj });
    } catch (error) {
        console.log(error);
        res.json({ data: null, error: error });
    }
});

module.exports = router;