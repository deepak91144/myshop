import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
	deleteProduct,
	getAllProducts,
	getProduct,
} from "./helper/adminapicall";
const ManageProducts = () => {
	let [products, setProducts] = useState([]);
	const { user, token } = isAuthenticated();
	const preLoadProducts = () => {
		getAllProducts()
			.then((data) => {
				console.log(data.products);
				setProducts(() => {
					return data.products;
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		preLoadProducts();
	}, []);
	const deleteThisProduct = (productId) => {
		deleteProduct(productId, user._id, token)
			.then((data) => {
				if (data.status == "ok") {
					preLoadProducts();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<Base title="Welcome admin" description="Manage products here">
				<h2 className="mb-4">All products:</h2>
				<Link className="btn btn-info" to={`/admin/dashboard`}>
					<span className="">Admin Home</span>
				</Link>
				kewfkork
				{products.map((product, index) => {
					return (
						<>
							<div className="row">
								<div className="col-12">
									<h2 className="text-center text-white my-3">
										Total 3 products
									</h2>

									<div className="row text-center mb-2 ">
										<div className="col-4">
											<h3 className="text-white text-left">{product.name}</h3>
										</div>
										<div className="col-4">
											<Link
												className="btn btn-success"
												to={`/admin/product/update/${product._id}`}
											>
												<span className="">Update</span>
											</Link>
										</div>
										<div className="col-4">
											<button
												onClick={() => {
													deleteThisProduct(product._id);
												}}
												className="btn btn-danger"
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</>
					);
				})}
			</Base>
		</>
	);
};
export default ManageProducts;
