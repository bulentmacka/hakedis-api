const express = require('express')
const filemanager = require('../managers/filemanager')
const router = express.Router()
const jwt = require('jsonwebtoken')

  router.get("/", async(req, res) => {

    console.log('files ok')

    // const token = req.header('x-auth-token')
    
    // if (!token){
    //   res.status(401).send('token yok!!!!')
    // }

   // try{
      //const decodedToken = jwt.verify(token,'benim guzel keyim')
      const manager = new filemanager(res)  
      const result = await manager.getAll(req.query.userId)
      res.send(result) 

    //}

    // catch(ex){
    //   res.status(400).send('hatalı token')
    // }
    
 
  })
  
  router.get("/:id", async(req, res) => {    
    const manager = new filemanager(res)  
    const file = await manager.getById(req.params.id)
    if (!file) {
      return res.status(404).send('Dosya bulunamadı!')
    }
    res.send(file)  
  })
  
  
  router.post("/add",async(req,res) => {
    const manager = new filemanager(res)
    //const formatter = Intl.DateTimeFormat('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'})
    console.log(req.body)
    const [addedFile] = await manager.add(
              req.body.userId,
              req.body.name,
              req.body.administrator,
              req.body.contractor,
              req.body.tenderDate,
              req.body.agreementDate,
              req.body.agreementPrice,
              req.body.startDate,
              req.body.dayCount  
  
  )

  //console.log(addedFile)
    res.send(addedFile)
  })
  
  router.put("/",(req,res) => {
    const manager = new filemanager(res)
    manager.update(req.body.id, 
                   req.body.name,
                   req.body.administrator,
                   req.body.contractor,
                   req.body.tenderDate,
                   req.body.agreementDate,
                   req.body.agreementPrice,
                   req.body.startDate,
                   req.body.dayCount 
                  )
    res.send('Dosya Güncellendi..')
  })
  
  router.delete("/",(req,res) => {
    const manager = new filemanager(res)
    manager.delete(req.body.id)
    res.send("Dosya Silindi..")
  })

  module.exports = router