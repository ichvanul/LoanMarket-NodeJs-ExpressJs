const express = require('express');
const branch = require('./branch');
const adviser = require('./adviser');
const Router = express.Router();

Router.use('/branch', branch);
Router.use('/adviser', adviser);

module.exports = Router;