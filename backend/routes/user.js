const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const allMidd = require("../middleware/allmiddleware");
router.param("userId", allMidd.getUserById);
router.get(
	"/user/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	userController.getUser
);
router.get("/users", userController.getAllUsers);
router.put(
	"/user/update/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	userController.updateUser
);
router.get(
	"/orders/user/:userId",
	allMidd.isSignedIn,
	allMidd.isAuthenticated,
	userController.userPurchaseList
);
module.exports = router;
