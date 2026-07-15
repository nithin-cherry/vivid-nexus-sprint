const { generateAIStream } = require('../services/aiService');

const handleChatStream = async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message content payload required." });
    }

    // Set headers for streaming (chunked transfer encoding)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    let chunksSent = 0;

    try {
        await generateAIStream(
            message,
            history || [],
            (textChunk) => {
                chunksSent++;
                res.write(textChunk); // Pipes parts straight to your widget.js
            },
            () => {
                res.end(); // Safely seals pipeline stream upon generation cutoff
            }
        );
    } catch (error) {
        console.error("Controller pipeline execution failure:", error);
        
        // If the API failed immediately (0 chunks sent), we can adjust status
        if (chunksSent === 0 && !res.headersSent) {
            res.statusCode = 503; 
        }
        
        res.write("\n[Internal Error: The AI service is temporarily busy. Please try again in a moment.]");
        res.end();
    }
};

module.exports = { handleChatStream };