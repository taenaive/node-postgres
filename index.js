const express = require('express')
const app = express()
const port = 3001

const pgAction = require('./components/pgAction')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
//const selectEverything = 'SELECT * FROM public.dsrc_record ORDER BY dsrc_id ASC, record_id ASC'
const returnCount = 'SELECT count(*) FROM public.dsrc_record'

const selectEverything  =`SELECT * FROM public.dsrc_record`
//const selectWhere = `WHERE LOWER(json_data::json ->> 'NAME_FIRST') = LOWER('Honda') AND `
const selectOrderBy = `ORDER BY dsrc_id ASC, record_id ASC`

function createWhere(query) {
  let whereClause =''
  try{
  if(query.where){
    const whereObj = JSON.parse(query.where)
   //console.log ('where=', query.where)
    whereClause = Object.keys(whereObj).map(key => {
      return `WHERE LOWER(json_data::json ->> '${key}') = LOWER('${whereObj[key]}')`
    }).join(' AND '); 
   }
  }catch (e){
    console.log("Json text parse error")
  }finally{
    return whereClause
  }
}

app.get('/', (req, res) => {
  pgAction.listDsrcRecord(returnCount)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/all', (req, res) => { 
    let offset = req.query.offset ? req.query.offset : 0;
    let limit = req.query.limit ? req.query.limit : 100;
    //console.log(createWhere(req.query))
    
    const selectWithLimit = `${selectEverything} ${createWhere(req.query)} ${selectOrderBy} LIMIT ${limit} OFFSET ${offset}`
    pgAction.listDsrcRecord(selectWithLimit)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
