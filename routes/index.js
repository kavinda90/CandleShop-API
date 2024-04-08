const router = require("express").Router();
let ProductController = require("../controllers/productController");
let UserController = require("../controllers/userController");
let OrderController = require("../controllers/orderController");

router.get('/products', ProductController.getAllProducts);

router.get('/product-search', ProductController.getPaginationProducts);

router.get('/products/:id', ProductController.getProductById);

router.post('/products', ProductController.createProduct);

router.put('/products/:id', ProductController.updateProductById);

router.delete('/products/:id', ProductController.deleteProductById);

router.get('/products/category/:categoryName', ProductController.getProductsByCategory);

router.get('/products/tag/:tagName', ProductController.getProductsByTag);

router.post('/user/login', UserController.getValidUserByEmail);

router.post('/user/profile', UserController.createUser);

router.put('/user/profile', UserController.updateUserByEmail);

router.post('/orders', OrderController.createOrder);

router.get('/orders/', OrderController.getOrders);

router.get('/orders/:id', OrderController.getOrderById);

module.exports = router;
