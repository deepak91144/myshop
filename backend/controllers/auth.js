const userModel = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var cookieParser = require("cookie-parser");
exports.signup = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(401).json({
				error: errors.mapped(),
			});
			return;
		}
		const plainPassword = req.body.password;

		const hashedPassword = await bcrypt.hash(plainPassword, 10);
		req.body.password = hashedPassword;
		const user = new userModel(req.body);
		const newUser = await user.save();
		res.status(201).json({
			status: "ok",
			message: "new user added",
			user: newUser,
		});
	} catch (error) {
		var isEmailExist = "";
		// if (error.keyValue.email) {
		// 	isEmailExist = "email exist";
		// }
		res.json({
			status: "error",
			message: "something went wrong, may be you entered a ",
			error: error,
		});
	}
};
exports.signin = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(401).json({
			error: errors.mapped(),
		});
		return;
	}
	const { email, password } = req.body;
	const emailExist = await userModel.findOne({ email: email });
	if (emailExist) {
		const isPasswordMatched = await bcrypt.compare(
			password,
			emailExist.password
		);

		if (isPasswordMatched) {
			// create token
			const token = jwt.sign({ _id: emailExist._id }, process.env.SECRET);
			//putting token on cookie
			res.cookie("token", token, { expire: new Date() + 9999 });
			res.json({
				token: token,
				user: emailExist,
			});
		} else {
			res.json({
				data: "incorrect eamil or password",
			});
		}
	} else {
		res.json({
			data: "incorrect eamil or password",
		});
	}
};
