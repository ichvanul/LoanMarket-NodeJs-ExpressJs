require('dotenv').config();
const adviserModel = require('../models/adviser');
const miscHelper = require('../helpers/helpers');
const connection = require('../config/db');

module.exports = {
  getAdviser: (req, res) => {
    const page = req.query.page;
    const search = req.query.search;
    if (!page) {adviserModel.getData(search)
    .then((result) => {
      miscHelper.response(res, result, 200)
      console.log(page);
    })
    .catch(err => {
      miscHelper.response(res, {}, 400, err)
      console.log(err);
    })
  } else {connection.query("SELECT COUNT(*) as total FROM `adviser`", (err, result) => {
    const total = result[0].total;
    if(page > 0) {
      adviserModel.getPage(page, total)
      .then((result) => {
        miscHelper.response(res, result, 200)
      })
      .catch((err) => {
        miscHelper.response(res, {}, res.status, err)
      })
    }
  })
  }},

  adviserDetail: (req, res) => {
    const idAdviser = req.params.id_adviser
    adviserModel.adviserDetail(idAdviser)
    .then((result) => {
        miscHelper.response(res, result, 200);
    })
    .catch(err => console.log(err));
  },

  insertAdviser: (req, res) => {
    const {name} = req.body
    const data = {
      name
    }
    menuModel.insertAdviser(data)
    .then((result) => {
      res.send(result);
    })
    .catch(err => console.log(err));
  },

  updateAdviser: (req, res) => {
    const idAdviser = req.params.id
    const {name} = req.body
    const data = {
      name
    }
    menuModel.updateAdviser(idAdviser, data)
    .then((resutlt) => {
      res.send(result);
    })
    .catch(err => console.log(err));
  },

  deleteAdviser: (req, res) => {
    const idAdviser = req.params.id
    adviserModel.deleteAdviser(idAdviser)
    .then((result) => {
      res.send(result);
    })
    .catch(err => console.log(err));
  },
}