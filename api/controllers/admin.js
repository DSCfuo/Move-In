const db = require('../db/index');
const bcrypt =  require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT_ROUNDS = 10;

const generateSalt = () => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            if(err){
                reject(err)
            }
            resolve(salt)
        })
    })
}

const hashPassword = (data, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, salt, null, (err, hash) => {
            if(err){
                reject(err);
            }
            resolve(hash)
        })
    })
}

const checkPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            if(err){
                reject(err);
            }
            resolve(match)
        })
    })
}

const getAdminByEmail = async (email) => {
    const admin = await db.query('SELECT * FROM admins WHERE email = $1', [email]);
    if(admin.rows.length > 0){
        return admin.rows[0];
    }
    return null;
}

const generateToken = (data) => {
    return new Promise((resolve, reject) => { 
        jwt.sign({data}, process.env.TOKEN_KEY, {expiresIn: '24h'}, (err, token) => {
            if(err){
                reject(err)
            }
            resolve(token)
        })
    })
}

exports.getAllAdmins = async (req, res) => {
    try{
        const admins = await db.query('SELECT * FROM admins');
        res.status(200).json({
            admins: admins.rows,
        })
    }catch(err){
        console.log('Failed to fetch from db', err)
    }
    
}

exports.registerAdmin = async (req, res, next) => {
    try{
        let {name, email, password} = req.body;
        let adminExists = await getAdminByEmail(email);
        if(adminExists){
            console.log('Admin already exists');
            return res.status(403).json({
                message: 'User already exists'
            })
        }
        const salt = await generateSalt();
        password = await hashPassword(password, salt);

        //Insert into db
        const insertAdminQuery = 'INSERT INTO admins (name, email, password, salt) VALUES ($1, $2, $3, $4)';
        const newAdmin = await db.query(insertAdminQuery, [name, email, password, salt]);

        return res.status(200).json({
            message: "Successfully created admin",
        })

    }catch(err){
        console.log('Something bad happened', err);
        return next(err)
    }
}

exports.logInAdmin = async (req, res) => {
    let {email, password} = req.body;
    try {
        let admin = await getAdminByEmail(email);
        if(!admin){
            return res.status(400).json({
                message: 'Account does not exists'
            })
        }
        let match = await checkPassword(password, admin.password)
        if(match){
            const token = await generateToken(admin)
            res.status(200).json({
                message: 'Sign in successful',
                token,
                admin,
            })
        }else{
            res.status(403).json({
                message: 'Incorrect password'
            })
        }
    } catch (err) {
        
    }
}