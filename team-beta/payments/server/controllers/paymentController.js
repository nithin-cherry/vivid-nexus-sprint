const crypto = require('crypto');
const razorpay = require('../config/razorpayConfig');


const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    // Compare with the signature sent by the frontend
    if (generated_signature === razorpay_signature) {
        // Signature matches: Payment is AUTHENTIC
        return res.status(200).json({ status: "success", message: "Payment verified successfully" });
    } else {
        // Signature mismatch: Possible tampering
        return res.status(400).json({ status: "failure", message: "Invalid signature" });
    }
}

const createOrder = async (req, res) => {
    const { amount } = req.body; // Amount in INR
    const options = {
        amount: amount * 100, // Razorpay expects amount in paise (100 paise = 1 INR)
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    console.log(options)
    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOrder = createOrder;
exports.verifyPayment = verifyPayment;