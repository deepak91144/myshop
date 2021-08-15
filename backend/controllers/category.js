const categoryModel = require("../models/category");
// save category into db
exports.createCategory = async (req, res) => {
	try {
		const category = new categoryModel(req.body);
		const newCategory = await category.save();
		res.json({
			status: "ok",
			message: "category created successfully",
			category: newCategory,
		});
	} catch (error) {
		res.json({
			status: "error",
			message: "something went wrong",
		});
	}
};

// get single category details
exports.getCategory = (req, res) => {
	res.status(200).json(req.category);
};
// get all category
exports.getAllCategory = async (req, res) => {
	try {
		const categories = await categoryModel.find();
		res.status(200).json({
			categories: categories,
		});
	} catch (error) {
		res.status(200).json({
			err: "something went wrong, try again later",
		});
	}
};

//update category
exports.updateCategory = async (req, res) => {
	try {
		const categoryId = req.category._id;
		const categoryDatails = req.body;
		const updatedCategory = await categoryModel.findOneAndUpdate(
			{ _id: categoryId },
			categoryDatails,
			{
				new: true,
			}
		);
		res.status(201).json({
			message: "category updated successfully",
			category: updatedCategory,
		});
	} catch (error) {
		res.status(401).json({
			err: "something went wrong, try again later",
		});
	}
};
// delete category
exports.deleteCategory = async (req, res) => {
	try {
		const categoryId = req.category._id;
		const deletedCategory = await categoryModel.findOneAndDelete({
			_id: categoryId,
		});
		res.status(404).json({
			status: "ok",
			message: "category deleted successfully",
		});
	} catch (error) {
		res.status(401).json({
			status: "error",
			message: "something went wrong",
		});
	}
};
