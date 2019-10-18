const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'sharealist_images',
  allowedFormats: ['jpg', 'png'],
  transformation: [{
    height: 500,
    crop: 'limit'
  }]
});

const parser = multer({
  storage,
  limits: {
    fileSize: 5000000
  }
});

module.exports = parser;