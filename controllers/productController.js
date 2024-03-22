const Product = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaginationProducts = async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = req.query.q; 

  // Build query object based on searchTerm presence
  let queryObj = {};
  if (searchTerm) {
    queryObj = { 
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }, // Search in title
        { description: { $regex: searchTerm, $options: 'i' } } // Search in description
      ]
    };
  }

  try {
    const products = await Product.find(queryObj).skip(skip).limit(limit);
    const totalItems = await Product.countDocuments(queryObj); 
    res.status(200).json({ data: products, totalItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.status(200).json({ message: 'Product successfully deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByTag = async (req, res) => {
  try {
    const products = await Product.find({ tags: req.params.tagName });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};