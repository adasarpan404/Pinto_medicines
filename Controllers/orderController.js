const Order = require('./../Model/orderModel')
const factory = require('./handleFactory')
exports.setMedicineUsersIds = (req, res, next) => {
    if (!req.body.medicine) req.body.medicine = req.params.medicineId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getAllOrders = factory.getAll(Order)
exports.getOrder = factory.getOne(Order)
exports.createOrder = factory.createOne(Order)
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);