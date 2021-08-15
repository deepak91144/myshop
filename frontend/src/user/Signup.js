import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import API from "../backend";
import signup from "../auth/helper/index";
const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",

		success: false,
	});
	const [errMsg, seterrMsg] = useState({
		allErrMsg: "",
	});
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues(() => {
			return {
				...values,
				[name]: value,
			};
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		let user = {
			name: values.name,
			email: values.email,
			password: values.password,
		};
		signup(user)
			.then((data) => {
				console.log(data);
				if (data.error) {
					if (data.error.name) {
						seterrMsg({
							...errMsg,
							allErrMsg: data.error.name.msg,
						});
					}
					if (data.error.email) {
						seterrMsg({
							...errMsg,
							allErrMsg: data.error.email.msg,
						});
					}

					if (data.error.password) {
						seterrMsg({
							...errMsg,
							allErrMsg: data.error.password.msg,
						});
					}
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						error: "",
						success: true,
					});
				}
			})
			.catch((error) => {
				console.log("error in signup");
			});
	};
	const successMessage = () => {
		return (
			<>
				<div className="alert alert-success">
					signup successfully <Link to="/signin">signin here</Link>
				</div>
			</>
		);
	};
	const errorMessage = () => {
		return (
			<>
				<div className="alert alert-danger">{values.error}</div>
			</>
		);
	};
	const signupForm = () => {
		return (
			<>
				<div className="row">
					<div className="col-md-6 offset-sm-3  text-left">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label className="text-light">Name</label>
								<input
									type="text"
									className="form-control"
									name="name"
									onChange={handleChange}
									value={values.name}
								/>
							</div>
							<div className="form-group">
								<label className="text-light">Email</label>
								<input
									type="email"
									className="form-control"
									name="email"
									onChange={handleChange}
									value={values.email}
								/>
							</div>
							<div className="form-group">
								<label className="text-light">Password</label>
								<input
									type="password"
									className="form-control"
									name="password"
									onChange={handleChange}
									value={values.password}
								/>
							</div>

							<button className="btn btn-success btn-block">Signup</button>
						</form>
					</div>
				</div>
			</>
		);
	};
	return (
		<>
			<Base title="signup page" description="A page for user to signup!">
				{values.success == true ? successMessage() : ""}

				{signupForm()}
			</Base>
		</>
	);
};
export default Signup;
