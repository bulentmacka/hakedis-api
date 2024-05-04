const express = require('express')
const realizationmanager = require('../managers/realizationmanager')
const router = express.Router()

  router.get("/:categoryId/:paymentId", async(req, res) => {
    const manager = new realizationmanager(res)  
    res.send(await manager.getAllForCategory(req.params.paymentId,req.params.categoryId))
  })

  // router.get("/:fileId", async(req, res) => {
  //   const manager = new realizationmanager(res)  
  //   res.send(await manager.getAllForFile(req.params.fileId)) 
  // })

  //   router.get("/payment", async(req, res) => {
  //   const manager = new realizationmanager(res)  
  //   res.send(await manager.getAllForPayment(req.query.id)) 
  // })

  router.get("/:id", async(req, res) => {
    const manager = new realizationmanager(res)  
    res.send(await manager.getById(req.params.id))
  })

  router.post("/add", async(req, res) => {
    const manager = new realizationmanager(res)  
    res.send(await manager.add(req.body.paymentId,req.body.productId,req.body.percent)) 
  })

  router.put("/update", async(req, res) => {
    const manager = new realizationmanager(res)  
    res.send(await manager.update(req.body.id,req.body.percent)) 
  })

  router.delete("/delete", async(req, res) => {
    const manager = new realizationmanager(res)  
    res.send(await manager.delete(req.body.id)) 
  })

  module.exports = router