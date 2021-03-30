const Pool = require('pg').Pool
//edit this one for your server
const pool = new Pool({
  user: 'senzing',
  host: '192.168.1.222',
  database: 'g2',
  password: 'yourpass',
  port: 5432,
});

const listDsrcRecord = (queryStr) => {
    return new Promise(function(resolve, reject) {
      pool.query( queryStr, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  
  module.exports = {
    listDsrcRecord,
  }
  