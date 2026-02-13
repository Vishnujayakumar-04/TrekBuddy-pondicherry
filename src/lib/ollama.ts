export class OllamaService {
    private baseUrl: string;
    private model: string;

    constructor(baseUrl: string = 'http://localhost:11434', model: string = 'llama3.2') {
        this.baseUrl = baseUrl;
        this.model = model;
    }

    async generateResponse(prompt: string, systemContext?: string): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    prompt: systemContext ? `${systemContext}\n\nUser: ${prompt}\nAssistant:` : prompt,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        top_p: 0.9,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`Ollama API Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("Ollama Service Error:", error);
            throw error;
        }
    }

    async checkConnection(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

export const ollamaService = new OllamaService();
