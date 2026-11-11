const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { memoryOrders, initialProducts } = require('../config/memoryStore');
const { memoryProducts } = require('./productController');

let inMemOrders = [...memoryOrders];

const isConnected = () => mongoose.connection.readyState === 1;

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res, next) => {
  try {
    const {
      customerName,
      phone,
      address,
      district,
      items,
      paymentMethod,
      shippingFee,
      notes,
    } = req.body;

    if (!customerName || !phone || !address) {
      res.status(400);
      throw new Error('Please provide customer name, phone number, and address');
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error('Order must contain at least one item');
    }

    let calculatedSubtotal = 0;
    const validatedItems = [];

    if (isConnected()) {
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          res.status(404);
          throw new Error(`Product not found: ${item.name || item.productId}`);
        }

        if (product.stock < item.quantity) {
          res.status(400);
          throw new Error(
            `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`
          );
        }

        calculatedSubtotal += product.price * item.quantity;
        validatedItems.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.image,
        });

        product.stock -= item.quantity;
        await product.save();
      }

      const appliedShippingFee = shippingFee !== undefined ? Number(shippingFee) : (district === 'Dhaka' ? 80 : 150);
      const totalAmount = calculatedSubtotal + appliedShippingFee;

      const order = new Order({
        customerName,
        phone,
        address,
        district: district || 'Dhaka',
        items: validatedItems,
        shippingFee: appliedShippingFee,
        totalAmount,
        paymentMethod: paymentMethod || 'Cash on Delivery',
        status: 'Pending',
        notes: notes || '',
      });

      const savedOrder = await order.save();
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order: savedOrder,
      });
    }

    // In-memory fallback
    const targetProducts = memoryProducts && memoryProducts.length > 0 ? memoryProducts : initialProducts;

    for (const item of items) {
      const product = targetProducts.find((p) => String(p._id) === String(item.productId));
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item.name || item.productId}`);
      }

      if (product.stock < item.quantity) {
        res.status(400);
        throw new Error(
          `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }

      calculatedSubtotal += product.price * item.quantity;
      validatedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });

      product.stock -= item.quantity;
    }

    const appliedShippingFee = shippingFee !== undefined ? Number(shippingFee) : (district === 'Dhaka' ? 80 : 150);
    const totalAmount = calculatedSubtotal + appliedShippingFee;

    const newOrder = {
      _id: '6618f0c0000000000000' + String(Date.now()).slice(-4),
      customerName,
      phone,
      address,
      district: district || 'Dhaka',
      items: validatedItems,
      shippingFee: appliedShippingFee,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Pending',
      notes: notes || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    inMemOrders.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const { status } = req.query;

    if (isConnected()) {
      let query = {};
      if (status && status !== 'All') {
        query.status = status;
      }

      const orders = await Order.find(query).sort({ createdAt: -1 });
      const allOrders = await Order.find();
      const totalSales = allOrders.reduce((acc, order) => acc + order.totalAmount, 0);

      return res.json({
        success: true,
        count: orders.length,
        stats: {
          totalOrders: allOrders.length,
          totalSales,
          pendingCount: allOrders.filter((o) => o.status === 'Pending').length,
          processingCount: allOrders.filter((o) => o.status === 'Processing').length,
          shippedCount: allOrders.filter((o) => o.status === 'Shipped').length,
          deliveredCount: allOrders.filter((o) => o.status === 'Delivered').length,
        },
        orders,
      });
    }

    // In-memory fallback
    let filtered = [...inMemOrders];
    if (status && status !== 'All') {
      filtered = filtered.filter((o) => o.status === status);
    }
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalSales = inMemOrders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

    res.json({
      success: true,
      count: filtered.length,
      stats: {
        totalOrders: inMemOrders.length,
        totalSales,
        pendingCount: inMemOrders.filter((o) => o.status === 'Pending').length,
        processingCount: inMemOrders.filter((o) => o.status === 'Processing').length,
        shippedCount: inMemOrders.filter((o) => o.status === 'Shipped').length,
        deliveredCount: inMemOrders.filter((o) => o.status === 'Delivered').length,
      },
      orders: filtered,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res, next) => {
  try {
    if (isConnected()) {
      const order = await Order.findById(req.params.id);
      if (!order) {
        res.status(404);
        throw new Error('Order not found');
      }
      return res.json({ success: true, order });
    }

    const order = inMemOrders.find((o) => String(o._id) === String(req.params.id));
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// @desc    Track order by Order ID or Phone number
// @route   GET /api/orders/track/:query
// @access  Public
const trackOrder = async (req, res, next) => {
  try {
    const rawQuery = (req.params.query || '').trim();
    if (!rawQuery) {
      res.status(400);
      throw new Error('Please provide an Order ID or Phone number to track');
    }

    if (isConnected()) {
      let queryFilter = { phone: rawQuery };
      if (mongoose.Types.ObjectId.isValid(rawQuery)) {
        queryFilter = { $or: [{ _id: rawQuery }, { phone: rawQuery }] };
      }

      const orders = await Order.find(queryFilter).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: orders.length,
        orders,
      });
    }

    // In-memory fallback
    const matched = inMemOrders.filter(
      (o) =>
        String(o._id).toLowerCase() === rawQuery.toLowerCase() ||
        o.phone.trim() === rawQuery
    );

    res.json({
      success: true,
      count: matched.length,
      orders: matched,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!status || !validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status. Allowed: ${validStatuses.join(', ')}`);
    }

    if (isConnected()) {
      const order = await Order.findById(req.params.id);
      if (!order) {
        res.status(404);
        throw new Error('Order not found');
      }

      if (status === 'Cancelled' && order.status !== 'Cancelled') {
        for (const item of order.items) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock += item.quantity;
            await product.save();
          }
        }
      }

      order.status = status;
      const updatedOrder = await order.save();
      return res.json({
        success: true,
        message: `Order status updated to ${status}`,
        order: updatedOrder,
      });
    }

    const order = inMemOrders.find((o) => String(o._id) === String(req.params.id));
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    const targetProducts = memoryProducts && memoryProducts.length > 0 ? memoryProducts : initialProducts;
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      for (const item of order.items) {
        const prod = targetProducts.find((p) => String(p._id) === String(item.productId));
        if (prod) {
          prod.stock += item.quantity;
        }
      }
    }

    order.status = status;
    order.updatedAt = new Date();

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  trackOrder,
  updateOrderStatus,
};
