const express = require('express')
const allowancemanager = require('../managers/allowancemanager')
const router = express.Router()


  
  
  router.post("/addrange",(req,res) => {
    const manager = new allowancemanager(res)
    res.json(manager.addRange(  req.body.fileId,
                                req.body.startYear, 
                                req.body.startMonth,
                                req.body.endYear,
                                req.body.endMonth))
  })


  router.post("/updateamounts",(req,res) => {
    const manager = new allowancemanager(res)
    res.json(manager.updateAmounts(req.body))
  })
  



  module.exports = router