require('dotenv').config(); 
const nodemailer = require('nodemailer'); 
const log = console.log;


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'sowealieu@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || 'Fbnjuban2$' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'sowealieu@gmail.com', // TODO: email sender
    to: 'sowealieu@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs' + err.message.toString());
    }
    return log('Email sent!!!');
});