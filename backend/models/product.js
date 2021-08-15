const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 32,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 2000,
		},
		price: {
			type: Number,
			required: true,
			maxlength: 32,
			trim: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "category",
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
