const mongoose = require('mongoose');
const mongoose = require('mongoose');

const refrigeratorSchema = new mongoose.Schema({
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    door: { type: String, required: true }
});

module.exports = mongoose.model('Refrigerator', refrigeratorSchema);
