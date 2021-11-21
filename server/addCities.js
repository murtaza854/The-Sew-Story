// open 'usa.csv' file and log the data to the console
const fs = require("fs");
const slugify = require('slugify');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const stateController = require('./controllers').state;
const cityController = require('./controllers').city;

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
    fs.readFile('usa.csv', 'utf8', function (err, contents) {
        if (err) {
            console.log('Error reading file: ' + err);
            return;
        }
        // split the contents into an array of strings
        var lines = contents.split('\n');
        const cities = [];
        const states = [];
        // loop over the lines
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i];
            // split the line into an array of strings
            var columns = line.split('|');
            // log the data to the console
            // console.log('City: ' + columns[0] + ', State: ' + columns[2], ', County: ' + columns[3]);
            try {
                if (columns[2] && !states.find(state => state.name === columns[2])) {
                    // console.log('State: ' + columns[2], slugify(columns[2], { lower: true }));
                    states.push({
                        name: columns[2],
                        slug: slugify(columns[2], { lower: true }),
                    });
                }
                if (columns[0] && !cities.find(city => city.name === columns[0])) {
                    cities.push({
                        name: columns[0],
                        slug: slugify(columns[0], { lower: true }),
                        state: slugify(columns[2], { lower: true }),
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
        cities.forEach(city => {
            stateController.findBySlug({ slug: city.state })
                .then(state => {
                    cityController.insertIfnotExist({
                        name: city.name,
                        slug: city.slug,
                        state_id: state.id,
                        active: true,
                    })
                        .then(city => {
                            console.log('Added');
                        })
                        .catch(err => {
                            // console.log(err);
                        });
                })
                .catch(err => {
                    // console.log(err);
                });
        });
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});