const db = require('../db/index');

const getListingById = async (id) => {
    const getListingQuery = 'SELECT * FROM listings WHERE id = $1';
    let queryResult = await db.query(getListingQuery, [id]);
    return queryResult.rows[0];
}

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
            description, status, address, owner_name, owner_email, owner_phone, image_url, image_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
        const listingValues = [location, price, apartmentType, description, status, address, ownerName, ownerEmail, ownerPhone, req.file.url, req.file.public_id];
        const newListing = await db.query(createListingQuery, listingValues);

        return res.status(200).json({
            message: 'Successfully added listing'
        })
    } catch (err) {
        console.log('An error occured while creating a listing', err);
        return next(err);
    }
}

exports.removeListing = async (req, res) => {
    const listingId = req.params.id;
    try {
        let listing = await getListingById(listingId);
        console.log("About to remove this listing", listing)
        let removeListingQuery = 'DELETE FROM listings where id = $1';
        let queryResult = await db.query(removeListingQuery, [listing.id]);
        return res.status(200).json({
            message: 'Successfully removed listing'
        }) 
    } catch (err) {
        console.log("An error occured trying to remove a listing", err)
    }
}