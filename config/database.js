const mongoose = require("mongoose");
const process = require('process')
require('dotenv').config();
const dbConnect =()=> mongoose.connect(`${process.env.DATABASE_URL}`,{
    useNewURLParser:true,
    useUnifiedTopology:true
})
.then((res)=>console.log("Connected to MongoDb"))
.catch((err)=>{console.log(err);process.exit(1)});

module.exports = dbConnect;