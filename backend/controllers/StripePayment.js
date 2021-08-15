const stripe = require("stripe")(
	"sk_test_51J2BZdSBw3w1pRyhjUlQxx2V5bcG8YxAvO85JsYUUryag3M3SjkhwkYeNR1Fm7mTxqPh5PGagK7nhKDW6zopu1lG00fgVSixAX"
);
const uuid = require("uuid");
exports.makePayment = (req, res) => {
	const { products, token } = req.body;
	console.log(products);
	let amount = 0;
	products.map((p) => {
		amount = amount + p.price;
	});
	const idempotencyKey = uuid.v4();
	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create(
				{
					amount: amount * 100,
					currency: "usd",
					customer: customer.email,
					shipping: {
						name: token.card.name,
					},
				},

				{ idempotencyKey }
			);
		})
		.then((result) => {
			return res.status(200).json(result);
		})
		.catch((error) => {
			console.log(error);
		});
};
