const db = require('../db/index');

exports.getAllListings = async (req, res) => {
    const getAllListingsQuery = 'SELECT * FROM listings';
    try {
        let queryResult = await db.query(getAllListingsQuery);
        return res.status(200).json({
            data: queryResult.rows
        })   
    } catch (err) {
        console.log('An error occured fetching all listings', err);
        return next(err);
    }

}

exports.createListing = async(req, res, next) => {
    let {address, apartmentType, location, price, status, ownerName, ownerEmail, ownerPhone, description} = req.body;

    try {
        const createListingQuery = `INSERT INTO listings (location, price, apartmenttype,
            description, status, address, owner_name, owner_email, owner_phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        const listingValues = [location, price, apartmentType, description, status, address, ownerName, ownerEmail, ownerPhone];
        const newListing = await db.query(createListingQuery, listingValues);

        return res.status(200).json({
            message: 'Successfully added listing'
        })
    } catch (err) {
        console.log('An error occured while creating a listing', err);
        return next(err);
    }
}