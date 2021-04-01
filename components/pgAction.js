const Pool = require('pg').Pool
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

//read from .env file or use the ENV variable for production
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABSE_NAME,
  password: process.env.POSTGRES_PASS,
  port: process.env.POSTGRES_PORT,
});

const listDsrcRecord = (queryStr) => {
    return new Promise(function(resolve, reject) {
      pool.query( queryStr, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve( (results && results.rows) ? results.rows : results);
      })
    }) 
  }
  
  module.exports = {
    listDsrcRecord,
  }
  