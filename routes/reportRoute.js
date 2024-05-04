const express = require('express')
const reportmanager = require('../managers/reportmanager')
const router = express.Router()

  router.get("/categoriessummary/:paymentId", async(req, res) => {  
    const manager = new reportmanager()  
    res.send(await manager.getCategoriesSummary(req.params.paymentId))
  })

  router.get("/paymentsummary/:id", async(req, res) => {  
    const manager = new reportmanager()  
    res.send(await manager.getPaymentSummary(req.params.id))
  })

  router.get("/realizationproductlist/:paymentId/:categoryId", async(req, res) => {  
    const manager = new reportmanager()  
    res.send(await manager.getRealizationProductList(req.params.paymentId,req.params.categoryId))
  })

  router.get("/realizationcategorylist/:paymentId", async(req, res) => {  
    const manager = new reportmanager()  
    res.send(await manager.getRealizationCategoryList(req.params.paymentId))
  })

  module.exports = router