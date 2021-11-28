const dotenv = require('dotenv');
dotenv.config();

const {
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
} = process.env;

function createMysqlDatabase(databaseName) {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: 'mysql'
    });
    connection.connect();
    // check if database already created
    connection.query('SHOW DATABASES LIKE "' + databaseName + '"', function (err, rows, fields) {
        if (err) throw err;
        if (rows.length === 0) {
            connection.query('CREATE DATABASE ' + databaseName, function (err, rows, fields) {
                if (err) throw err;
                console.log('Database created');
                connection.end();
            });
        } else {
            console.log('Database already exists');
            connection.end();
        }
    });
}

function runCommand(command) {
    const exec = require('child_process').exec;
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
        }
        console.log(stdout);
    });
}

function dropDatabase(databaseName) {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: DATABASE_HOST,
        user: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: 'mysql'
    });
    connection.connect();
    // check if database already dropped
    connection.query('SHOW DATABASES LIKE "' + databaseName + '"', function (err, rows, fields) {
        if (err) throw err;
        if (rows.length > 0) {
            connection.query('DROP DATABASE ' + databaseName, function (err, rows, fields) {
                if (err) throw err;
                console.log('Database dropped');
                connection.end();
            });
        } else {
            console.log('Database does not exist');
            connection.end();
        }
    });
}

async function main() {
    const databaseName = process.argv[2];
    const command = process.argv[3];
    if (!databaseName) {
        console.log('Please provide database name as first argument');
        return;
    }
    if (!command) {
        console.log('Please provide command as second argument');
        return;
    }
    if (command === 'create') {
        createMysqlDatabase(databaseName);
    } else if (command === 'migrate') {
        runCommand('npx sequelize-cli db:migrate');
    } else if (command === 'drop') {
        dropDatabase(databaseName);
    } else if (command === 'populate') {
        await runCommand('node addStates.js');
        await runCommand('node addCities.js');
    } else {
        console.log('Please provide valid command');
    }
}
main();