const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
// const stripe = require("stripe")("Add your secret key");
dotenv.config();
const app = express();

const firebaseFile = require('./firebase');
const firebase = firebaseFile.firebase;
// const firebaseAdmin = firebaseFile.admin;

const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    COOKIE_SECRET,
    API_URL1,
    API_URL2,
    API_URL3,
    PORT,
} = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser(
    COOKIE_SECRET
));
app.use(cors({
    credentials: true,
    // origin: [API_URL1, API_URL2]
    origin: [API_URL3]
    // origin: '*'
}));
app.use(express.static('./build'));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/api/logged-in', async (req, res) => {
    try {
        const user = firebase.auth().currentUser;
        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const admin = idTokenResult.claims.admin;
            res.json({ data: { displayName, email, emailVerified, admin } });
        } else res.json({ data: null })
    } catch (error) {
        res.json({ data: null, error: error });
    }
});
app.get('*', function (req, res) {
    // res.sendFile('./build/index.html');
    res.sendFile(path.resolve('./build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

