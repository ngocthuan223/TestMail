"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(html, emailTo) {
    // create reusable transporter object using the default SMTP transport
    const mailFrom = process.env.MAIL_FROM;
    const password = process.env.MAIL_FROM_PASSWORD;
    console.log(mailFrom, password)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: mailFrom,
            pass: password
        }
    });


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Thuan 👻" <${mailFrom}>`, // sender address
        to: emailTo, // list of receivers
        subject: "Hello ✔", // Subject line
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    sendMail
}