const express = require('express')
const paymentmanager = require('../managers/paymentmanager')
const router = express.Router()

router.get("/", async(req, res) => {
    const manager = new paymentmanager(res)  
    res.json(await manager.getAll(req.query.fileId))  
  })


  //test için
  router.get("/previouspaymentId/:id", async(req, res) => {
    const manager = new paymentmanager(res)  
    res.json(await manager.getPreviousPaymentId(req.params.id))  
  })

  router.get("/firstpayment/:id", async(req, res) => {
    const manager = new paymentmanager(res)  
    res.json(await manager.getRealizationsForFirstPayment(req.params.id))  
  })

  //

router.get("/:id", async(req, res) => {
    const manager = new paymentmanager(res)  
    res.json(await manager.getById(req.params.id))  
  })
  
  
  router.post("/add",async(req,res) => {
    const manager = new paymentmanager(res)
    res.json(await manager.add(req.body.fileId, 
                                req.body.paymentNumber,
                                req.body.startDate,
                                req.body.endDate))
  })
  
  router.put("/update",async(req,res) => {
    const manager = new paymentmanager(res)
    res.json(await manager.update(req.body.id, 
                                  req.body.paymentNumber,
                                  req.body.startDate,
                                  req.body.endDate))
  })
  
  router.delete("/delete",async(req,res) => {
    const manager = new paymentmanager(res)
    res.json(await manager.delete(req.body.id))
  })


  module.exports = router