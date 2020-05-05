const express = require('express');
// const Hubs = require('./hubs/hubs-model.js');
const hubsRouter = require('./hubs/hubs-router') //importing hubs-router

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  // res.send(`
  //   <h2>Lambda Hubs API</h>
  //   <p>Welcome to the Lambda Hubs API</p>
  // `);
  res.json({query: res.query, params : req.params, headers: req.headers})
});

server.use('/api/hubs', hubsRouter); //telling server instead to reference hubsRouter--must be a different url

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
