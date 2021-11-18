const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const path = require('path');
const dotenv = require('dotenv');
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
    origin: [API_URL1, API_URL2]
    // origin: [API_URL3]
    // origin: '*'
}));
app.use(express.static('./build'));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const stateRoutes = require('./routes/state');
const countyRoutes = require('./routes/county');
const cityRoutes = require('./routes/city');
const cartRoutes = require('./routes/cart');
// const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const typeRoutes = require('./routes/type');


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/county', countyRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/type', typeRoutes);

app.get('/api/logged-in', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session || "";
        if (sessionCookie) {
            const user = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true);
            if (user) {
                const displayName = user.name;
                const email = user.email;
                const emailVerified = user.emailVerified || user.email_verified;
                const admin = user.admin;
                if (!emailVerified) {
                    res.clearCookie("session");
                    res.json({ data: { displayName, email, emailVerified, admin } });
                } else {
                    res.json({ data: { displayName, email, emailVerified, admin } });
                }
            } else res.json({ data: null })
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

