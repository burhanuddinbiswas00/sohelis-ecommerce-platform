const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createOrder)
  .get(protect, admin, getAllOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

module.exports = router;
