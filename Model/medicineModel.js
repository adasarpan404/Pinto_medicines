const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please write the name of medicine party']
    },
    photo: {
        type: String,
        required: [true, 'Please submit a photo']
    },
    quantity: {
        type: Number,
        required: [true, 'please enter how many medicine is in stocks']
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;