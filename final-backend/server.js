import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://vivid-nexus-sprint-one.vercel.app",
  "https://vividnexus.in",
  "https://www.vividnexus.in",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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

async function sendLeadEmail({ email, selectedPlan, leadText }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"VividNexus Website" <${process.env.MAIL_USER}>`,
    to: process.env.CEO_EMAIL || "ceo@vividnexus.in",
    replyTo: email,
    subject: `New Lead - ${selectedPlan || "VividNexus Plan"}`,
    text: leadText
  });
}
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

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.CEO_EMAIL) {
    console.error("Lead email skipped: missing mail env variables");

    return res.status(500).json({
      success: false,
      message: "Lead received, but email service is not configured",
    });
  }

  try {
    await sendLeadEmail({ email, selectedPlan, leadText });

    return res.status(200).json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error) {
    console.error("Lead email failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send lead email",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Vivid Nexus backend running on port ${PORT}`);
});