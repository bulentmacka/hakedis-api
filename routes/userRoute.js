const express = require('express')
const usermanager = require('../managers/usermanager')
const router = express.Router()

router.get('/all',async(req,res) => {
  const manager = new usermanager(res)  
  const [users] = await manager.getAll()
  res.send(users)
})

router.get('/:id',async(req,res) => {
  const manager = new usermanager(res)  
  res.send(await manager.getById("'" + req.params.id + "'"))
})

  router.get('/',async(req,res) => {
    const manager = new usermanager(res)  
    res.send(await manager.getByEmail(req.query.email))

  })
 
  router.post("/add",async(req,res) => {
    
     const manager = new usermanager(res)  
    
     const user = await manager.add(req.body.username,req.body.email,req.body.password)

     res.send(user)
    
  })



  module.exports = router