import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vivid Nexus backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend health check OK",
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/api/leads", async (req, res) => {
  try {
    const {
      clientName,
      email,
      whatsappNumber,
      corporateUrl,
      selectedPlan,
      planPrice,
      message,
      timestamp,
    } = req.body;

    if (!clientName || !email || !whatsappNumber) {
      return res.status(400).json({
        success: false,
        message: "Client name, email, and WhatsApp number are required",
      });
    }

    const leadText = `
New Vivid Nexus Checkout Lead

Client Name: ${clientName}
Client Email: ${email}
WhatsApp Number: ${whatsappNumber}
Corporate / Business URL: ${corporateUrl || "Not provided"}

Selected Plan: ${selectedPlan || "Not provided"}
Plan Price: ${planPrice || "Not provided"}

Message:
${message || "No message provided"}

Submitted At: ${timestamp || new Date().toISOString()}
`;

    console.log("Lead received:", req.body);

    await transporter.sendMail({
      from: `"Vivid Nexus Website" <${process.env.MAIL_USER}>`,
      to: process.env.CEO_EMAIL,
      replyTo: email,
      subject: `New Checkout Lead - ${selectedPlan || "Vivid Nexus"}`,
      text: leadText,
    });

    return res.status(200).json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error) {
    console.error("Lead submission failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send lead email",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});