require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const publicPath = path.resolve(__dirname, './api/public')

//Routes
const adminRoute = require('./api/routes/admin');
const apartmentsRoute = require('./api/routes/apartments')
const newsletterRoute = require('./api/routes/newsletter');
const reviewsRoute = require('./api/routes/reviews');
const contactUsRoute = require('./api/routes/contact');
const listingRoute = require('./api/routes/listings');

require('./api/mailer/newsletter_cronjob');

const app = express();

if(NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(express.static(publicPath))
}else{
    app.use(morgan('dev'))
}

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/admin', adminRoute);
app.use('/api/apartments', apartmentsRoute);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/contact', contactUsRoute);
app.use('/api/listings', listingRoute)

if(NODE_ENV === 'production'){
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(publicPath, 'index.html'))
    })
}

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Page not found'
    })
})

app.use((err, req, res, next) => {
    console.log("Error caught", err)
    res.json({
        message: err.message
    })
})

app.listen(port, () => console.log(`Server started on port ${port}`))