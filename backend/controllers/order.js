const { orderModel, productCartMOdel } = require("../models/order");
exports.createOrder = async (req, res) => {
	req.body.order.user = req.profile;
	const order = new orderModel(req.body.order);
	const newOrder = await order.save();
	if (newOrder) {
		res.json({
			order: order,
		});
	} else {
		res.status(401).json({
			err: "something went wrong",
		});
	}
};
exports.getAllOrders = async (req, res) => {
	const orders = await orderModel.find().populate("user", "_id name");
	if (orders) {
		res.status(200).json({
			orders: orders,
		});
	} else {
		res.status(200).json({
			err: "no orders found",
		});
	}
};
exports.getOrderStatus = async (req, res) => {
	res.json(orderModel.schema.path("status").enumValues);
};
exports.updateStatus = async (req, res) => {
	const updatedStatus = await orderModel.findOneAndUpdate(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		{ new: true }
	);
	if (updatedStatus) {
		res.status(200).json({
			message: "status updated successfully",
			status: updatedStatus,
		});
	} else {
		res.status(200).json({
			err: "status update failed",
		});
	}
};
