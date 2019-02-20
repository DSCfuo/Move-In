const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const port = 3000;
const NODE_ENV = process.env.NODE_ENV;

//Routes
const adminRoute = require('./routes/admin');
const apartmentsRoute = require('./routes/apartments')
const newsletterRoute = require('./routes/newsletter');
const reviewsRoute = require('./routes/reviews');
const contactUsRoute = require('./routes/contact');
const listingRoute = require('./routes/listings');

require('./mailer/newsletter_cronjob');

const app = express();

if(NODE_ENV === 'production'){
    app.use(morgan('combined'));
}else{
    app.use(morgan('dev'))
}

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the MoveIn API"
    })
})

app.use('/api/admin', adminRoute);
app.use('/api/apartments', apartmentsRoute);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/contact', contactUsRoute);
app.use('/api/listings', listingRoute)

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