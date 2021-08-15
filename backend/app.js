const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();
require("./models/conn");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripePaymentRoutes = require("./routes/StripePayment");
const port = process.env.PORT || 3000;

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripePaymentRoutes);

app.listen(port, () => {
	console.log("app is listening to port 3000");
});
