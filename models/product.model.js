const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    scent: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false // Optional, depending on your inventory
    },
    rating: {
        type: Number,
        required: false
    },
    burnTime: {
        type: String,
        required: false // Optional, useful for customers to know
    },
    images: [{
        url: String,
        alt: String
    }],
    category: {
        type: String,
        required: true
    },
    bulkPricingOptions: [{
        size: String,
        minimumQuantity: Number,
        pricePerUnit: Number
    }],
    stock: {
        type: Number,
        required: true
    },
    tags: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;