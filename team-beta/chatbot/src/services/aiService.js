const { GoogleGenAI } = require('@google/genai');
const Knowledge = require('../models/Knowledge');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Utility helper to pause execution for a given number of milliseconds.
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Executes a function and retries it if a 503 or transient network error is thrown.
 * Uses Exponential Backoff (e.g., 1s, then 2s, then 4s...)
 */
async function callWithRetry(apiCall, retries = 3, initialDelay = 1000) {
    let currentDelay = initialDelay;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await apiCall();
        } catch (error) {
            const is503 = error.status === 503 || 
                          (error.message && error.message.includes('503')) ||
                          (error.toString && error.toString().includes('503'));

            // Only retry on temporary 503 errors and if we have attempts remaining
            if (is503 && attempt < retries) {
                console.warn(`[API Warning] Google GenAI returned 503 on attempt ${attempt}/${retries}. Retrying in ${currentDelay}ms...`);
                await delay(currentDelay);
                currentDelay *= 2; // Exponential spacing
                continue;
            }
            
            // Re-throw any other errors (like 400 or 403) or if all retries failed
            throw error;
        }
    }
}

const generateAIStream = async (userMessage, history, onChunk, onDone) => {
    try {
        // 1. Generate the query vector with exponential backoff retry protection
        const embeddingResponse = await callWithRetry(() => 
            ai.models.embedContent({
                model: 'gemini-embedding-001',
                contents: userMessage,
                config: {
                    outputDimensionality: 768 // Matches our 768 index on Atlas
                }
            }),
            3, // Max 3 retries
            1000 // Initial delay of 1 second
        );

        const queryVector = embeddingResponse.embeddings[0].values;

        // 2. Query MongoDB Vector Search Index
        const matchingChunks = await Knowledge.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryVector,
                    numCandidates: 15, // Raised from 10 to cover all 15 plans
                    limit: 5           // Raised from 3 to give a wider context pool          
                }
            }
        ]);

        // 3. Extrapolate match content strings
        const contextText = matchingChunks.length > 0
            ? matchingChunks.map(chunk => chunk.text).join("\n\n")
            : "No specific pricing or framework information was found.";

        // 4. Form conversation structure
        const contents = [
            ...history,
            {
                role: 'user',
                parts: [{
                    text: `[WEBSITE KNOWLEDGE CONTEXT]\n${contextText}\n\n[USER QUESTION]\n${userMessage}`
                }]
            }
        ];

        // 5. Build strict streaming session with exponential backoff retry protection
        const responseStream = await callWithRetry(() => 
            ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                    systemInstruction: `You are a professional website support assistant for Vivid Nexus.

CRITICAL BOUNDARIES:
- Answer the user's question using the facts provided in the [WEBSITE KNOWLEDGE CONTEXT].
- If the user asks general questions about our services or pricing, use the provided context to summarize our web architecture, AI automation, or branding levels.
- If the context genuinely doesn't contain the answer, or if they ask completely unrelated non-business questions, politely decline to answer and instruct them to contact support via email at support@vividnexus.com.
- Keep answers highly professional, concise, and beautifully structured.
- DO NOT use markdown bullet symbols like asterisks (*). Use clear line breaks and plain spacing to separate your points so it reads beautifully on a standard text display.`,
                    temperature: 0.2
                }
            }),
            3, // Max 3 retries
            1000 // Initial delay of 1 second
        );

        // 6. Iterate and pipe stream data out to the callback
        for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) onChunk(text);
        }

        if (onDone) onDone();

    } catch (error) {
        console.error("Error inside Atlas Retrieval Engine (After retry attempts):", error);
        throw error; // Re-throw the error to be caught and handled cleanly by your controller
    }
};

module.exports = { generateAIStream };