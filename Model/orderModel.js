const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.ObjectId,
        ref: 'Medicine',
        required: [true, 'Medicine must belong to a medicine']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to User']
    },
    quantity: {
        type: Number,
        required: [true, 'Please tell us quantity'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name address phonenumber',
    }).populate({
        path: 'medicine',
        select: 'name',
    });
    next();
});



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;