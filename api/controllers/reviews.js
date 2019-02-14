const db = require('../db/index');

exports.getAllReviews = async (req, res, next) => { 
    try{
        const queryResult = await db.query('SELECT * FROM reviews');
        return res.status(200).json({
            data: queryResult.rows
        })
    } catch (err) {
        console.log('Failed to fetch reviews from db', err)
        return next(err)
    }
}

exports.addNewReview = async (req, res) => {
    const {rating, review} = req.body;
    try {
        const queryResult = await db.query('INSERT INTO reviews (rating, review) VALUES ($1, $2)', [rating, review]);
        return res.status(200).json({
            message: 'Successfully added review'
        })
    } catch (err) {
        console.log('Failed to add review to db', err);
        return next(err);
    }
}