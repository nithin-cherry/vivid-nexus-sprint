const Razorpay = require("razorpay");
const crypto = require("crypto");

// This connects to Razorpay using our secret keys (from .env file)
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// STEP 1: Create a payment order
// Frontend will call this FIRST, before opening the Razorpay payment popup
const createOrder = async (req, res) => {
  try {
    const { amount, name, email } = req.body;

    // Basic validation - make sure required fields are present
    if (!amount || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide amount, name and email",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // Razorpay needs amount in paise (₹1 = 100 paise)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        name: name,
        email: email,
      },
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order, // contains order.id which frontend needs to open checkout
      key_id: process.env.RAZORPAY_KEY_ID, // frontend needs this public key too
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the order",
      error: error.message,
    });
  }
};

// STEP 2: Verify the payment after user pays
// Frontend will call this AFTER Razorpay popup returns a success response
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // Razorpay gives us a signature. We re-create it ourselves using our
    // secret key. If both match --> payment is genuine and not tampered.
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      // ✅ Payment is genuine
      // (In a real app, you would save this to a database here)
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } else {
      // ❌ Payment could not be verified / was tampered with
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying payment",
      error: error.message,
    });
  }
};

module.exports = { createOrder, verifyPayment };
