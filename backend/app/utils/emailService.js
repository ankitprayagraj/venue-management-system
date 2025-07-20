const nodemailer = require("nodemailer");
const htmlTemplate = require('./emailTemplate/htmlEmailTemplate.js');

const { ADMIN_MAIL, MAIL_PASS } = process.env;

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
const sendEmail = async (receiverMail, subject, messageHtml) => {
    try {
        const info = await transporter.sendMail({
            from: ADMIN_MAIL,
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

const loginEmail = (name, receiverEmail, ipAddress, systemInfo) => {

    const subject = `Successful sign-in for ${receiverEmail} from new device`;

    const mailBody = htmlTemplate.loginTemplate({ receiverEmail, resetPasswordLink: "resetPasswordLink", timestamp: new Date().toLocaleString(), ipAddress })

    sendEmail(receiverEmail, subject, mailBody)

}
const signUpEmail = (name, receiverEmail) => {

    const subject = 'Welcome to Venue biz';
    const mailBody = htmlTemplate.userSignupTemplate(name);

    sendEmail(receiverEmail, subject, mailBody)

}

module.exports = { signUpEmail, loginEmail };