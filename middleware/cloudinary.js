const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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

const parser = multer({ storage });

module.exports = parser;