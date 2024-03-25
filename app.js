import express from "express";
import authRouter from "./routes/authRouter.js";
import mongoose from 'mongoose';
import 'dotenv/config'
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRouter.js";

console.log(process.env.DEV_DB);

mongoose.connect(process.env.DEV_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fastbills'
  })
  .then(() => {
    console.log('Connected! to the database')
    server.listen(8080, () => {
        console.log("server started");
    })
});

const server = express();
server.use(express.json());
server.use(cookieParser());

server.use('/auth',authRouter);
server.use('/user',userRouter);
server.use('/products',productRouter);

server.get('/sayhello', function(req, res) {
    res.json({
        'name':'saaho',
        'verdict':'disaater'
    });
});

