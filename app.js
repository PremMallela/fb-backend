import express from "express"
import authRouter from "./routes/authRouter.js"
import mongoose from 'mongoose'
import 'dotenv/config'
import userRouter from "./routes/userRouter.js"
import cookieParser from "cookie-parser"
import {categoryRouter} from "./routes/productRouter.js"
import {tagRouter} from "./routes/productRouter.js"


mongoose.connect(process.env.DEV_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fastbills'
  })
  .then(() => {
    console.log(`\nConnected! to the database : ${process.env.DEV_DB}`)
    server.listen(8080, () => {
        console.log("server started")
    })
})

const server = express()
server.use(express.json())
server.use(cookieParser())

server.use('/auth',authRouter)
server.use('/user',userRouter)
server.use('/products',categoryRouter)
server.use('/products', tagRouter)



