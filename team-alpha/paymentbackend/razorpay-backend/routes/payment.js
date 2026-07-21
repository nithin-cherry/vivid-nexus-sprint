const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

// URL: POST /api/payment/create-order
router.post("/create-order", createOrder);

// URL: POST /api/payment/verify
router.post("/verify", verifyPayment);

module.exports = router;
