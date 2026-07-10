const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { handleChatStream } = require('../src/controllers/aiController');
require('dotenv').config();

const app = express();

// --- DATABASE CONNECTION ---
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    
    cachedDb = await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'VividNexus-sprint'
    });
    console.log("💾 MongoDB Connected to VividNexus-sprint");
    return cachedDb;
}

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Lead Capture Webhook
app.post('/api/webhook/lead', async (req, res) => {
    await connectToDatabase();
    const { email, lastMessage } = req.body;

    console.log('[WEBHOOK TRIGGERED] New Lead Logged');
    console.log(`Email:        ${email || 'Not Provided'}`);
    console.log(`Last Message: "${lastMessage || 'None'}"`);

    return res.status(200).json({
        success: true,
        message: 'Lead captured successfully.'
    });
});

// 2. Onboarding Processing
app.post('/api/onboarding/start', async (req, res) => {
    await connectToDatabase();
    console.log(req.body);
    
    return res.status(200).json({
        success: true,
        message: 'Onboarding logs processed successfully.'
    });
});

// 3. AI Chat Stream
app.post('/api/chat/stream', async (req, res) => {
    await connectToDatabase();    
    handleChatStream(req, res);
});

// --- SERVER INITIALIZATION ---
module.exports = app;