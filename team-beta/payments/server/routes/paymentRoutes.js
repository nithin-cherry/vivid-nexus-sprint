const express = require('express');
const paymentRouter = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');

//test log
paymentRouter.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

paymentRouter.post('/create-order', createOrder);
paymentRouter.post('/verify-payment', verifyPayment);

module.exports = paymentRouter;