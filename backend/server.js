const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors');
const userRoutes=require('./routes/userRoute');

const url="mongodb+srv://admin1:admin123@cluster0.d91jw.mongodb.net/project1?retryWrites=true&w=majority";

mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("connection to DB failed");
})
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/app',userRoutes);

const PORT=3000;
app.listen(PORT,()=>{
    console.log("server is running at http://localhost:3000")
})