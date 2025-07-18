const nodemailer = require("nodemailer");
const { Template, BLANK_A4_PDF } = require('@pdfme/common');
const { generate } = require("@pdfme/generator");
// const { userSignupTemplate } = require('./emailTemplate/userSignupTemplate');
const htmlTemplate = require('./emailTemplate/htmlEmailTemplate.js');

const {ADMIN_MAIL, MAIL_PASS} = process.env;

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ADMIN_MAIL,
        pass: MAIL_PASS,
    },
    // debug:true,
    // logger:true
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});
// Wrap in an async IIFE so we can use await.
const sendMail = async (receiverMail, subject, messageHtml) =>  {
    try {
        console.log("===-=-=-=-")
        const info = await transporter.sendMail({
            from: '"ankit" <ankitankitkashyap45@gmail.com>',
            to: receiverMail,
            subject: subject,
            html: messageHtml, // HTML body
        });
        console.log("Message sent:", info);

        
    } catch (e) {

        if (e.code === 'EDNS') {
            console.log("Uable to connect mail server:");
        }
        else {
            console.log("Mailer error:", e);
        }
    }

};

const signUpMail = (name, receiverEmail, ipAddress, systemInfo) => {

    const subject = `Successful sign-in for ankitankitkashyap45@gmail.com from new device`;

    const mailBody = htmlTemplate.userSignupTemplate({receiverEmail,resetPasswordLink:"resetPasswordLink",timestamp:new Date().toLocaleString(),ipAddress})

    try{
    sendMail(receiverEmail, subject,mailBody)
    console.log('====-=-')

    }catch(E){

    console.log('====-=12-',E)

    }
}
const loginMail = (name, receiverMail, ipAddress) => {

}
// signUpMail();

module.exports = {signUpMail};