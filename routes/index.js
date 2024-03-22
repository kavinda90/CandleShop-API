const router = require("express").Router();
let ProductController = require("../controllers/productController");

// Fetch all products
router.get('/products', ProductController.getAllProducts);

// Fetch all products with pagination
router.get('/product-page', ProductController.getPaginationProducts);

// Fetch a single product by ID
router.get('/products/:id', ProductController.getProductById);

// Create a new product
router.post('/products', ProductController.createProduct);

// Update a product by ID
router.put('/products/:id', ProductController.updateProductById);

// Delete a product by ID
router.delete('/products/:id', ProductController.deleteProductById);

// Fetch products by category
router.get('/products/category/:categoryName', ProductController.getProductsByCategory);

// Fetch products by tag
router.get('/products/tag/:tagName', ProductController.getProductsByTag);

       
module.exports = router;