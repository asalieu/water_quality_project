require('dotenv').config(); 
const nodemailer = require('nodemailer'); 
const log = console.log;


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // TODO: your gmail account
        pass: process.env.PASSWORD // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: process.env.EMAIL, // TODO: email sender
    to: process.env.EMAIL, // TODO: email receiver
    subject: 'New Sample Uploaded - Test',
    text: 'A new water sample file has been uploaded'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs' + err.message.toString());
    }
    return log('Email sent!!!');
});