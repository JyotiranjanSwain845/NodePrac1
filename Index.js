const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.myUrl).then(()=>console.log('database connected successfully')).catch((err)=>console.log(err));


app.use('/user',userRoute)
app.get('/home',(req,res)=>{
    res.json("Home Page");
})

app.listen(process.env.port,'localhost',()=>{
    console.log(`app listening on 'http://localhost:3000' `);
})


