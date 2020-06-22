require('dotenv').config();
const branchModel = require('../models/branch');
const miscHelper = require('../helpers/helpers');
const connection = require('../config/db');

module.exports = {
  getBranch: (req, res) => {
    const page = req.query.page;
    const search = req.query.search;
    if (!page) {branchModel.getData(search)
    .then((result) => {
      miscHelper.response(res, result, 200)
      console.log(page);
    })
    .catch(err => {
      miscHelper.response(res, {}, 400, err)
      console.log(err);
    })
  } else {connection.query("SELECT COUNT(*) as total FROM `branch`", (err, result) => {
    const total = result[0].total;
    if(page > 0) {
      branchModel.getPage(page, total)
      .then((result) => {
        miscHelper.response(res, result, 200)
      })
      .catch((err) => {
        miscHelper.response(res, {}, res.status, err)
      })
    }
  })
  }},

  branchDetail: (req, res) => {
    const idBranch = req.params.id_branch
    branchModel.branchDetail(idBranch)
    .then((result) => {
        miscHelper.response(res, result, 200);
    })
    .catch(err => console.log(err));
  },

  insertBranch: (req, res) => {
    const {name, address, images} = req.body
    const data = {
      name,
      address,
      images,
    }
    menuModel.insertBranch(data)
    .then((result) => {
      res.send(result);
    })
    .catch(err => console.log(err));
  },

  updateBranch: (req, res) => {
    const idBranch = req.params.id
    const {name, address, images} = req.body
    const data = {
      name,
      address,
      images,
    }
    menuModel.updateBranch(idBranch, data)
    .then((resutlt) => {
      res.send(result);
    })
    .catch(err => console.log(err));
  },

  deleteBranch: (req, res) => {
    const idBranch = req.params.id
    menuModel.deleteBranch(idBranch)
    .then((result) => {
      res.send(result);
    })
    .catch(err => console.log(err));
  },
}