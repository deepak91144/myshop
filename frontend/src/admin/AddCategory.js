import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import Base from "./../core/Base";
import { createCategory } from "./helper/adminapicall";
const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, seterror] = useState(false);
	const [success, setSuccess] = useState(false);
	const { user, token } = isAuthenticated();
	const goBack = () => {
		return (
			<>
				<div className="mt-5">
					<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
						Admin Home
					</Link>
				</div>
			</>
		);
	};
	const myCategoryForm = () => {
		return (
			<>
				<form>
					<div className="form-group">
						<p className="lead">enter the category</p>
						<input
							type="text"
							className="form-control my-3"
							autoFocus
							required
							placeholder="for ex:summer"
							onChange={handleChange}
							value={name}
						/>
						<button
							className="btn bg-success btn-outline-info"
							onClick={handleSubmit}
						>
							create category
						</button>
					</div>
				</form>
			</>
		);
	};
	const handleChange = (e) => {
		seterror("");
		setName(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		seterror();
		setSuccess(false);
		createCategory(user._id, token, { name: name })
			.then((data) => {
				console.log(data);
				if (data.status == "error") {
					seterror(true);
					setSuccess(false);
				}
				if (data.status == "ok") {
					setSuccess(true);
					seterror(false);
				}
			})
			.catch((error) => {
				console.log(error);
				seterror(true);
				setSuccess(false);
			});
	};
	const showSuccessMsg = () => {
		if (success) {
			return (
				<>
					<p className="text-success">new category added successfully</p>
				</>
			);
		}
	};
	const showErrorMsg = () => {
		if (error) {
			return (
				<>
					<p className="text-danger">something went wrong</p>;
				</>
			);
		}
	};
	return (
		<>
			<Base
				title="craete a category here"
				description="add a new category"
				className="container  bg-info p-4"
			>
				<div className="row bg-white rounded">
					<div className=" col-md-8 offset-md-2">
						{myCategoryForm()}
						{showSuccessMsg()}
						{showErrorMsg()}
						{goBack()}
					</div>
				</div>
			</Base>
		</>
	);
};
export default AddCategory;
