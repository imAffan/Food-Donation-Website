const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
     
    image: String,
    
     
});

module.exports = mongoose.model('banner', BannerSchema);