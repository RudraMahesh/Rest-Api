const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
})

const topModel = mongoose.model("mainmodels", modelSchema);

module.exports = (topModel);