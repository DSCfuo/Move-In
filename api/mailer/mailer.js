const mailer = require('nodemailer');
require('dotenv').config();

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});

module.exports = (mailOptions) => {
    console.log(process.env.GMAIL_USER)
    return new Promise(async (resolve, reject) => {
        try {
            let info = await transporter.sendMail(mailOptions);
            resolve(info);
        } catch (err) {
            reject(err)
        }
    })
}