const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    // To validate that we enter both name and price in post request
    name: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: String, required:true}
});

module.exports = mongoose.model('Product',productSchema)