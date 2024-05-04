const express = require('express')
const productmanager = require('../managers/productmanager')
const router = express.Router()

router.get("/", async(req, res) => {
    const manager = new productmanager(res)  
    res.json(await manager.getAllForCategory(req.query.categoryId))  
  })  

  
  router.get("/:id", async(req, res) => {
    const manager = new productmanager(res)  
    res.json(await manager.getById(req.params.id))  
  })
  
  
  router.post("/add",async(req,res) => {
    const manager = new productmanager(res)
    res.json(await manager.add(req.body.categoryId, 
      req.body.productNumber, 
      req.body.name,
      req.body.unit,
      req.body.percent))
  })
  
  router.put("/update",async(req,res) => {

    const manager = new productmanager(res)

    console.log(req.body)    

    res.json(await manager.update(req.body.id,                                  
                                  req.body.productNumber, 
                                  req.body.name,
                                  req.body.unit,
                                  req.body.percent))
  })
  
  router.delete("/delete",async(req,res) => {
    const manager = new productmanager(res)
    res.json(await manager.delete(req.body.id))
  })


  module.exports = router