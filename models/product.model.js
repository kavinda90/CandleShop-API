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
    price: {
        type: Number,
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
    size: {
        type: String,
        required: true
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
    bulkAvailable: {
        type: Boolean,
        default: false
    },
    bulkPricingOptions: [{
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