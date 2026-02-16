const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function main() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found!");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    console.log("Checking available models...");
    try {
        // There isn't a direct "listModels" in the simple SDK, but we can try the one we know should work
        // or use the REST API to list them if the SDK doesn't expose it easily in this version.
        // Let's just try to simple generation with 1.5-flash again to see the raw error.

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }

    try {
        const model2 = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result2 = await model2.generateContent("Hello");
        console.log("Success with gemini-2.0-flash:", result2.response.text());
    } catch (error) {
        console.error("Error with gemini-2.0-flash:", error.message);
    }
}

main();
