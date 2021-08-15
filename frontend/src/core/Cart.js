import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/coreapicalls";
import StripeCheckout from "./SripeCheckout";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);
	useEffect(() => {
		setProducts(() => {
			return loadCart();
		});
	}, [reload]);
	console.log(products);
	const loadAllProduct = () => {
		return (
			<>
				<div>
					<h3>All the products</h3>
					{products.map((product, index) => {
						return (
							<>
								<Card
									key={index}
									product={product}
									addToCart={false}
									removeFromCart={true}
									setReload={setReload}
									reload={reload}
								/>
							</>
						);
					})}
				</div>
			</>
		);
	};
	const loadCheckout = () => {
		return (
			<>
				<h1>this is checkout</h1>
			</>
		);
	};
	return (
		<>
			<Base title="cart page" description="ready to checkout">
				<div className="row">
					<div className="col-6">
						{products.length > 0 ? (
							loadAllProduct()
						) : (
							<h3>No Product In The Cart</h3>
						)}
					</div>
					<div className="col-6">
						<StripeCheckout products={products} setReload={setReload} />
					</div>
				</div>
			</Base>
		</>
	);
};
export default Cart;
