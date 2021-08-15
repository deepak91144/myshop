import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#2ecc72" };
	} else {
		return { color: "#d1d1d1" };
	}
};
const Menu = ({ history, location }) => {
	return (
		<>
			<div>
				<ul className="nav nav-tabs bg-dark">
					<li className="nav-item">
						<Link style={currentTab(history, "/")} className="nav-link" to="/">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							style={currentTab(history, "/cart")}
							className="nav-link"
							to="/cart"
						>
							Cart
						</Link>
					</li>
					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className="nav-item">
							<Link
								style={currentTab(history, "/dashboard")}
								className="nav-link"
								to="/user/dashboard"
							>
								U. Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className="nav-item">
							<Link
								style={currentTab(history, "/adashboard")}
								className="nav-link"
								to="/admin/dashboard"
							>
								A.Dashboard
							</Link>
						</li>
					)}

					{!isAuthenticated() && (
						<>
							<li className="nav-item">
								<Link
									style={currentTab(history, "/signup")}
									className="nav-link"
									to="/signup"
								>
									signup
								</Link>
							</li>
							<li className="nav-item">
								<Link
									style={currentTab(history, "/signin")}
									className="nav-link"
									to="/signin"
								>
									Signin
								</Link>
							</li>
						</>
					)}
					{isAuthenticated() && (
						<li className="nav-item">
							<span
								className="nav-link text-warning"
								onClick={() => {
									signout(() => {
										history.push("/");
									});
								}}
							>
								signout
							</span>
						</li>
					)}
				</ul>
			</div>
		</>
	);
};
export default withRouter(Menu);
