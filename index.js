const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors');
const adminRoutes = require('./src/routes/index');


require("dotenv").config();
app.listen(process.env.PORT || 8080,()=>{
    console.log(`Listening to port ${process.env.PORT}`);
} );


//middleWare to parse to json request body

app.use(express.json());
app.use(express.urlencoded({extended:false}))

// imports routes Api
const eventRoutes = require('./src/routes/events.routes');


//mount routes

app.use(cors());
app.options('*', cors());

app.use("/v1/admin",adminRoutes);

//connect db connection
const dbConnect= require('./config/database');
dbConnect();

//default Route
// app.get("/",(req,res)=>{
//     res.send("<h1>This is HomePage</h1>")
// });
