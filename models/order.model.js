const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  rating: Number,
  price: Number,
  brandName: String,
  amount: Number,
  selectedSize: String,
  isInWishList: Boolean,
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['in progress', 'shipped', 'delivered', 'cancelled'], // Add more statuses as needed
    default: 'in progress'
  },
  subtotal: {
    type: Number,
    required: true
  },
  cartItems: [cartItemSchema],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;