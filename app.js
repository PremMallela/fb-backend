import express from "express"
import authRouter from "./routes/authRouter.js"
import mongoose from 'mongoose'
import 'dotenv/config'
import userRouter from "./routes/userRouter.js"
import cookieParser from "cookie-parser"
import categoryRouter from "./routes/categoryRouter.js"
import tagRouter from "./routes/tagRouter.js"
import outletRouter from "./routes/oultetRouter.js"
import path from  "path"

import cors from 'cors';


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
        .catch(err =>{
          console.error(err)
        })

const server = express()

server.use(express.json())
server.use(cookieParser())
server.use('/assets/uploads',express.static(path.join(path.resolve(),'./assets/uploads')))
server.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


server.use('/auth',authRouter)
server.use('/user',userRouter)
server.use('/categories',categoryRouter)
server.use('/tags',tagRouter )
server.use('/outlets',outletRouter)



