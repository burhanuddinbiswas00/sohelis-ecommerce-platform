const mongoose = require('mongoose');
const Product = require('../models/Product');
const { initialProducts } = require('../config/memoryStore');

let memoryProducts = [...initialProducts];

const isConnected = () => mongoose.connection.readyState === 1;

// @desc    Fetch all products with optional search and category filter
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, featured } = req.query;

    if (isConnected()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { fabric: { $regex: search, $options: 'i' } },
        ];
      }
      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: products.length,
        products,
      });
    }

    // In-memory fallback
    let results = [...memoryProducts];
    if (category && category !== 'All') {
      results = results.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      results = results.filter((p) => p.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.fabric && p.fabric.toLowerCase().includes(q))
      );
    }

    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: results.length,
      products: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    if (isConnected()) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      return res.json({ success: true, product });
    }

    const product = memoryProducts.find((p) => String(p._id) === String(req.params.id));
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, image, description, stock, fabric, featured } = req.body;

    if (!name || !price || !image || !description) {
      res.status(400);
      throw new Error('Please provide name, price, image URL, and description');
    }

    if (isConnected()) {
      const product = new Product({
        name,
        category: category || 'Sari',
        price: Number(price),
        image,
        description,
        stock: stock !== undefined ? Number(stock) : 10,
        fabric: fabric || 'Pure Cotton',
        featured: Boolean(featured),
      });

      const createdProduct = await product.save();
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: createdProduct,
      });
    }

    const newProduct = {
      _id: '6618f0b0000000000000' + String(Date.now()).slice(-4),
      name,
      category: category || 'Sari',
      price: Number(price),
      image,
      description,
      stock: stock !== undefined ? Number(stock) : 10,
      fabric: fabric || 'Pure Cotton',
      featured: Boolean(featured),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryProducts.unshift(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const { name, category, price, image, description, stock, fabric, featured } = req.body;

    if (isConnected()) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }

      if (name !== undefined) product.name = name;
      if (category !== undefined) product.category = category;
      if (price !== undefined) product.price = Number(price);
      if (image !== undefined) product.image = image;
      if (description !== undefined) product.description = description;
      if (stock !== undefined) product.stock = Number(stock);
      if (fabric !== undefined) product.fabric = fabric;
      if (featured !== undefined) product.featured = Boolean(featured);

      const updatedProduct = await product.save();
      return res.json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    }

    const index = memoryProducts.findIndex((p) => String(p._id) === String(req.params.id));
    if (index === -1) {
      res.status(404);
      throw new Error('Product not found');
    }

    const prod = memoryProducts[index];
    if (name !== undefined) prod.name = name;
    if (category !== undefined) prod.category = category;
    if (price !== undefined) prod.price = Number(price);
    if (image !== undefined) prod.image = image;
    if (description !== undefined) prod.description = description;
    if (stock !== undefined) prod.stock = Number(stock);
    if (fabric !== undefined) prod.fabric = fabric;
    if (featured !== undefined) prod.featured = Boolean(featured);
    prod.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: prod,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    if (isConnected()) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }

      await Product.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        message: 'Product removed successfully',
      });
    }

    const index = memoryProducts.findIndex((p) => String(p._id) === String(req.params.id));
    if (index === -1) {
      res.status(404);
      throw new Error('Product not found');
    }

    memoryProducts.splice(index, 1);
    res.json({
      success: true,
      message: 'Product removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  memoryProducts,
};
