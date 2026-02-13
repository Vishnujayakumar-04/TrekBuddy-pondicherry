
import { TripDraft, DailyItinerary } from '@/types/planner';
import { PLACES_DATA } from '@/services/data/places';

export async function generateItinerary(draft: TripDraft): Promise<DailyItinerary[]> {
    try {
        const startDate = new Date(draft.startDate);
        const endDate = new Date(draft.endDate);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Context: Available Places
        const placesContext = PLACES_DATA.map(p => `- ${p.name} (${p.category}): ${p.description}`).join('\n');

        const prompt = `
        You are an expert travel planner for Puducherry, India.
        Create a detailed ${days}-day itinerary for a ${draft.type} trip.
        
        TRIP DETAILS:
        - Duration: ${days} days (${draft.startDate} to ${draft.endDate})
        - Travelers: ${draft.travelers}
        - Budget: ${draft.budgetType} ${draft.budgetAmount} INR
        - Pace: ${draft.pace}
        - Interests: ${draft.interests.join(', ')}
        - Transport: ${draft.transport}
        - Stay Area: ${draft.stayArea}
        
        CONSTRAINTS:
        - Mobility Issues: ${draft.mobilityDetails ? 'Yes' : 'No'}
        - Traveling with Kids: ${draft.travelingWithKids ? 'Yes' : 'No'}
        - Traveling with Elderly: ${draft.travelingWithElderly ? 'Yes' : 'No'}
        - Preferred Start Time: ${draft.preferredStartTime || 'Morning'}
        
        AVAILABLE PLACES (Prioritize these but you can suggest others if highly relevant):
        ${placesContext}

        INSTRUCTIONS:
        1. Generate a valid JSON array of DailyItinerary objects.
        2. Strict JSON format only. No markdown code blocks.
        3. Allocate activities to Morning, Afternoon, and Evening slots.
        4. Consider travel time between places.
        5. Add specific tips based on constraints (e.g., "Wheelchair accessible", "Kid-friendly").

        OUTPUT SCHEMA:
        [
            {
                "dayNumber": 1,
                "date": "YYYY-MM-DD",
                "activities": [
                    {
                        "timeSlot": "Morning",
                        "timeRange": "10:00 AM - 01:00 PM",
                        "placeName": "Name of Place",
                        "description": "Short activity description",
                        "travelTime": "15 mins",
                        "tips": "Optional tip"
                    }
                ],
                "totalTravelTime": "1 hour",
                "notes": "Day summary"
            }
        ]
        `;

        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama3.2", // Ensure this model is pulled in Ollama
                prompt: prompt,
                stream: false,
                format: "json" // Force JSON output mode in Ollama
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const text = data.response;

        // Clean up markdown code blocks if present (just in case)
        const jsonString = extractJson(text);

        try {
            const itinerary: DailyItinerary[] = JSON.parse(jsonString);

            if (!Array.isArray(itinerary)) {
                throw new Error("AI returned invalid structure (not an array)");
            }

            return itinerary;
        } catch (error) {
            console.error("JSON Parse Error. Raw Text:", text);
            throw new Error("AI returned invalid data format. Please try again.");
        }

    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate itinerary. Please try again.");
    }
}

function extractJson(text: string): string {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1 && end > start) {
        return text.substring(start, end + 1);
    }
    return text;
}
