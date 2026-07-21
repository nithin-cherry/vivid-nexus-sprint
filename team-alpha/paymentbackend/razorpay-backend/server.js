const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/payment");

const app = express();

// Middlewares
app.use(cors()); // allows frontend (different port) to talk to this backend
app.use(express.json()); // allows server to read JSON sent from frontend

// Health check route - open this in browser to check server is alive
app.get("/", (req, res) => {
  res.send("✅ Razorpay Backend is running!");
});

// All payment related routes live here
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
