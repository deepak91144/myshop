import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
const AdminDashBoard = () => {
	const {
		user: { name, email, role },
	} = isAuthenticated();
	const adminLeftSide = () => {
		return (
			<>
				<div className="card">
					<h4 className="card-header bg-dark text-white">Admin Navigation</h4>
					<ul className="list-group">
						<li className="list-group-item">
							<Link
								to="/admin/create/category"
								className="nav-link text-success"
							>
								create categories
							</Link>
						</li>
						<li className="list-group-item">
							<Link to="/admin/categories" className="nav-link text-success">
								Manage categories
							</Link>
						</li>
						<li className="list-group-item">
							<Link
								to="/admin/create/product"
								className="nav-link text-success"
							>
								create product
							</Link>
						</li>
						<li className="list-group-item">
							<Link to="/admin/products" className="nav-link text-success">
								manage products
							</Link>
						</li>
						<li className="list-group-item">
							<Link to="/admin/orders" className="nav-link text-success">
								manage orders
							</Link>
						</li>
					</ul>
				</div>
			</>
		);
	};
	const adminRightSide = () => {
		return (
			<>
				<div className="card mb-4">
					<h4 className="card-header">Admin Information</h4>
					<ul className="list-group">
						<li className="list-group-item">
							<span className="badge text-success badge-success mr-2">
								Name:
							</span>
							{name}
						</li>
						<li className="list-group-item">
							<span className="badge text-success  badge-success mr-2">
								Email:
							</span>
							{email}
						</li>
						<li className="list-group-item">
							<span className="badge text-danger badge-dange">Admin Area</span>
						</li>
					</ul>
				</div>
			</>
		);
	};
	return (
		<>
			<Base
				title="AdminDashBoard"
				description="manage all of your product here"
				className="container bg-success p-4"
			>
				<div className="row">
					<div className="col-3">{adminLeftSide()}</div>
					<div className="col-9">{adminRightSide()}</div>
				</div>
			</Base>
		</>
	);
};
export default AdminDashBoard;
