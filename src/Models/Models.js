const mongoose = require('mongoose')

const modelsSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    price: Number,
    image: String
});
const ourModel = mongoose.model('models', modelsSchema);

module.exports = (ourModel);