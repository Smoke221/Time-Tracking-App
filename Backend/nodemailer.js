const nodemailer = require('nodemailer');
require("dotenv").config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'truculenttrains1017@gmail.com',
        pass: process.env.nodemailerPass
    }
});

module.exports = {transporter}