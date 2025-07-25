const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const Port = 3000;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/anyHow").then(()=>console.log('database connected successfully')).catch((err)=>console.log(err));


app.use('/user',userRoute)
app.get('/home',(req,res)=>{
    res.json("Home Page");
})

app.listen(Port,'localhost',()=>{
    console.log(`app listening on 'http://localhost:3000' `);
})


