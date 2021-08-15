const express = require("express");
const router = express.Router();
var multer = require("multer");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});
var upload = multer({ storage: storage });
const categoryController = require("../controllers/category");
const userController = require("../controllers/user");
const allMidd = require("../middleware/allmiddleware");
const productController = require("../controllers/product");
router.param("userId", allMidd.getUserById);
router.param("productId", allMidd.getProductById);
router.post(
	"/product/create/:userId",
	upload.single("photo"),
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	productController.createProduct
);
router.get("/product/:productId", productController.getProduct);
router.delete(
	"/product/delete/:productId/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	productController.deleteProduct
);
router.put(
	"/product/update/:productId/:userId",
	upload.single("photo"),
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	productController.updateProduct
);
router.get("/products/categories", productController.getAllUniqueCategories);
router.get("/products", productController.getAllProduct);

module.exports = router;
