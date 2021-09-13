const express = require('express');
const orderController = require('./../Controllers/orderController');
const authController = require('./../Controllers/authController')

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router.route('/').get(orderController.getAllOrders).post(authController.restrictTo('user'), orderController.setMedicineUsersIds, orderController.createOrder);

router.route('/:id').get(orderController.getOrder).patch(orderController.updateOrder).delete(orderController.deleteOrder);

module.exports = router;