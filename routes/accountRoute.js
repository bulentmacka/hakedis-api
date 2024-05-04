const express = require('express')
const accountmanager = require('../managers/accountmanager')
const router = express.Router()  
  
  router.post("/",(req,res) => {
    
    const manager = new accountmanager(res)
    
    manager.login(req.body.email,req.body.password)   
    
  })
  
  module.exports = router