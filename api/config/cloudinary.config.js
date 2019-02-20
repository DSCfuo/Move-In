const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const apartmentImgWidth = 284;
const apartmentImgHeight = 178;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'move-in apartments',
    allowedFormats: ['jpg', 'png'],
    transformation: [{width: apartmentImgWidth, height: apartmentImgHeight, crop: 'limit'}]
})

const parser = multer({storage: storage})
exports.imgParser = parser;
