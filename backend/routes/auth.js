const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var cookieParser = require("cookie-parser");
var jsonParser = bodyParser.json();
const allMidd = require("../middleware/allmiddleware");
router.use(jsonParser);
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
const authController = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
router.post(
	"/signup",
	[
		check("name", "name can not be less than three character").isLength({
			min: 3,
		}),
		check("email", "enter valid email").isEmail(),
		check("password", "password must be minimum 6 character").isLength({
			min: 6,
		}),
	],
	authController.signup
);
router.post(
	"/signin",
	[
		check("email", "enter valid email").isEmail(),
		check("password", "password must be minimum 6 character").notEmpty(),
	],
	authController.signin
);
router.get("/check", allMidd.isSignedIn, (req, res) => {
	res.json({
		data: req.auth,
	});
});
module.exports = router;
