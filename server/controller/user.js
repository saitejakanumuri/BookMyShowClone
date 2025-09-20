const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const emailHelper = require("../utils/emailHelper");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        message: "User Already exists",
        success: false,
      });
    }
    const saltRounds = 10; //the higher the number the more secure but slower the hashing process
    const hashedPasword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({...req.body, password: hashedPasword});
    await newUser.save();

    res.json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (err) {
    console.log("hello", JSON.stringify(err));
    if (err._message == "user validation failed") {
      return res.status(400).json({
        message: err.errors.name.message,
        success: false,
      });
    }
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // {
    //   "username": {"$gt": ""},
    //   "password": {"$gt": ""},
    // }
    if (!user) {
      return res.status(401).json({
        message: "User does not exist. Please register",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
    //simplified password validation where we are storing passwords in plain text
    // if (password !== user.password) {
    //   return res.status(401).json({
    //     message: "Invalid Credentials",
    //     success: false,
    //   });
    // }

    const token = jwt.sign(
      { userId: user["_id"], name: user.name },
      process.env.jwt_secret,
      { expiresIn: "1d" }
    );
  console.log("jwt token lgin route ", token);
  console.log("user logged in");
    res.json({
      message: "User logged in",
      success: true,
      data: token,
    });

  } catch (err) {
    console.log("hello", err.message);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: "you are authorized to go to the protected route",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const otpGenerator = function(){
  return Math.floor((Math.random()*1000) + 90000);
}

exports.forgetPassword = async (req, res) => {
  try{
    //1. ask for email 
    // 2. check if email is present or not 
    //   if email is not present -> send a response to the user (user not found) 
    // 3. if email is present -> create a basic otp -> send to the email
    // 4. also store the iotp -> in userModel 
    // 5. to avoid collison 
    // response -> unique url with the id of the user that will form your uniqe link for reset password 
    const {email} = req.body;

    if(email == undefined){
      return res.status(401).json({
        success: false,
        message: "Please enter the email to reset password"
      })
    }

    let user = await User.findOne({email});
    if(user == null){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10*60*10000 ;

    await user.save();
    res.status(200).json({
      success: true,
      message: "otp sent on email"
    });

    await emailHelper("otp.html", user.email, { name: user.name, otp})

  }catch(err){
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
    //sentry or other applications to monitor the errors 
    //coralogix to keep the logs 
  }
}

exports.resetPassword = async (req, res) => {
  try{
    const { otp, password } = req.body;
    if(!password || !otp) {
      return res.status(401).json({
        success: false,
        message: "invalid request"
      });
    }

    //search for user with id 
    const user = User.findOne({otp});
    if(!user){
      return res.status(404).json({
        success: false,
        message: "user not found"
      });
    }

    //check if otp is expired - 10min limit
    if(Date.now() > user.otpExpiry){
      return res.status(401).json({
        success: false,
        message: "otp expired"
      });
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({
      message:  "password reset successfully",
      status: true
    })

  }catch(err){
    res.status(500).json({
      message: err.message,
      success: false
    })

  }
}
