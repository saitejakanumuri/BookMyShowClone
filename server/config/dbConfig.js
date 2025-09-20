const mongoose = require("mongoose");
require("dotenv").config({path:"../.env"})
console.log(process.env.mongo_url);

const connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.mongo_url);
        console.log("connected to db");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectToDB;