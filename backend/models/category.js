const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 32,
			unique: true,
		},
	},
	{ timestamps: true }
);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
