const router = require('express').Router()
//also can do this
//const express = require('express)
//const router = express.Router()
const Hubs = require('./hubs-model')

//by the time we reach this routher, the URL has /api/hubs
//so we only need to handle the rest of the URL
server.get('/', (req, res) => {
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
  server.get('/:id', (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    });
  });
  
  server.post('/', (req, res) => {
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });
  
  server.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  });
  
  server.put('/:id', (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  });
  
  // add an endpoint that returns all the messages for a hub
  router.get('/:id/messages', (req, res) => {
      Hubs.findHubMessages(req.params.id)
      .then(messages => {
        res.status(200).json({data: messages})
      })
      .catch(error => {
        console.log({error})
        
        res.status(500).json({
            message: "There was an issue retrieving the messages", 
            error: error.message})
      })
  })
  // add an endpoint for adding new message to a hub
  //POST /api/messages --> hub_id is part of the req.body
  //POST /api/hubs/:id/messages --> have the hub_id on the url
  router.post('/', (req, res) => {
    
  })

  //need to export router
  module.exports = router;