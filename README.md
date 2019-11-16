# Sharealist
A responsive full-stack eCommerce website built with React, Express, Socket.io and MongoDB

#### Click [here](http://sharealist-co.herokuapp.com) to view a live demo.

![Sharealist Image](https://i.ibb.co/86qGhSb/demo.jpg)

### How to use the project: 

### `git clone https://github.com/trung2012/sharealist.git`

#### Create an .env file in the project root directory with the following variables:

```
db=yourMongoDB_URL
jwtSecret=your_own_secret
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY
CLOUDINARY_CLOUD_NAME=your_cloudinary_username
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
#### Change the connection in utils/socket.js from '/' to 'http://localhost:5000/' 

#### Then run the following commands in the terminal: 

### `npm install`
### `cd client && npm install`
### `cd..`
### `npm run dev`
<br/>

### Enjoy!

