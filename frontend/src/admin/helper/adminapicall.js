import API from "../../backend";
// category API call
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// get all categories
export const getAllCtaegories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// delete a category
export const deleteAcategory = (categoryId, userId, token) => {
	return fetch(`${API}/category/delete/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// create product
export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",

			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
// get  all products
export const getAllProducts = () => {
	return fetch(`${API}/products`, {
		method: "GET",
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// delete a product
export const deleteProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/delete/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json, text/plain, */*",

			Authorization: `Bearer ${token}`,
		},
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
// get a product
export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// update product
export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/update/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json, text/plain, */*",

			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
