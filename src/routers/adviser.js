const express = require('express');
const Router = express.Router();
const adviserController = require('../controller/adviser');
const cors = require('cors');

Router.get('/', adviserController.getAdviser)
Router.get('/:id_adviser', adviserController.adviserDetail)
Router.post('/', adviserController.insertAdviser)
Router.patch('./:id', adviserController.updateAdviser)
Router.delete('./:id', adviserController.deleteAdviser)

module.exports = Router;