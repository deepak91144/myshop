import React, { useState } from "react";

import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
const Signin = () => {
	const { user } = isAuthenticated();
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	let [emailErr, setEmailErr] = useState("");
	let [passwordErr, setpasswordErr] = useState("");
	let [didRedirect, setDidRedirect] = useState(false);
	let [error, setError] = useState("");
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues({
			...values,
			[name]: value,
		});
	};
	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role == 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}

		if (isAuthenticated()) {
			<Redirect to="/" />;
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		signin(values)
			.then((data) => {
				console.log(data);
				if (data.error) {
					console.log(data.error);
					data.error.email
						? setEmailErr(() => {
								return (emailErr = data.error.email.msg);
						  })
						: setEmailErr(() => {
								return (emailErr = "");
						  });

					data.error.password
						? setpasswordErr(() => {
								return (passwordErr = data.error.password.msg);
						  })
						: setpasswordErr(() => {
								return (passwordErr = "");
						  });
				}
				if (data.token) {
					console.log(data);
					authenticate(data, () => {
						setDidRedirect(() => {
							return (didRedirect = true);
						});
					});
					console.log(didRedirect);
				} else {
					setError(() => {
						return (error = data.data);
					});
					setDidRedirect(() => {
						return (didRedirect = false);
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const signinForm = () => {
		return (
			<>
				<div className="row">
					<div className="col-md-6 offset-sm-3  text-left">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label className="text-light">Email</label>
								<input
									type="email"
									className="form-control"
									name="email"
									value={values.email}
									onChange={handleChange}
								/>
								{emailErr ? emailErr : ""}
							</div>
							<div className="form-group">
								<label className="text-light">Password</label>
								<input
									type="password"
									className="form-control"
									name="password"
									value={values.password}
									onChange={handleChange}
								/>
								{passwordErr ? passwordErr : ""}
							</div>
							<button className="btn btn-success btn-block">Signin</button>
							{error ? error : ""}
						</form>
					</div>
				</div>
			</>
		);
	};
	return (
		<>
			<Base title="signin page" description="A page for user to signin!">
				{signinForm()}
				{performRedirect()}
			</Base>
		</>
	);
};
export default Signin;
