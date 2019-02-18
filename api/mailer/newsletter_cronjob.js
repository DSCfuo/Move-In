const cron = require('node-cron');
const sendMail = require('./mailer');
const db = require('../db/index');

cron.schedule('0 */6 * * *', async () => {
    console.log('Running newsletter task ')
    const queryResult = await db.query('SELECT * FROM subscribers');
    let emails = queryResult.rows.map((subscription) => subscription.email);
    let emailString = emails.join(',');
    const mailOptions = {
        to: emailString,
        subject: 'New apartments from Move in!',
        text: 'Hello dear customers checkout these new apartments on movein.com'
    }
    try {
        let mailResult = await sendMail(mailOptions);
        console.log("Mail sent", mailResult)
    } catch (err) {
        console.log("Mail not sent", err)
    }
   
})
