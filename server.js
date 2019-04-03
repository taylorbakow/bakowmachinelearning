const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const serveStatic = require('serve-static')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(serveStatic(__dirname +  "/dist"));
const path = require('path');
const port = process.env.PORT || 5000;
const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'is415.database.windows.net',
        user: 'is415',
        password: 'Temporary415',
        database: 'is415',
        options: {
            port: 1433,
            encrypt: true
        }
    }
});

app.get('/api/seeAllData', (req, res) => {
    knex('am_Products').select('*').then(r => {
        res.status(200).json(r)
    })
})

app.get('/api/getUsers', (req, res) => {
    knex('am_Products').select('reviewerID', 'reviewerName').distinct().limit(1000).then(r => {
      res.status(200).json(r);
    })
  })
  
  app.get('/api/getProducts', (req, res) => {
    knex('am_Products').select('asin', 'productName').distinct().limit(1000).then(r => {
      res.status(200).json(r);
    })
  })

  app.post('/api/PredictRelatedUser', (req,res)=> {
    let data = req.body;
    let URL = 'https://ussouthcentral.services.azureml.net/workspaces/86aa9b92f05f46e693a1363083be28a2/services/d64d6db0f16341718e039d5234734522/execute?api-version=2.0&details=true';
    let config = {
      headers: {
      'Authorization': 'Bearer ' + 'M/RXMjdt+u30fh+LnFXuQl7eHJW0pXXcPgjs33YJrwuwCZgr7cRGXqnbIqBfiNPIaONroH9sue7eQIJNzI87sg==',
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      }
  };
    axios.post(URL, data, config).then(r => {
  
      let RelatedUsers = r.data.Results.output1.value.Values[0]; 
      console.log(RelatedUsers);
      knex('am_Products').select('reviewerName').whereIn('reviewerID', RelatedUsers).distinct().limit(5).then(response => {
        console.log(response);
        res.status(200).json(response);
      })
    }).catch(err => {
      res.status(500).json("Something went wrong")
    })
  
  })

  app.post('/api/PredictRelatedProduct', (req,res)=> {
    let data = req.body;
    let URL = 'https://ussouthcentral.services.azureml.net/workspaces/14f3c79a892f43f29415553cf9f8c5ff/services/44250360051748a789a50294665604cf/execute?api-version=2.0&details=true';
    let config = {
      headers: {
      'Authorization': 'Bearer ' + 'FonTo7pre/u/2HPDrg+2Xwhn5Chs8mZEF0i/cXzv+gTU/b7j4LZH07aDNkJgX96M/QkzQjAI1GxGYplso8WCyw==',
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      }
  };
    axios.post(URL, data, config).then(r => {
  
      let RelatedProducts = r.data.Results.output1.value.Values[0]; 
      console.log(RelatedProducts);
      knex('am_Products').select('productName').whereIn('asin', RelatedProducts).distinct().limit(5).then(response => {
        console.log(response);
        res.status(200).json(response);
      })
    }).catch(err => {
      res.status(500).json("Something went wrong")
    })
  
  })

  app.post('/api/PredictRelatedUserItem', (req,res)=> {
    let data = req.body;
    let URL = 'https://ussouthcentral.services.azureml.net/workspaces/14f3c79a892f43f29415553cf9f8c5ff/services/4411b164e97943efade044a6ebb84ada/execute?api-version=2.0&details=true';
    let config = {
      headers: {
      'Authorization': 'Bearer ' + '0UfbPjG0mBpSBLMpw2AoROTfmY9X46kmpw4omEW6GFII73dxdmtxAZ84KZVM/Gpb/qdMJ4HWfCUt2hG6GqEtKg==',
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      }
  };
    axios.post(URL, data, config).then(r => {
  
      let RelatedProducts = r.data.Results.output1.value.Values[0]; 
      console.log(RelatedProducts);
      knex('am_Products').select('productName').whereIn('asin', RelatedProducts).distinct().limit(5).then(response => {
        console.log(response);
        res.status(200).json(response);
      })
    }).catch(err => {
      res.status(500).json("Something went wrong")
    })
  
  })

app.listen(port, () => console.log(`app listening on port ${port}!`));