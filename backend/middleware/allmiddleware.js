var expressJwt = require("express-jwt");
const userModel = require("../models/user");
const categoryModel = require("../models/category");
const productModel = require("../models/product");
const { orderModel, productCartMOdel } = require("../models/order");
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	userProperty: "auth",
	algorithms: ["sha1", "RS256", "HS256"],
});
exports.isAuthenticated = (req, res, next) => {
	let checker = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!checker) {
		return res.status(403).json({
			error: "Access Denide",
		});
	}
	next();
};
exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			status: "error",
			message: "you are not admin",
		});
	}
	next();
};

exports.getUserById = async (req, res, next, userId) => {
	try {
		const user = await userModel.findById(userId);

		if (user) {
			req.profile = user;
		} else {
			res.status(401).json({
				message: "no user found",
			});
		}
		next();
	} catch (error) {
		res.status(401).json({
			message: "no user found",
		});
	}
};
exports.pushOrderInPurchaseList = async (req, res, next) => {
	let purchases = [];
	rq.body.order.products.forEach((product) => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});
	});
	await userModel.findOneAndUpdate(
		{ _id: req.profile._id },
		{ $push: { purchases: purchases } },
		{ new: true }
	);
	next();
};

exports.getCategoryById = async (req, res, next, categoryId) => {
	try {
		const category = await categoryModel.findById(categoryId);
		if (category) {
			req.category = category;
		} else {
			return res.status(401).json({
				message: "category not found",
			});
		}

		next();
	} catch (error) {
		let errMsg = "";
		if (error.name == "CastError") {
			errMsg = "category not found";
		}
		return res.status(401).json({
			message: "could not find any category with this id",
			err: errMsg,
		});
	}
};

// get product by id
exports.getProductById = async (req, res, next, productId) => {
	try {
		const product = await productModel.findById(productId);
		if (product) {
			req.product = product;
		} else {
			return res.json({
				message: "no product found",
			});
		}
	} catch (error) {
		return res.json({
			message: "no product found",
		});
	}
	next();
};

exports.updateStock = () => {
	let myOpperations = req.body.order.products.map((prod) => {
		return {
			updateOne: {
				filter: { _id: productModel._id },
				update: { $in: { stock: -product.count, sold: +prod.count } },
			},
		};
	});
	productModel.bulkWrite(myOpperations, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "bulk opperation failed",
			});
		}
		next();
	});
};
exports.getOrderById = async (req, res, next, orderId) => {
	const order = await orderModel
		.findById(orderId)
		.populate("products.product", "name price");
	if (order) {
		res.status(200).json({
			order: order,
		});
		next();
	} else {
		return res.status(200).json({
			err: "no order found",
		});
	}
};
