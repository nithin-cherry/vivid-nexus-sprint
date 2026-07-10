import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

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

        if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.CEO_EMAIL) {
            console.error("Missing mail environment variables");

            return res.status(500).json({
                success: false,
                message: "Mail service is not configured",
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            family: 4,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

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

        console.log("Lead received:", req.body);

        transporter
            .sendMail({
                from: `"Vivid Nexus Website" <${process.env.MAIL_USER}>`,
                to: process.env.CEO_EMAIL,
                replyTo: email,
                subject: `New Lead - ${selectedPlan || "Vivid Nexus"}`,
                text: leadText,
            })
            .then(() => {
                console.log("Lead email sent successfully");
            })
            .catch((error) => {
                console.error("Lead email failed:", error);
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
    console.log(`Vivid Nexus backend running on port ${PORT}`);
});