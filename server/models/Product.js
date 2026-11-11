const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Sari', 'Three-Piece', 'Two-Piece', 'Dupatta', 'Accessories'],
      default: 'Sari',
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price in BDT'],
      min: [0, 'Price must be positive'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL for the product'],
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    stock: {
      type: Number,
      required: [true, 'Please enter stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 10,
    },
    fabric: {
      type: String,
      default: 'Pure Cotton',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
