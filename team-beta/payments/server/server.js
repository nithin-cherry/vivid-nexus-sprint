const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config({ path: "../.env" }); // Ensure .env is in the /server folder

console.log("--- Initializing Server ---");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas successfully"))
  .catch((err) => console.error("Database connection error:", err));

const razorpay = require("./config/razorpayConfig");
console.log("Razorpay SDK Configured Successfully");


const paymentRouter = require("./routes/paymentRoutes");

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/payments", paymentRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is successfully listening at ${PORT}`);
});

server.on("error", (err) => {
  console.error("SERVER CRASHED:", err);
});
