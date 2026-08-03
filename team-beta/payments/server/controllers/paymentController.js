const crypto = require("crypto");
const razorpay = require("../config/razorpayConfig");
const Order = require("../models/Order");

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    // 1. Find the order first
    const existingOrder = await Order.findOne({ orderId: razorpay_order_id });
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (existingOrder.status === 'PAID') {
      return res.status(400).json({ message: "Order already verified" });
    }

    // 2. Perform HMAC Verification
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ status: "failure", message: "Invalid signature" });
    }

    // 3. Update the database
    existingOrder.status = "PAID";
    existingOrder.paymentId = razorpay_payment_id;
    existingOrder.signature = razorpay_signature;
    await existingOrder.save();

    return res.status(200).json({ status: "success", message: "Payment recorded" });

  } catch (err) {
    console.error("Verification Error:", err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  const { amount } = req.body; // Amount in INR
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise (100 paise = 1 INR)
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    // SAVE TO DATABASE: Create the 'PENDING' record
    const newOrder = new Order({
      orderId: order.id,
      amount: amount,  //save amount in db in human readable form i.e. rupee
      status: "PENDING",
    });
    await newOrder.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = createOrder;
exports.verifyPayment = verifyPayment;
