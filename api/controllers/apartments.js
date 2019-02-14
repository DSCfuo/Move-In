const db = require('../db/index');
const jwt = require('jsonwebtoken');

function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_KEY, (err, match) => {
            if(err){
                reject(err);
            }
            resolve(match)
        })
    })
}

const createOwner = async (name, email, phoneNumber) => {
    try {
        const insertOwnerQuery = 'INSERT INTO owners(name, email, phone) VALUES ($1, $2, $3) RETURNING id';
        let newOwner = await db.query(insertOwnerQuery, [name, email, phoneNumber])
        console.log(newOwner)
        return newOwner
    } catch (err) {
        console.log("Something bad happened trying to create an owner", err);
        return null
    }
}

exports.getApartments = async (req, res) => {
    const dbResult = await db.query('SELECT * FROM houses');
    const apartments = dbResult.rows;
    return res.status(200).json({
        data: apartments
    })
}

exports.createApartment = async (req, res, next) => {
    let {address, apartmentType, location, price, ownerName, ownerEmail, ownerPhone, description} = req.body;
    let token = req.headers.authorization;
    if(!token){
        res.status(400).json({
            message: 'Invalid token'
        })
    }

    try{
        let verifiedUser = await verifyToken(token);
        if(!verifiedUser){
            return res.status(400).json({
                message: 'Invalid token'
            })
        }

        let newOwner = await createOwner(ownerName, ownerEmail, ownerPhone);
        let owner_id = newOwner.rows[0].id;
        const insertApartmentQuery = `INSERT INTO houses (location, price, apartmenttype,
                                      description, address, owner_id) VALUES ($1, $2, $3, $4, $5, $6)`
        const apartmentValues = [location, price, apartmentType, description, address, owner_id];
        const insertedApartment = await db.query(insertApartmentQuery, apartmentValues);
        console.log(insertedApartment)
        res.status(200).json({
            message: 'Apartment added successfully'
        })
    }catch(err){
        console.log('Something bad happened', err);
        return next(err)
    }
    
}