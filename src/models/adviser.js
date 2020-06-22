const connection = require('../config/db');

module.exports = {
  getData: (search) => {
    return new Promise((resolve, reject) => {
      if(search) {
        connection.query("SELECT * FROM `adviser` WHERE name LIKE ?", [`%${search}%`], (err, result) => {
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }else{
        connection.query("SELECT * FROM `adviser`", (err, result) => {
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }
    })
  },

  adviserDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `adviser` WHERE id_adviser = ?", id, (err, result)=> {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getPage: (page, total) => {
    const dataPage = 8;
    const totalPage = total / dataPage;
    const firstDate = dataPage * page - dataPage;

    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `adviser` ORDER BY id_adviser ASC LIMIT ?, ?", [firstDate, dataPage], (err, result) => {
        if(!err){
          const thisPage = Math.ceil(totalPage);
          if(page <= thisPage){
            resolve([thisPage, `Total adviser: ${total}`, `Current Page: ${page}`, result])
          }else{
            reject(new Error(err))
          }
        }
      })
    })
  },

  insertAdviser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO `adviser` SET ?", data, (err, result) => {
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },

  updateAdviser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE `adviser` SET ? WHERE id_adviser = ?", [id, data], (err, result) => {
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },

  deleteAdviser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM `adviser` WHERE id_adviser = ?", id, (err, result) => {
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },
}