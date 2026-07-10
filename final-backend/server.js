import dns from "node:dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://vivid-nexus-sprint-one.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
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
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/api/leads", async (req, res) => {
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

  console.log("Lead received:", req.body);

  const leadText = `
New Vivid Nexus Lead

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

  res.status(200).json({
    success: true,
    message: "Lead submitted successfully",
  });

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.CEO_EMAIL) {
    console.error("Lead email failed: missing mail env variables");
    return;
  }

  setImmediate(async () => {
    try {
      const info = await transporter.sendMail({
        from: `"Vivid Nexus Website" <${process.env.MAIL_USER}>`,
        to: process.env.CEO_EMAIL,
        replyTo: email,
        subject: `New Lead - ${selectedPlan || "Vivid Nexus"}`,
        text: leadText,
      });

      console.log("Lead email sent successfully to:", process.env.CEO_EMAIL);
      console.log("Message ID:", info.messageId);
    } catch (error) {
      console.error("Lead email failed:", error);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Vivid Nexus backend running on port ${PORT}`);
});