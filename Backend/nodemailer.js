const nodemailer = require('nodemailer');
require("dotenv").config()


const generateOtpAndSendEmail = (email,otp) => {
    try {

        // create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.nodemailerEmail,
                pass: process.env.nodemailerPass
            }
        });


        // create an email message
        const mailOptions = {
            from: process.env.nodemailerEmail,
            to: email,
            subject: "Verification OTP",
            text: `Your OTP is ${otp}`
        };


        // send the email message
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                // res.send({ "msg": error.message })
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });

    } catch (error) {
        // res.send({ "error": error.message })
        console.log(error);
    }
}

module.exports = { generateOtpAndSendEmail }