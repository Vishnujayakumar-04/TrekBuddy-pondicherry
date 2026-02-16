
import Groq from 'groq-sdk';

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';

const groq = new Groq({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Since we are using it in client-side components if needed, though safer to keep server-side.
    // Ideally we should use it server-side, but existing architecture uses client-side calls in some places?
    // Wait, gemini.ts was used in chatService which call it directly?
    // Let's check if chatService runs on client or server. It seems to be a service file.
    // If it's used in 'use client' components, we need dangerouslyAllowBrowser: true.
});

export class GroqService {
    private model: string;

    constructor(modelName: string = 'llama-3.3-70b-versatile') { // Updated to latest stable model
        this.model = modelName;
    }

    async generateResponse(prompt: string, systemInstruction?: string): Promise<string> {
        try {
            const messages: any[] = [];
            if (systemInstruction) {
                messages.push({ role: 'system', content: systemInstruction });
            }
            messages.push({ role: 'user', content: prompt });

            const chatCompletion = await groq.chat.completions.create({
                messages: messages,
                model: this.model,
                temperature: 0.7,
                max_tokens: 2048,
            });

            return chatCompletion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq API Error:', error);
            throw error;
        }
    }

    async generateJSON(prompt: string, systemInstruction?: string): Promise<string> {
        try {
            const messages: any[] = [];
            if (systemInstruction) {
                messages.push({ role: 'system', content: systemInstruction });
            }
            messages.push({ role: 'user', content: prompt });

            const chatCompletion = await groq.chat.completions.create({
                messages: messages,
                model: this.model,
                temperature: 0.2, // Lower temperature for more deterministic JSON
                max_tokens: 4096, // Higher token limit for long JSON
                response_format: { type: "json_object" }
            });

            return chatCompletion.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Groq JSON API Error:', error);
            throw error;
        }
    }

    async *generateResponseStream(prompt: string, systemInstruction?: string) {
        try {
            const messages: any[] = [];
            if (systemInstruction) {
                messages.push({ role: 'system', content: systemInstruction });
            }
            messages.push({ role: 'user', content: prompt });

            const stream = await groq.chat.completions.create({
                messages: messages,
                model: this.model,
                temperature: 0.7,
                max_tokens: 1024,
                stream: true,
            });

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    yield content;
                }
            }
        } catch (error) {
            console.error('Groq Streaming Error:', error);
            throw error;
        }
    }

    async checkConnection(): Promise<boolean> {
        try {
            await this.generateResponse('Hello', 'Test');
            return true;
        } catch (error) {
            console.error('Groq Connection Check Failed:', error);
            return false;
        }
    }
}

export const groqService = new GroqService();
