const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    title: String,
    image: String,
    price: Number,
     
});

module.exports = mongoose.model('fooditem', FoodItemSchema);