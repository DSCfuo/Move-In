const db = require('../db/index');
const sendMail = require('../mailer/mailer');

const getSubscriberByEmail = async (email) => {
    const queryResult = await db.query('SELECT * FROM subscribers WHERE email = $1', [email]);
    if(queryResult.rows.length > 0){
        return queryResult.rows[0];
    }
    return null;
}

exports.getAllSubscribers = async (req, res, next) => {
    try{
        const queryResult = await db.query('SELECT * FROM subscribers');
        res.status(200).json({
            data: queryResult.rows,
        })
    }catch(err){
        console.log('Failed to fetch subscribers from db', err)
        return next(err)
    }
}

exports.addNewSubscriber = async (req, res, next) => { 
    const {email} = req.body;
    try{
        const subscriber = await getSubscriberByEmail(email);
        if(subscriber){
            console.log("Subscriber exists");
            return res.status(403).json({
                message: 'This email has been used by someone else'
            })
        }
    
        const insertSubscriberQuery = 'INSERT INTO subscribers (email) VALUES ($1)';
        const queryResult = await db.query(insertSubscriberQuery, [email]);
        const mailOptions = {
            to: email,
            subject: `Thank you for subscribing to our newsletter`,
            text: `Thank you for subscribing to the Move in newsletter. You will receive latest offers, new deals, new apartments added and a lot of other fun stuff.
            \nCheers \nThe Move in Team`
        }

        let mailStatus = await sendMail(mailOptions);
        console.log('Sent mail', mailStatus)
        res.status(200).json({
            message: 'Successfully added to mailing list'
        })
    }catch(err){
        console.log("An error occured while inserting a subscriber");
        return next(err);
    }
    
}