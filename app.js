import express from "express"
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"
import categoryRouter from "./routes/categoryRouter.js"
import tagRouter from "./routes/tagRouter.js"
import outletRouter from "./routes/oultetRouter.js"
import path from  "path"

import cors from 'cors';


mongoose.connect(process.env.DEV_DB,{
    dbName: 'fastbills'
  })
        .then(() => {
          console.log(`\nConnected! to the database : ${process.env.DEV_DB}`)
          server.listen(8080, () => {
              console.log("server started\n")
          })
        })
        .catch(err =>{
          console.error(err)
        })

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
server.use('/assets/uploads',express.static(path.join(path.resolve(),'./assets/uploads')))
server.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


server.use('/auth',authRouter)
server.use('/user',userRouter)
server.use('/products',productRouter)
server.use('/categories',categoryRouter)
server.use('/tags',tagRouter )
server.use('/outlets',outletRouter)




