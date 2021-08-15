import React, { useState, useEffect } from "react";
import addItemToCart, { removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";
const Card = ({
	product,
	addToCart = true,
	removeFromCart = false,
	setReload = (f) => {
		return f;
	},
	reload = undefined,
}) => {
	const addProductToCart = () => {
		addItemToCart(product, () => {
			return <Redirect to="/cart" />;
		});
	};

	const removeProductFromCart = () => {
		removeItemFromCart(product._id);
		setReload(!reload);
	};
	const showAddToCartButton = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={addProductToCart}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};
	const showRemoveFromCartButton = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={removeProductFromCart}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};
	return (
		<div className="card text-white bg-dark border border-info ">
			<div className="card-header lead">A photo from pexels</div>
			<div className="card-body">
				<div className="rounded border border-success p-2">
					<img
						src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
						alt="photo"
						style={{ maxHeight: "100%", maxWidth: "100%" }}
						className="mb-3 rounded"
					/>
				</div>
				<p className="lead bg-success font-weight-normal text-wrap">
					{product.name}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">
					$ {product.price}
				</p>
				<div className="row">
					<div className="col-12">{showAddToCartButton(addToCart)}</div>
					<div className="col-12">
						{showRemoveFromCartButton(removeFromCart)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Card;
