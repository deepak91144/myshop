const productModel = require("../models/product");
exports.createProduct = async (req, res) => {
	let productDetails = req.body;
	const { name, description, price, category, stock } = productDetails;
	if (!name || !description || !price || !category || !stock) {
		return res.status(400).json({
			err: "includes all the fields",
		});
	}
	if (req.file) {
		let fileName = req.file.filename;
		let type = req.file.mimetype.split("/");
		let fileType = type[1];

		let allowedExtensions = ["jpg", "jpeg", "png"];
		if (!allowedExtensions.includes(fileType)) {
			res.json({
				status: "error",
				message: "only jpg,jpef, png type ellowed",
			});
		} else {
			productDetails.photo = fileName;
		}
	}
	const product = new productModel(productDetails);
	const newProduct = await product.save();
	res.json({
		status: "ok",
		message: "new product created successfully",
		product: newProduct,
	});
};
exports.getProduct = (req, res) => {
	res.status(200).json({
		status: "ok",
		message: "product fetced successfully",
		product: req.product,
	});
};
// delete product
exports.deleteProduct = async (req, res) => {
	try {
		const productId = req.product._id;
		const deletedProduct = await productModel.findOneAndDelete({
			_id: productId,
		});
		if (deletedProduct) {
			return res.status(203).json({
				status: "ok",
				message: "product deleted successfully",
			});
		} else {
			return res.status(401).json({
				status: "error",
				message: "something went wrong, try again later",
			});
		}
	} catch (error) {
		return res.status(401).json({
			status: "error",
			message: "something went wrong, try again later",
		});
	}
};

// update product
exports.updateProduct = async (req, res) => {
	try {
		const productDetails = req.body;
		if (req.file) {
			let fileName = req.file.filename;
			let type = req.file.mimetype.split("/");
			let fileType = type[1];

			let allowedExtensions = ["jpg", "jpeg", "png"];
			if (!allowedExtensions.includes(fileType)) {
				res.json({
					message: "only jpg,jpef, png type ellowed",
				});
			} else {
				productDetails.photo = fileName;
			}
		}
		const productId = req.product._id;

		const updatedProduct = await productModel.findOneAndUpdate(
			{ _id: productId },
			productDetails,
			{
				new: true,
			}
		);
		if (updatedProduct) {
			res.status(201).json({
				status: "ok",
				message: "product updated successfullt",
				updatedProduct: updatedProduct,
			});
		} else {
			res.status(401).json({
				err: "something went wrong, try again later",
			});
		}
	} catch (error) {
		res.status(401).json({
			err: "something went wrong, try again later",
		});
	}
};

// listing product
exports.getAllProduct = async (req, res) => {
	try {
		const limit = req.query.limit ? req.query.limit : 5;
		const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
		const products = await productModel
			.find()
			.limit(limit)
			.populate("category");
		if (products) {
			res.status(200).json({
				status: "ok",
				message: "all product fetched successfullt",
				products: products,
			});
		} else {
			res.status(401).json({
				status: "error",
				message: "something went wrong, try again later",
			});
		}
	} catch (error) {
		res.status(401).json({
			status: "error",
			message: "something went wrong, try again later",
		});
	}
};
exports.getAllUniqueCategories = () => {
	productModel.distinct("category", {}, (err, category) => {
		if (err) {
			res.status(400).json({
				error: "No Category Found",
			});
		}
		return res.json(category);
	});
};
