const express = require("express");
const stripePaymentController = require("../controllers/StripePayment");
const router = express.Router();
router.post("/stripepayment", stripePaymentController.makePayment);
module.exports = router;
