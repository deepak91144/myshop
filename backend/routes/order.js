const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const userController = require("../controllers/user");
const allMidd = require("../middleware/allmiddleware");
const productController = require("../controllers/product");
const orderController = require("../controllers/order");
router.param("userId", allMidd.getUserById);
router.param("productId", allMidd.getProductById);
router.param("orderId", allMidd.getOrderById);
router.post(
	"/order/create/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.pushOrderInPurchaseList,
	allMidd.updateStock,
	orderController.createOrder
);
router.get(
	"/order/all/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	orderController.getAllOrders
);
router.get(
	"/order/status/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	orderController.getOrderStatus
);
router.put(
	"/order/:orderId/status/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	orderController.updateStatus
);
module.exports = router;
