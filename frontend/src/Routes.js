import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exacat path="/signup" component={Signup} />
				<Route exact path="/signin" component={Signin} />

				<Route exact path="/cart" component={Cart} />
				<PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />

				<AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
				<AdminRoute
					exact
					path="/admin/create/category"
					component={AddCategory}
				/>
				<AdminRoute
					exact
					path="/admin/categories"
					component={ManageCategories}
				/>
				<AdminRoute exact path="/admin/create/product" component={AddProduct} />
				<AdminRoute exact path="/admin/products" component={ManageProducts} />
				<AdminRoute
					exact
					path="/admin/product/update/:productId"
					component={UpdateProduct}
				/>
			</Switch>
		</BrowserRouter>
	);
}
