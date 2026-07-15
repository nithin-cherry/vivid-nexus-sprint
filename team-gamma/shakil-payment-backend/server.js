const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());

// Root endpoint status check
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Payment integration backend is running.',
    endpoints: {
      config: '/api/config',
      createOrder: '/api/create-order',
      verifyPayment: '/api/verify-payment'
    }
  });
});

// Fetch Razorpay credentials from environment (.env)
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const isSandboxMode = !keyId || !keySecret || 
                      keyId === 'YOUR_RAZORPAY_KEY_ID' || 
                      keySecret === 'YOUR_RAZORPAY_KEY_SECRET';

let razorpay = null;

if (isSandboxMode) {
} else {
  try {
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
    console.log('✅ Razorpay initialized successfully from .env keys!');
  } catch (error) {
    console.error('Failed to initialize Razorpay SDK:', error);
  }
}

/**
 * Route: Fetch active credentials mode status
 */
app.get('/api/config', (req, res) => {
  res.json({
    isSandbox: isSandboxMode,
    keyId: isSandboxMode ? 'YOUR_RAZORPAY_KEY_ID_SANDBOX' : keyId
  });
});

/**
 * Route: Create a new order on backend
 */
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 1) {
      return res.status(400).json({ error: 'Amount must be greater than ₹1' });
    }

    // Server-side calculation of 18% GST grand total to prevent client-side tampering
    const baseAmount = parsedAmount;
    const gstAmount = baseAmount * 0.18;
    const totalAmount = baseAmount + gstAmount;
    const amountInPaise = Math.round(totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    // If sandbox mode, return a mocked order response
    if (isSandboxMode || !razorpay) {
      const mockOrder = {
        id: `order_mock_${Math.random().toString(36).substr(2, 9)}`,
        entity: 'order',
        amount: amountInPaise,
        amount_paid: 0,
        amount_due: amountInPaise,
        currency: 'INR',
        receipt: options.receipt,
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
        isSandbox: true
      };
      return res.json({
        success: true,
        order: mockOrder,
        key: 'YOUR_RAZORPAY_KEY_ID_SANDBOX'
      });
    }

    // Call Razorpay API to create live order
    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order: order,
      key: keyId
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order on server' });
  }
});

/**
 * Route: Verify payment signature securely
 */
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details for verification' });
    }

    // Handle verification for mock order IDs
    if (razorpay_order_id.startsWith('order_mock_')) {
      console.log(`[Sandbox] Verified payment for mock order ${razorpay_order_id}`);
      return res.json({
        success: true,
        message: 'Payment verified successfully (Sandbox Simulation)',
        status: 'success'
      });
    }

    // Standard signature verification for real Razorpay orders
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      console.log(`[Success] Verified payment: ${razorpay_payment_id} for order: ${razorpay_order_id}`);
      res.json({
        success: true,
        message: 'Payment verified successfully!',
        status: 'success'
      });
    } else {
      console.warn(`[Failed] Signature mismatch for order: ${razorpay_order_id}`);
      res.status(400).json({
        success: false,
        message: 'Invalid signature. Payment verification failed.',
        status: 'failure'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Server error during payment verification' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
