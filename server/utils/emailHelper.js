const nodemailer = require("nodemailer");
const axios = require('axios');
const https = require('https');
const fs = require("fs")
const path = require("path");
require("dotenv").config({path:"../.env"});
const {RESEND_API_KEY} = process.env;
console.log(RESEND_API_KEY);
const API_URL = "https://api.resend.com/emails";

function replaceContent(content, creds){
    const keys = Object.keys(creds);
    // console.log(keys);

    keys.forEach(key =>{
        console.log(key,creds[key]);
        content = content.replace(`#{${key}}`,creds[key]);

    })
    console.log("content after formatting ", content);
    return content;
}

async function emailHelper(templateName, reciever,creds){
    try{
        const templatePath = path.join(__dirname,"email_templates",templateName);
        let content = await fs.promises.readFile(templatePath,'utf-8');
        // console.log(content);
        // console.log(replaceContent(content,{"name":"Venkata","otp":"1234"}));

        const emailDetails = {
            from:"onboarding@resend.dev",
            to:reciever,
            subject:"Mail from BookMyShow",
            text:`Hi ${creds.name} this is your reset password otp ${creds.otp}`,
            html: replaceContent(content,creds)
        }

        const response = await axios.post(
            API_URL,
            emailDetails,
            {
                headers:{
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    "content-Type":"application/json",
                },
                httpsAgent: new https.Agent({rejectUnauthorized:false}),
            }
        );
        console.log("email sent---- response -- ",response);

    }catch(err){
        console.log(err);
    }
}
module.exports = emailHelper;