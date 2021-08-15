const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const allMidd = require("../middleware/allmiddleware");
router.param("userId", allMidd.getUserById);
router.param("categoryId", allMidd.getCategoryById);
router.post(
	"/category/create/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	categoryController.createCategory
);
router.get("/category/:categoryId", categoryController.getCategory);
router.get("/categories", categoryController.getAllCategory);
router.put(
	"/category/update/:categoryId/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	categoryController.updateCategory
);
router.delete(
	"/category/delete/:categoryId/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	allMidd.isAdmin,
	categoryController.deleteCategory
);
module.exports = router;
