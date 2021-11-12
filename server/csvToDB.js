// open 'usa.csv' file and log the data to the console
const fs = require("fs");
const slugify = require('slugify');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const stateController = require('./controllers').state;
const countyController = require('./controllers').county;
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
        const counties = [];
        // loop over the lines
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i];
            // split the line into an array of strings
            var columns = line.split('|');
            // log the data to the console
            // console.log('City: ' + columns[0] + ', State: ' + columns[2], ', County: ' + columns[3]);
            if (columns[2] && !states.find(state => state.name === columns[2])) {
                states.push({
                    name: columns[2],
                    slug: slugify(columns[2], { lower: true }),
                });
            }
            if (columns[3] && !counties.find(county => county.name === columns[3])) {
                counties.push({
                    name: columns[3],
                    slug: slugify(columns[3], { lower: true }),
                    state: slugify(columns[2], { lower: true }),
                });
            }
            if (columns[0] && !cities.find(city => city.name === columns[0]) && columns[3]) {
                cities.push({
                    name: columns[0],
                    slug: slugify(columns[0], { lower: true }),
                    county: slugify(columns[3], { lower: true }),
                });
            }
        }
        // states.forEach(state => {
        //     stateController.create({
        //         name: state.name,
        //         slug: state.slug,
        //     })
        //         .then(state => {
        //             console.log('Added');
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // });
        // counties.forEach(county => {
        //     stateController.findBySlug({ slug: county.state })
        //         .then(state => {
        //             countyController.create({
        //                 name: county.name,
        //                 slug: county.slug,
        //                 state_id: state.id,
        //             })
        //                 .then(county => {
        //                     console.log('Added');
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                 });
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // });
        cities.forEach(city => {
            countyController.findBySlug({ slug: city.county })
                .then(county => {
                    cityController.create({
                        name: city.name,
                        slug: city.slug,
                        county_id: county.id,
                    })
                        .then(city => {
                            console.log('Added');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});