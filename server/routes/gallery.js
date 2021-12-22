const router = require('express').Router();
const imageController = require('../controllers').image;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const {
    API_URL1,
    API_URL3
} = process.env;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, path.resolve('../client/public/gallery'))
        cb(null, path.resolve('./build/gallery'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

// const galleryImagesUrl = API_URL1;
// const galleryImagesUrl = API_URL3;

const upload = multer({ storage: storage });

router.get('/getAllImages', async (req, res) => {
    const images = await imageController.getAll();
    res.json({ data: images });
});

router.get('/getAll-client', async (req, res) => {
    const images = await imageController.getAllClient();
    res.json({ data: images });
});

router.post('/add', upload.array('images'), async (req, res) => {
    const images = req.files;
    for (let index = 0; index < images.length - 2; index++) {
        const element = images[index];
        await imageController.create({
            product_id: null,
            fileName: element.filename,
            path: '/gallery/' + element.filename
        });
    }
    res.json({ data: images });
});

module.exports = router;
