const express = require('express');
const app = express();
//For Logging
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://divya_elsa_agnes:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop-shard-00-00-gzlm3.mongodb.net:27017,node-rest-shop-shard-00-01-gzlm3.mongodb.net:27017,node-rest-shop-shard-00-02-gzlm3.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
{
    useNewUrlParser:true
})



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Incoming request will pass through this middleware
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);



// Handling errors kind of filter
app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    // forward error not request
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;