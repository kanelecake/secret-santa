require('dotenv').config();

const database = require('./configs/database');

const coreRoutes = require('./routes/core.routes');
const groupRoutes = require('./routes/group.routes');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', coreRoutes);
app.use('/group', groupRoutes);

database.connect();
database.test();

app.listen(8080);
