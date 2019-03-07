const express = require('express');
const mysql = require('mysql');
const config = require('./config/app');
const cors = require('cors');
const validator = require('express-validator');

const app = express();

app.use(cors(config.corsOptions));
app.use(validator());
app.use(express.static('public'));

function openConnection() {

    const connection = mysql.createConnection(config.dbConfig);

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(openConnection, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            openConnection();
        } else {
            throw err;
        }
    });

    module.exports = connection;
}

openConnection();


require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, () => {
    console.log('Start server!');
});