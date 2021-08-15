const userModel = require("../models/user");
const orderModel = require("../models/order");
exports.getUser = (req, res) => {
	req.profile.password = undefined;
	return res.json(req.profile);
};
exports.getAllUsers = async (req, res) => {
	try {
		const allUser = await userModel.find();
		res.status(200).json({
			users: allUser,
		});
	} catch (error) {
		res.status(401).json({
			status: "error",
			message: "something went wrong",
		});
	}
};
exports.updateUser = async (req, res) => {
	const updatedUser = await userModel.findOneAndUpdate(
		{ _id: req.profile._id },
		req.body,
		{ new: true }
	);
	res.status(201).json({
		updatedUser: updatedUser,
	});
};
exports.userPurchaseList = async (req, res) => {
	const order = await orderModel
		.find({ user: req.profile._id })
		.populate("user");
	res.status(200).json({
		order: order,
	});
};
