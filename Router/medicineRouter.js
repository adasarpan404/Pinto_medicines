const express = require('express');
const medicineController = require('./../Controllers/medicineController');
const router = express.Router();
const orderRouter = require('./../Router/orderRouter')
router.route('/').get(medicineController.getAllMedicine).post(medicineController.createMedicine);
router.route('/:id').patch(medicineController.updateMedicine).get(medicineController.getMedicine).delete(medicineController.deleteMedicine);
router.use('/:medicineId/orders', orderRouter)
module.exports = router;