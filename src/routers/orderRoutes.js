const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createOrder);
router.get('/list', getAllOrders);
router.get('/:id', getOrderById);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);

module.exports = router;