const mailer = require('nodemailer');
require('dotenv').config();

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});

exports.sendMail = async (req, res) => {
    let {name, email, message} = req.body;

    const mailOptions = {
        from: email,
        to: process.env.MAIL_RECEIPIENT,
        subject: `Movein Customer Feedback ${name}`,
        text: `${message} \n Sender's email: ${email}`
    }

    try {
        let info = await transporter.sendMail(mailOptions);
        return res.status(200).json({
            message: 'Mail sent successfully',
        })
    } catch (err) {
        console.log('Sending the email failed', err);
            return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}