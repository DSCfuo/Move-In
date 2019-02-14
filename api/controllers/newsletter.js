const db = require('../db/index');

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
        console.log('Failed to fetch from db', err)
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
        res.status(200).json({
            message: 'Successfully added to mailing list'
        })
    }catch(err){
        console.log("An error occured while inserting a subscriber");
        return next(err);
    }
    
}