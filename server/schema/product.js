var mongoose = require('mongoose')
    , Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    story: { type: String, required: true },
    price: { type: Number, required: true },
    imagePath: { data: Buffer, contentType: String },
    location: { type: String, required: true },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;