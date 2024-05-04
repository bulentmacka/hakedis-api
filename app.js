const express = require("express")
const cors = require('cors')
const env = require('dotenv').config()
//const createDb = require('./createDb')
const app = express()

app.use(express.json())

app.use(cors())

//app.use(createDatabase)
app.get('/',(req,res)=>{
  res.send('<h1>Home Page</h1>')
})
const userRouter = require('./routes/userRoute')
const accountRouter = require('./routes/accountRoute')
const fileRouter = require('./routes/fileRoute')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
const paymentRouter = require('./routes/paymentRoute')
const realizationRouter = require('./routes/realizationRoute')
const allowanceRouter = require('./routes/allowanceRoute')
const tuikRouter = require('./routes/tuikRoute')
const reportRouter = require('./routes/reportRoute')
const priceDifferenceRouter = require('./routes/priceDifferenceRoute')
const url = 'http://localhost:6161'
app.use(`/users`,userRouter)
app.use(`/login`,accountRouter)
app.use('/files',fileRouter)
app.use(`/categories`,categoryRouter)
app.use(`/products`,productRouter)
app.use(`/payments`,paymentRouter)
app.use(`/realizations`,realizationRouter)
app.use(`/allowances`,allowanceRouter)
app.use(`/tuik`,tuikRouter)
app.use(`/reports`,reportRouter)
app.use(`/pricedifference`,priceDifferenceRouter)

const port = process.env.DBPORT || 6161
app.listen(port, () => {
  console.log("server is started",port)
})
