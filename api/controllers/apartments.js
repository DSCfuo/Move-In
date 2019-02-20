require('dotenv').config();
const db = require('../db/index');
const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_KEY, (err, match) => {
            if(err){
                reject(err);
            }
            resolve(match)
        })
    })
}

const getApartmentById = async (id) => {
    const queryResult = await db.query('SELECT * FROM houses WHERE id = $1', [id]);
    if(queryResult.rows.length > 0){
        return queryResult.rows[0];
    }
    return null;
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

const getOwnerById = async (id) => {
    try{
        const getOwnerQuery = 'SELECT * FROM owners WHERE id = $1';
        const owner = await db.query(getOwnerQuery, [id]);
        return owner.rows[0];
    }catch(err){
        return next(err)
    }
}

exports.getApartmentById = async (req, res, next) => {
    const apartmentId = req.params.id;
    try {
        const apartment = await getApartmentById(apartmentId);
        const owner = await getOwnerById(apartment.owner_id);
        apartment.owner = owner;
        if(apartment){
            return res.status(200).json({
                data: apartment
            })
        }else{
            return res.status(400).json({
                message: 'Apartment not found'
            })
        }
    } catch (err) {
        return next(err)
    }
}

exports.getAllApartments = async (req, res) => {
    const dbResult = await db.query('SELECT * FROM houses');
    const apartments = dbResult.rows;
    return res.status(200).json({
        data: apartments
    })
}

exports.searchForApartment = async (req, res) => {
    let {location, price, apartmentType} = req.query;
    console.log(location, price, apartmentType);
    try {
        let searchQuery, searchQueryValues
        if(apartmentType == 'any'){
            searchQuery = 'SELECT * FROM houses WHERE location=$1 AND price <= $2';
            searchQueryValues = [location, price];
        }else{ 
            searchQuery = 'SELECT * FROM houses WHERE location=$1 AND price <= $2 AND apartmenttype = $3';
            searchQueryValues = [location, price, apartmentType];
        }
        const queryResult = await db.query(searchQuery, searchQueryValues);
        return res.status(200).json({
            data: queryResult.rows
        })
    } catch (err) {
        console.log("Something bad happened trying search for an apartment", err);
        return next(err)
    }
}

exports.createApartment = async (req, res, next) => {
    let {address, apartmentType, location, price, status, ownerName, ownerEmail, ownerPhone, description, image_url, image_id} = req.body;
    if(!image_url || !image_id){
        image_url = req.file.url;
        image_id = req.file.public_id
    }
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
                                      description, status, address, owner_id, image_url, image_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        const apartmentValues = [location, price, apartmentType, description, status, address, owner_id, image_url, image_id];
        const insertedApartment = await db.query(insertApartmentQuery, apartmentValues);
        res.status(200).json({
            message: 'Apartment added successfully'
        })
    }catch(err){
        console.log('Something bad happened', err);
        return next(err)
    }
    
}

exports.updateApartment = async (req, res, next) => {
    let {address, apartmentType, location, price, status, description} = req.body;
    const apartmentId = req.params.id;
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
        let apartmentToUpdate = await getApartmentById(apartmentId);
        if(!apartmentToUpdate){
            return res.status(400).json({
                message: 'Apartment does not exist'
            })
        }
        const updateApartmentQuery = `UPDATE houses SET address= $1, apartmenttype = $2, location = $3, price = $4, 
                                      status = $5, description = $6 WHERE id = $7 `;
        const updateApartmentQueryValues = [address, apartmentType, location, price, status, description, apartmentId];
        const queryResult = await db.query(updateApartmentQuery, updateApartmentQueryValues);
        return res.status(200).json({
            message: 'Apartment updated successfully'
        })
    }catch(err){
        console.log('Something went wrong while updating apartment', err);
        return next(err);
    }
}

exports.deleteApartment = async (req, res, next) => {
    const apartmentId = req.params.id;
    let token = req.headers.authorization;
    if(!token){
        res.status(400).json({
            message: 'Invalid token'
        })
    }
    try {
        let verifiedUser = await verifyToken(token);
        if(!verifiedUser){
            return res.status(400).json({
                message: 'Invalid token'
            })
        }

        let apartmentToDelete = await getApartmentById(apartmentId);
        if(!apartmentToDelete){
            return res.status(400).json({
                message: 'Apartment does not exist'
            })
        }
        const deleteApartmentQuery = 'DELETE FROM houses WHERE id = $1';
        const queryResult = await db.query(deleteApartmentQuery, [apartmentId]);
        return res.status(200).json({
            message: 'Apartment deleted successfully'
        })

    } catch (err) {
        console.log('Something went wrong while deleting apartment', err);
        return next(err);
    }
}