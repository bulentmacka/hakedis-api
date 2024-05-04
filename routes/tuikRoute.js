const express = require('express')
const tuikmanager = require('../managers/tuikmanager')
const router = express.Router()


  router.get('/',async(req,res) => {

    const manager = new tuikmanager() 
    const result = await manager.getAll()
    res.send(result)

  } )

  router.get('/github', async(req, res) => {

      const manager = new tuikmanager() 

      await manager.getValuesFromGithub()
 
      res.send('<h1>tamam</h1>')  
 
  })
  

  module.exports = router