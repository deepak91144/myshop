import API from "../../backend";
const getProducts = () => {
	return fetch(`${API}/products`, {
		method: "GET",
	})
		.then((data) => {
			return data.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const loadCart = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			return JSON.parse(localStorage.getItem("cart"));
		}
	}
};

export default getProducts;
