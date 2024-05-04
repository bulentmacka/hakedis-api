const express = require('express')
const priceDifferenceManager = require('../managers/pricedifferencemanager')
const router = express.Router()


  router.post('/',async(req,res) => {

    console.log(req.body)

    const manager = new priceDifferenceManager() 
    const result = await manager.calcPd(req.body)
    res.send(result)

  } )


  

  module.exports = router