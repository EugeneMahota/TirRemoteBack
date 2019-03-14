const express = require('express');
const mysql = require('mysql');
const config = require('./config/app');
const cors = require('cors');
const validator = require('express-validator');

const app = express();

app.use(cors(config.corsOptions));
app.use(validator());
app.use(express.static('public'));

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, () => {
    console.log('Start server!');
});