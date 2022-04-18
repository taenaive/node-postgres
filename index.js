const express = require('express')
const app = express()
const port = 3001
const response  = {
	"type": "FeatureCollection",
	"features": [{
		"type": "feature",
		"geometry": {
			"type": "point",
			"coordinates": [44.111, 34.111]
		}
	}]
}

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {

    res.status(200).send(response);
 
})

app.get('/all', (req, res) => { 
    let offset = req.query.offset ? req.query.offset : 0;
    let limit = req.query.limit ? req.query.limit : 100;
    let orderBy = req.query.orderby ? selectOrderBy : '';
    //console.log(createWhere(req.query))
    
      res.status(200).send(response);
  })

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
