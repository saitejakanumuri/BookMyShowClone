const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return v.length<20
            },
            message: "user name should be less than 20 characters"
        }
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'partner'],
        required: true,
        default: 'user'
    },
    otp:String,
    otpExpiry: Date
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
