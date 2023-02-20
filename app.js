const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');
// connect to mongodb
mongoose.connect(
    'mongodb+srv://nodeshop:' +
     process.env.MONGO_ATLAS_PW+ 
     '@node-rest-shop.esqqzqe.mongodb.net/?retryWrites=true&w=majority')
//      ,{
//     //useMongoClient: true
// })

mongoose.Promise = global.Promise;
// Make the upload folder publicaly available
app.use('/uploads',express.static('uploads'))
app.use(morgan('dev'));
// bodyParser extract data and make it understandble for us
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Handling Cors
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST, PATCH,DELETE,GET')
        return res.status(200).json({});
    }
    next();
})

// Routes Which handle the requests
app.use('/products',productRoutes);


app.use('/order',orderRoutes);
app.use('/user',userRoutes);

// Routes which handle error when requests not found in above routes

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})

app.use((error,req, res, next) => {
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    })
})

 module.exports = app;