const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = 3000;
const NODE_ENV = process.env.NODE_ENV;

//Routes
const adminRoute = require('./routes/admin');
const apartmentsRoute = require('./routes/apartments')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the MoveIn API"
    })
})

app.use('/api/admin', adminRoute);
app.use('/api/apartments', apartmentsRoute)


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Page not found'
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(port, () => console.log(`Server started on port ${port}`))