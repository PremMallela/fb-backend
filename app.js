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

server.get('/post/:id',(req,res)=>{

  const id = req.params.id;

  console.log(id);

  if(id==='1' || id===1) res.json({
      post:[
          {
              type:'text',
              content:[
                  {
                      content:'వికారాబాద్‌లోని సిద్ధార్థ స్కూల్‌లో సైన్స్ ఫేర్',
                      style:{
                          fontFamily:'GlacialIndifference-Bold',
                          lineHeight:35,
                          fontSize:29
                      }
                  }
              ]
          },
          {
              type:'image',
              content:'data:image/jpeg;base64,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'
          },
          {
              type:'text',
              content:[
                  {
                      content:'వికారాబాద్‌లోని సిద్ధార్థ స్కూల్‌లో సైన్స్ ఫేర్ నిర్వహిస్తున్నట్లు చెబుతోంది. ఈ ఫేర్‌లో విద్యార్థులు వివిధ విజ్ఞాన పరిశ్రమలను ప్రదర్శించడం కావచ్చు. ఫేర్ ప్రదర్శనలో విభిన్న ప్రాజెక్టులు, విజ్ఞాన పరిశ్రమలు ఉన్నాయి.',
                      style:{
  
                      }
                  },
                  {
                      content:'ఈ కార్యక్రమం విద్యార్థులను వివిధ విషయాలతో పరిచయం చేస్తుంది మరియు అవినీతిని వివరించే అవకాశం కలిగిస్తుంది. ',
                      style:{
                          backgroundColor:'#aabdf2'
                      }
                  },
                  {
                      content:'ఈ సైన్స్ ఫేర్ కార్యక్రమం సందర్భంగా ప్రధానికి మార్గదర్శకత్వం అందించారు. వికారాబాద్‌లోని సిద్ధార్థ స్కూల్‌లో సైన్స్ ఫేర్ నిర్వహిస్తున్నట్లు చెబుతోంది. ఈ ఫేర్‌లో విద్యార్థులు వివిధ విజ్ఞాన పరిశ్రమలను ప్రదర్శించడం కావచ్చు. ఫేర్ ప్రదర్శనలో విభిన్న ప్రాజెక్టులు, విజ్ఞాన పరిశ్రమలు ఉన్నాయి.',
                      style:{
                          
                      }
                  }
              ]
          },
          {
              type:'meta',
              content:{
                  date:'12 జనవరి 2024',
                  writer:'chetan'
              }
          }
      ]
  });

  if(id==='2' || id===2) res.json({
      post:[
          {
              type:'text',
              content:[
                  {
                      content:'Strike at saketh nagar',
                      style:{
                          fontFamily:'GlacialIndifference-Bold',
                          lineHeight:35,
                          fontSize:31
                      }
                  }
              ]
          },
          {
              type:'video',
              content:'https://videos.pexels.com/video-files/4766263/4766263-sd_640_338_24fps.mp4'
          },
          {
              type:'text',
              content:[
                  {
                      content:'వికారాబాద్‌లోని సిద్ధార్థ స్కూల్‌లో సైన్స్ ఫేర్ నిర్వహిస్తున్నట్లు చెబుతోంది. ఈ ఫేర్‌లో విద్యార్థులు వివిధ విజ్ఞాన పరిశ్రమలను ప్రదర్శించడం కావచ్చు. ఫేర్ ప్రదర్శనలో విభిన్న ప్రాజెక్టులు, విజ్ఞాన పరిశ్రమలు ఉన్నాయి.',
                      style:{
  
                      }
                  },
                  // {
                  //     content:'ఈ కార్యక్రమం విద్యార్థులను వివిధ విషయాలతో పరిచయం చేస్తుంది మరియు అవినీతిని వివరించే అవకాశం కలిగిస్తుంది. ',
                  //     style:{
                  //         backgroundColor:'#aabdf2'
                  //     }
                  // },
                  {
                      content:'ఈ సైన్స్ ఫేర్ కార్యక్రమం సందర్భంగా ప్రధానికి మార్గదర్శకత్వం అందించారు. వికారాబాద్‌లోని సిద్ధార్థ స్కూల్‌లో సైన్స్ ఫేర్ నిర్వహిస్తున్నట్లు చెబుతోంది. ఈ ఫేర్‌లో విద్యార్థులు వివిధ విజ్ఞాన పరిశ్రమలను ప్రదర్శించడం కావచ్చు. ఫేర్ ప్రదర్శనలో విభిన్న ప్రాజెక్టులు, విజ్ఞాన పరిశ్రమలు ఉన్నాయి.',
                      style:{
                          
                      }
                  }
              ]
          },
          {
              type:'meta',
              content:{
                  date:'12 జనవరి 2024',
                  writer:'chetan'
              }
          }
      ]
  });

  res.json({
    post:'lk'
  })

})

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




