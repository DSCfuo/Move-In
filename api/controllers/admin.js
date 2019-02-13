const db = require('../db/index')
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