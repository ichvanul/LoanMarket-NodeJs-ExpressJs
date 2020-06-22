const express = require('express');
const Router = express.Router();
const branchController = require('../controller/branch');
const cors = require('cors');

Router.get('/', branchController.getBranch)
Router.get('/:id_branch', branchController.branchDetail)
Router.post('/', branchController.insertBranch)
Router.patch('./:id', branchController.updateBranch)
Router.delete('./:id', branchController.deleteBranch)

module.exports = Router;