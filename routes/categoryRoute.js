const express = require('express')
const categorymanager = require('../managers/categorymanager')
const router = express.Router()

router.get("/", async(req, res) => {
    const manager = new categorymanager(res)  
    res.send(await manager.getAll(req.query.fileId)) 
  })
  
  router.get("/childs", async(req, res) => {
    const manager = new categorymanager(res)
    const [categories] = await manager.getChildsByCategoryId(req.query.categoryId)  
    res.send(categories) 
  })
  
  router.get("/:id", async(req, res) => {
    const manager = new categorymanager(res)  
    const category = await manager.getById(req.params.id)
    if (!category) return res.status(404).send('İş grubu bulunamadı..') 
    res.send(category)
  })
  
  
  router.post("/add",async(req,res) => {
    const manager = new categorymanager(res)
    const addedCategory = await manager.add(req.body.id, req.body.name)
    res.send(addedCategory)
  })
  
  router.put("/update",async(req,res) => {
    const manager = new categorymanager(res)
    const updatedCategory = await manager.update(req.body.id, req.body.name)
    res.send(updatedCategory)
  })
  
  router.delete("/delete",async(req,res) => {
    const manager = new categorymanager(res)
    const deletedCategory = await manager.delete(req.body.id)
    res.send(deletedCategory)
  })


  module.exports = router