const mongoose = require("mongoose");
const productCartSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "product",
	},
	name: String,
	count: Number,
	price: Number,
});
const orderSchema = new mongoose.Schema(
	{
		prducts: [productCartSchema],
		transaction_id: {},
		amount: { type: Number },
		status: {
			type: String,
			default: "Recieved",
			enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
		},
		address: String,
		updated: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{ timestamps: true }
);
const Order = mongoose.model("order", orderSchema);
const ProductCartSchema = mongoose.model(
	"productCartSchema",
	productCartSchema
);
module.exports = ProductCartSchema;
module.exports = Order;
