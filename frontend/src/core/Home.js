import React, { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import getProducts from "./helper/coreapicalls";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const preloadProducts = () => {
		getProducts()
			.then((data) => {
				if ((data.status = "ok")) {
					setProducts(() => {
						return data.products;
					});
				} else {
					setError(() => {
						return true;
					});
				}
				console.log(products);
			})
			.catch((error) => {
				console.log(console.error());
			});
	};
	useEffect(() => {
		preloadProducts();
	}, []);
	const showErrorMessage = () => {
		if (error) {
			return (
				<>
					<div className="text-danger">No Product Found</div>
				</>
			);
		}
	};
	return (
		<>
			<Base title="Home Page" description="welcome to the tshirt page">
				<div className="row text-center">
					<h1 className="text-white">All Of Tshirts</h1>
					<div className="row">
						{products.map((product, index) => {
							return (
								<>
									<Card key={index} product={product} />;
								</>
							);
						})}
					</div>
				</div>
				{showErrorMessage()}
			</Base>
		</>
	);
}
