import API from "../../backend";
const createOrder = (userId, token, orderData) => {
	return fetch(`${API}/order/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ order: orderData }),
	})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.log(error);
		});
};
export default createOrder;
