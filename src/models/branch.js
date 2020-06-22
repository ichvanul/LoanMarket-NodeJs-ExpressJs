const connection = require('../config/db');

module.exports = {
  getData: (search) => {
    return new Promise((resolve, reject) => {
      if(search) {
        connection.query("SELECT * FROM `branch` WHERE name LIKE ?", [`%${search}%`], (err, result) => {
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }else{
        connection.query("SELECT * FROM `branch`", (err, result) => {
          if(!err){
            resolve(result)
          }else{
            reject(new Error(err))
          }
        })
      }
    })
  },

  getPage: (page, total) => {
    const dataPage = 8;
    const totalPage = total / dataPage;
    const firstDate = dataPage * page - dataPage;

    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `branch` ORDER BY id_branch ASC LIMIT ?, ?", [firstDate, dataPage], (err, result) => {
        if(!err){
          const thisPage = Math.ceil(totalPage);
          if(page <= thisPage){
            resolve([thisPage, `Total branch: ${total}`, `Current Page: ${page}`, result])
          }else{
            reject(new Error(err))
          }
        }
      })
    })
  },

  insertBranch: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO `branch` SET ?", data, (err, result) => {
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },

  branchDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM `branch` WHERE id_branch = ?", id, (err, result)=> {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateBranch: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE `branch` SET ? WHERE id_branch = ?", [id, data], (err, result) => {
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },

  deleteBranch: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM `branch` WHERE id_branch = ?", id, (err, result) => {
        if(!err){
          resolve(result)
        }else{
          reject(new Error(err))
        }
      })
    })
  },
}