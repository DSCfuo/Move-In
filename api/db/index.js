const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool();

module.exports = {
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}