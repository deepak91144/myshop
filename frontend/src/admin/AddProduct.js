import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

import Base from "../core/Base";
import { createProduct, getAllCtaegories } from "./helper/adminapicall";

export const AddProduct = () => {
	const [values, setvalues] = useState({
		photo: "",
		name: "",
		description: "",
		price: "",
		stock: "",
		formData: "",
	});
	let [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const { user, token } = isAuthenticated();
	const [categories, setCategories] = useState([]);
	const preloadCategories = () => {
		getAllCtaegories()
			.then((data) => {
				setCategories(() => {
					return data.categories;
				});
				setvalues(() => {
					return {
						...values,
						formData: new FormData(),
					};
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		preloadCategories();
	}, []);

	const createProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group">
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange}
					name="name"
					className="form-control"
					placeholder="Name"
					value={values.name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange}
					name="description"
					className="form-control"
					placeholder="Description"
					value={values.description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange}
					type="number"
					name="price"
					className="form-control"
					placeholder="Price"
					value={values.price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange}
					className="form-control"
					placeholder="Category"
					name="category"
				>
					<option>Select</option>
					{categories.map((data, index) => {
						return (
							<>
								<option value={data._id}>{data.name}</option>
							</>
						);
					})}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange}
					type="number"
					name="stock"
					className="form-control"
					placeholder="Quantity"
					value={values.stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Create Product
			</button>
		</form>
	);
	const handleChange = (e) => {
		const name = e.target.name;
		const value = name === "photo" ? e.target.files[0] : e.target.value;
		values.formData.set(name, value);
		setvalues(() => {
			return {
				...values,
				[name]: value,
			};
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(values);
		createProduct(user._id, token, values.formData)
			.then((data) => {
				console.log(data);
				if (data.status == "ok") {
					setvalues(() => {
						return {
							photo: "",
							name: "",
							description: "",
							price: "",
							stock: "",
						};
					});
					setSuccess(() => {
						return true;
					});
					setError(() => {
						return false;
					});
				} else {
					setSuccess(() => {
						return false;
					});
					setError(() => {
						return true;
					});
				}

				console.log(success);
			})
			.catch((error) => {
				console.log(error);
				setSuccess(() => {
					return false;
				});
				setError(() => {
					return true;
				});
			});
	};
	const showSuccessMessage = () => {
		if (success) {
			return (
				<>
					<p className="text-success">product created successfully</p>
				</>
			);
		}
	};
	const showErrorMessage = () => {
		if (error) {
			return (
				<>
					<p className="text-danger">something went wrong</p>
				</>
			);
		}
	};

	return (
		<Base
			title="Add a product here"
			description="welcome to product creation section"
			className="container bg-info p-4"
		>
			<Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
				Admin Home
			</Link>
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{createProductForm()}

					{showSuccessMessage()}
					{showErrorMessage()}
				</div>
			</div>
		</Base>
	);
};
export default AddProduct;
