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

import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import menuRouter from "./routes/menuRouter.js"
import orderRouter from "./routes/orderRouter.js"


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


const allowedOrigins = [process.env.PLATFORM, process.env.LANDING_PAGE];

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
server.use('/assets/uploads',express.static(path.join(path.resolve(),'./assets/uploads')))
server.use(cors({
  origin: process.env.ORIGIN,
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));


server.use('/auth',authRouter)
server.use('/user',userRouter)
server.use('/products',productRouter)
server.use('/categories',categoryRouter)
server.use('/tags',tagRouter )
server.use('/outlets',outletRouter)
server.use('/menu',menuRouter);
server.use('/orders',orderRouter);

server.get('/images/:img',(req,res)=>{

  const img = req.params.img;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const imagePath = path.join(__dirname, 'assets', 'uploads', img);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('Image not found');
  }

})




