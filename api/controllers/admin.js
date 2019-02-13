const db = require('../db/index');
const bcrypt =  require('bcrypt-nodejs');
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
        const admin = await db.query('SELECT * FROM admins WHERE email = $1', [email]);
        if(admin.rows.length > 0){
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