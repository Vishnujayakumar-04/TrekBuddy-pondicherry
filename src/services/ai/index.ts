import { AIProvider } from './types';
import { OllamaProvider } from './providers/ollama';
import { OpenAIProvider } from './providers/openai';

// Factory logic to select provider based on environment variable
const providerType = process.env.NEXT_PUBLIC_AI_PROVIDER || 'ollama';

let aiService: AIProvider;

if (providerType === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
        console.warn('OPENAI_API_KEY is missing. AI features may fail in production.');
    }
    aiService = new OpenAIProvider(apiKey);
} else {
    // Default to Ollama (Local)
    aiService = new OllamaProvider();
}

export { aiService };
