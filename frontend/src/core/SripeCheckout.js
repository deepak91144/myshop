import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { loadCart } from "./helper/coreapicalls";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import API from "../backend";
import createOrder from "./helper/oderHelper";

const StripeCheckout = ({
	products,
	setReload = (f) => {
		return f;
	},
	reload = undefined,
}) => {
	const [data, setData] = useState("");
	const token = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;
	const finalPrice = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + p.price;
		});
		return amount;
	};
	const makePayment = (token) => {
		cartEmpty();
		setReload(!reload);
		const body = {
			token,
			products,
		};
		const headers = {
			"Content-Type": "application/json",
		};
		return fetch(`${API}/stripepayment`, {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const showStripeButton = () => {
		return isAuthenticated() ? (
			<StripeCheckoutButton
				stripeKey="pk_test_51J2BZdSBw3w1pRyhri7bH5X7cZ8pp6H4LkT2E3MKFBxqi5IZHBPKexiozRn2ZqkWJNJADiGFkX2ySiA461cEYMG200dTeHmOqy"
				token={makePayment}
				amount={finalPrice() * 100}
				name="but t-shirts"
			>
				<button className="btn btn-success">play with striple</button>
			</StripeCheckoutButton>
		) : (
			<Link to="/signin">
				<button className="btn btn-success">signin</button>
			</Link>
		);
	};
	return (
		<>
			<div className="text-white">this is stripe checkout{finalPrice()}</div>
			{showStripeButton()}
		</>
	);
};
export default StripeCheckout;
