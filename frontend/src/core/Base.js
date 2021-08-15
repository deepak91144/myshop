import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import Menu from "./Menu";
const Base = ({
	title = "My Title",
	description = "My Description",
	className = " text-white text-center",
	children,
}) => {
	return (
		<>
			<div>
				<Menu />
				<div className="container-fluid">
					<div className="jumbotron text-white text-center">
						<h2 className="display-4">{title}</h2>
						<p className="lead"> {description} </p>
					</div>
					<div className={className}>{children}</div>
				</div>
				<footer className="footer bg-dark mt-auto py-3">
					<div className="container-fluid bg-success text-white text-center">
						<h2>idf you have any question feel free to reach out</h2>
						<button className="btn btn-warning btn-lg">contact us</button>
					</div>
					<div className="container">
						<span className="text-muted">
							amazing <span className="text-white">MERN</span> store
						</span>
					</div>
				</footer>
			</div>
		</>
	);
};
export default Base;
