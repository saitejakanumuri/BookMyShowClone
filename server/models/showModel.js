const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movie",
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    totalSeats:{
        type:Number,
        required:true
    },
     bookedSeats: {
        type:Array,
        default: []
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "theatre",
    }
}, {timestamps: true});

module.exports = mongoose.model("show",showSchema);