
export interface Place {
    id: string;
    name: string;
    category: string;
    description: string;
    location: string;
    rating: number;
    image: string;
    tags: string[];
    timeSlot: 'Morning' | 'Afternoon' | 'Evening';
    bestTime?: string;
    openTime?: string;
    entryFee?: string;
}

export const PLACES_DATA: Place[] = [
    // --- BEACHES ---
    {
        id: 'b1', name: "Promenade Beach", category: "beaches",
        description: "The iconic rocky beach of Puducherry, perfect for sunrise walks and evening strolls by the sea.",
        location: "White Town", rating: 4.7,
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=60",
        tags: ["Sunrise", "Relax", "Walking"], timeSlot: "Morning",
        bestTime: "5:30 AM - 8:00 AM", openTime: "24 Hours"
    },
    {
        id: 'b2', name: "Paradise Beach", category: "beaches",
        description: "A pristine island beach accessible only by boat. Famous for its golden sands and water sports.",
        location: "Chunnambar", rating: 4.8,
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9dbb?w=800&auto=format&fit=crop&q=60",
        tags: ["Water Sports", "Ferry", "Clean"], timeSlot: "Morning",
        bestTime: "9:00 AM - 4:00 PM", openTime: "9:00 AM - 5:00 PM", entryFee: "₹350 (Ferry inc.)"
    },
    {
        id: 'b3', name: "Serenity Beach", category: "beaches",
        description: "Popular surfing spot with a long pier and vibrant fishing boats. Great for photography.",
        location: "Kottakuppam", rating: 4.5,
        image: "https://images.unsplash.com/photo-1621517720977-ce9d53da3657?w=800&auto=format&fit=crop&q=60",
        tags: ["Surfing", "Cafes", "Photography"], timeSlot: "Evening",
        bestTime: "4:00 PM - 6:30 PM", openTime: "24 Hours"
    },
    {
        id: 'b4', name: "Auroville Beach", category: "beaches",
        description: "A quiet, shallow beach ideal for swimming and collecting seashells. Less crowded.",
        location: "ECR Road", rating: 4.3,
        image: "https://images.unsplash.com/photo-1616744880572-c0cb49a46328?w=800&auto=format&fit=crop&q=60",
        tags: ["Swimming", "Quiet", "Shells"], timeSlot: "Morning",
        bestTime: "6:00 AM - 10:00 AM", openTime: "24 Hours"
    },
    {
        id: 'b5', name: "Eden Beach", category: "beaches",
        description: "Blue flag beach known for its cleanliness, backwater views, and eco-friendly amenities.",
        location: "Chinna Veerampattinam", rating: 4.8,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
        tags: ["Blue Flag", "Clean", "Sunset"], timeSlot: "Evening",
        bestTime: "4:30 PM - 6:30 PM", openTime: "6:00 AM - 6:00 PM", entryFee: "Free"
    },

    // --- HERITAGE ---
    {
        id: 'h1', name: "White Town Walks", category: "heritage",
        description: "Wander through the French Quarter with its colonial villas, yellow walls, and tree-lined streets.",
        location: "White Town", rating: 4.9,
        image: "https://images.unsplash.com/photo-1596711684365-1779956bd448?w=800&auto=format&fit=crop&q=60",
        tags: ["Architecture", "Walking", "Photography"], timeSlot: "Afternoon",
        bestTime: "3:00 PM - 6:00 PM", openTime: "24 Hours"
    },
    {
        id: 'h2', name: "Puducherry Museum", category: "heritage",
        description: "Discover the region's history, from Roman trade artifacts to French colonial memorabilia.",
        location: "St. Louis Street", rating: 4.2,
        image: "https://images.unsplash.com/photo-1588523315024-f7b5bc608933?w=800&auto=format&fit=crop&q=60",
        tags: ["History", "Indoor", "Museum"], timeSlot: "Afternoon",
        bestTime: "10:00 AM - 5:00 PM", openTime: "10AM - 5PM (Mon Closed)", entryFee: "₹10"
    },
    {
        id: 'h3', name: "Aayi Mandapam", category: "heritage",
        description: "A brilliant white monument in Bharathi Park built to commemorate a 16th-century courtesan.",
        location: "Bharathi Park", rating: 4.4,
        image: "https://plus.unsplash.com/premium_photo-1697730150928-867df3c46645?w=800&auto=format&fit=crop&q=60",
        tags: ["Monument", "Park", "Relax"], timeSlot: "Evening",
        bestTime: "4:00 PM - 8:00 PM", openTime: "6:00 AM - 9:00 PM", entryFee: "Free"
    },
    {
        id: 'h4', name: "French War Memorial", category: "heritage",
        description: "A stylish memorial dedicated to residents of French India who died for the country during World War I.",
        location: "Goubert Avenue", rating: 4.6,
        image: "https://images.unsplash.com/photo-1590680687157-558661845f94?w=800&auto=format&fit=crop&q=60",
        tags: ["Memorial", "History", "Solemn"], timeSlot: "Evening",
        bestTime: "Evening", openTime: "10:00 AM - 5:00 PM", entryFee: "Free"
    },

    // --- SPIRITUAL ---
    {
        id: 's1', name: "Manakula Vinayagar Temple", category: "temples", // mapped to 'Spiritual' later
        description: "An ancient temple dedicated to Lord Ganesha, famous for its golden chariot and temple elephant.",
        location: "White Town", rating: 4.9,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Manakula_Vinayagar_Temple_Pondicherry.jpg/800px-Manakula_Vinayagar_Temple_Pondicherry.jpg", // Wiki placeholder
        tags: ["Temple", "Blessings", "Ganesha"], timeSlot: "Morning",
        bestTime: "6:00 AM or 5:00 PM", openTime: "5:45 AM - 12:30 PM, 4:00 PM - 9:00 PM", entryFee: "Free"
    },
    {
        id: 's2', name: "Sri Aurobindo Ashram", category: "spiritual",
        description: "A spiritual community and ashram founded by Sri Aurobindo and The Mother. A place of deep silence.",
        location: "Marine Street", rating: 4.7,
        image: "https://images.unsplash.com/photo-1623835606828-09553e77c8e3?w=800&auto=format&fit=crop&q=60",
        tags: ["Meditation", "Silence", "Flowers"], timeSlot: "Morning",
        bestTime: "8:00 AM - 12:00 PM", openTime: "8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM", entryFee: "Free"
    },
    {
        id: 's3', name: "Matrimandir", category: "spiritual",
        description: "The soul of Auroville. A massive golden sphere dedicated to human unity and meditation.",
        location: "Auroville", rating: 5.0,
        image: "https://images.unsplash.com/photo-1623083984360-15bd8434cc85?w=800&auto=format&fit=crop&q=60",
        tags: ["Auroville", "Meditation", "Must-Visit"], timeSlot: "Morning",
        bestTime: "Booking Required", openTime: "Viewing Point: 9AM - 5PM", entryFee: "Free (Booking needed)"
    },
    {
        id: 's4', name: "Sacred Heart Basilica", category: "churches", // mapped to 'Spiritual'
        description: "A stunning example of Gothic revival architecture with rare stained glass panels depicting the life of Christ.",
        location: "Subbayah Salai", rating: 4.8,
        image: "https://images.unsplash.com/photo-1548625361-987747e70e3c?w=800&auto=format&fit=crop&q=60",
        tags: ["Church", "Architecture", "Peace"], timeSlot: "Evening",
        bestTime: "Evening Mass", openTime: "6:00 AM - 6:00 PM", entryFee: "Free"
    },
    {
        id: 's5', name: "Immaculate Conception Cathedral", category: "churches",
        description: "The 300-year-old mother church of the Roman Catholic Archdiocese of Pondicherry.",
        location: "Mission Street", rating: 4.6,
        image: "https://images.unsplash.com/photo-1575402095034-7a0ad32152a5?w=800&auto=format&fit=crop&q=60",
        tags: ["Cathedral", "History", "Blue-Gold"], timeSlot: "Morning",
        bestTime: "Daytime", openTime: "5:30 AM - 12:00 PM, 3:00 PM - 8:30 PM", entryFee: "Free"
    },

    // --- FOOD & CAFES ---
    {
        id: 'f1', name: "Cafe des Arts", category: "restaurants",
        description: "A quirky, vintage cafe serving delicious crepes and baguettes in a colonial setting.",
        location: "Suffren Street", rating: 4.6,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=60",
        tags: ["Cafe", "French", "Vintage"], timeSlot: "Afternoon",
        bestTime: "Lunch", openTime: "8:30 AM - 7:00 PM (Tue Closed)", entryFee: "₹500 for two"
    },
    {
        id: 'f2', name: "Coromandel Cafe", category: "restaurants",
        description: "Upscale dining in a beautifully restored heritage mansion with a lush garden courtyard.",
        location: "Romain Rolland St", rating: 4.8,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
        tags: ["Fine Dining", "Heritage", "Cocktails"], timeSlot: "Evening",
        bestTime: "Dinner", openTime: "8:30 AM - 10:30 PM", entryFee: "₹1200 for two"
    },
    {
        id: 'f3', name: "Baker Street", category: "restaurants",
        description: "Famous for authentic French croissants, quiches, and pastries. A concept store for foodies.",
        location: "Bussy Street", rating: 4.5,
        image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?w=800&auto=format&fit=crop&q=60",
        tags: ["Bakery", "Breakfast", "Pastries"], timeSlot: "Morning",
        bestTime: "Breakfast", openTime: "7:00 AM - 10:00 PM", entryFee: "₹400 for two"
    },
    {
        id: 'f4', name: "Le Cafe", category: "restaurants",
        description: "The only 24/7 seafront cafe in Pondicherry. Simple food, unbeatable views.",
        location: "Beach Road", rating: 4.3,
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=60",
        tags: ["Sea View", "24/7", "Coffee"], timeSlot: "Evening",
        bestTime: "Midnight or Sunrise", openTime: "24 Hours", entryFee: "₹300 for two"
    },
    {
        id: 'f5', name: "Villa Shanti", category: "restaurants",
        description: "Elegant courtyard dining offering a mix of Indian and Continental flavors.",
        location: "Suffren Street", rating: 4.7,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60",
        tags: ["Dinner", "Romantic", "Multi-cuisine"], timeSlot: "Evening",
        bestTime: "Dinner", openTime: "12:00 PM - 10:30 PM", entryFee: "₹1500 for two"
    },

    // --- NATURE ---
    {
        id: 'n1', name: "Botanical Gardens", category: "parks",
        description: "Established in 1826, this garden features exotic trees, a toy train, and a musical fountain.",
        location: "Near Bus Stand", rating: 4.1,
        image: "https://images.unsplash.com/photo-1596707328604-faed4c53574c?w=800&auto=format&fit=crop&q=60",
        tags: ["Garden", "Nature", "Family"], timeSlot: "Afternoon",
        bestTime: "4:00 PM - 6:00 PM", openTime: "10:00 AM - 5:00 PM", entryFee: "₹20"
    },
    {
        id: 'n2', name: "Ousteri Lake", category: "nature",
        description: "A vast man-made lake and bird sanctuary. Great for boat rides and sunset watching.",
        location: "Osudu", rating: 4.4,
        image: "https://images.unsplash.com/photo-1549643276-fbc2bd380d6b?w=800&auto=format&fit=crop&q=60",
        tags: ["Lake", "Birds", "Boating"], timeSlot: "Evening",
        bestTime: "Sunset", openTime: "9:00 AM - 5:00 PM", entryFee: "Free (Boating extra)"
    },
    {
        id: 'n3', name: "Pichavaram Mangroves", category: "nature",
        description: "One of the world's largest mangrove forests. Take a boat ride through the narrow canals.",
        location: "Chidambaram (Day Trip)", rating: 4.8,
        image: "https://images.unsplash.com/photo-1529315895786-9a25b16f3c15?w=800&auto=format&fit=crop&q=60",
        tags: ["Mangroves", "Boating", "Day Trip"], timeSlot: "Morning",
        bestTime: "Morning", openTime: "8:00 AM - 5:00 PM", entryFee: "₹200 (Boat)"
    },

    // --- ADVENTURE ---
    {
        id: 'a1', name: "Scuba Diving", category: "adventure",
        description: "Explore the coral reefs and underwater marine life of the Bay of Bengal.",
        location: "Eden Beach / Harbour", rating: 4.9,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=60",
        tags: ["Diving", "Underwater", "Thrilling"], timeSlot: "Morning",
        bestTime: "Morning", openTime: "Booking Required", entryFee: "₹5000+"
    },
    {
        id: 'a2', name: "Surfing Lessons", category: "adventure",
        description: "Learn to surf the waves at Serenity Beach with certified instructors.",
        location: "Serenity Beach", rating: 4.8,
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=60",
        tags: ["Surfing", "Active", "Water"], timeSlot: "Morning",
        bestTime: "Morning", openTime: "7:00 AM - 11:00 AM", entryFee: "₹1500/session"
    },
    {
        id: 'a3', name: "Midnight Cycling", category: "adventure",
        description: "Experience the charm of White Town at night on a guided cycling tour.",
        location: "White Town", rating: 4.7,
        image: "https://images.unsplash.com/photo-1534150534220-43d7de08779b?w=800&auto=format&fit=crop&q=60",
        tags: ["Cycling", "Night", "Tour"], timeSlot: "Evening",
        bestTime: "Night", openTime: "Booking Required", entryFee: "₹800/person"
    },

    // --- SHOPPING ---
    {
        id: 'sh1', name: "Sunday Market", category: "shopping",
        description: "A bustling street market on M.G. Road selling books, clothes, and trinkets at bargain prices.",
        location: "M.G. Road", rating: 4.2,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60",
        tags: ["Street Market", "Cheap", "Crowd"], timeSlot: "Evening",
        bestTime: "Sunday Evening", openTime: "Sunday Only", entryFee: "Free"
    },
    {
        id: 'sh2', name: "Casablanca", category: "shopping",
        description: "A premium department store offering branded clothes, souvenirs, and home decor.",
        location: "Mission Street", rating: 4.5,
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=60",
        tags: ["Mall", "Shopping", "AC"], timeSlot: "Afternoon",
        bestTime: "Daytime", openTime: "10:00 AM - 10:00 PM", entryFee: "Free"
    },
    {
        id: 'sh3', name: "Cluny Embroidery Centre", category: "shopping",
        description: "A colonial building where you can buy delicate hand-embroidered linens made by local women.",
        location: "White Town", rating: 4.6,
        image: "https://images.unsplash.com/photo-1619623725615-512c1b483e0c?w=800&auto=format&fit=crop&q=60",
        tags: ["Handmade", "Charity", "Souvenirs"], timeSlot: "Afternoon",
        bestTime: "Daytime", openTime: "9:00 AM - 5:00 PM", entryFee: "Free"
    }
];

export function getPlacesByCategory(category: string): Place[] {
    const cat = category.toLowerCase();

    if (cat === 'places' || cat === 'all') return PLACES_DATA;

    // Detailed Mappings
    if (cat === 'spiritual') return PLACES_DATA.filter(p => ['spiritual', 'temples', 'churches'].includes(p.category));
    if (cat === 'temples') return PLACES_DATA.filter(p => p.category === 'temples');
    if (cat === 'churches') return PLACES_DATA.filter(p => p.category === 'churches');

    if (cat === 'heritage') return PLACES_DATA.filter(p => ['heritage', 'history', 'monuments'].includes(p.category));
    if (cat === 'museums') return PLACES_DATA.filter(p => p.tags.includes('Museum') || p.category === 'heritage');

    if (cat === 'nature') return PLACES_DATA.filter(p => ['nature', 'parks', 'lakes'].includes(p.category));
    if (cat === 'parks') return PLACES_DATA.filter(p => p.category === 'parks');

    if (cat === 'restaurants') return PLACES_DATA.filter(p => ['restaurants', 'cafes', 'food'].includes(p.category));
    if (cat === 'hotels') return []; // We don't have hotels in seed data yet

    return PLACES_DATA.filter(p => p.category === cat);
}

export function getPlaceById(id: string): Place | undefined {
    return PLACES_DATA.find(p => p.id === id);
}

export function getAllPlaces(): Place[] {
    return PLACES_DATA;
}
