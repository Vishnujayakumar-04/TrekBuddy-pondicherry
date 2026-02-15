import { collection, doc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface TransitItem {
    id: string;
    category: 'rentals' | 'cabs' | 'bus' | 'train';
    subCategory?: string; // 'bike', 'scooty', 'car', 'cycle', 'auto', 'city-taxi', 'local', 'interstate', 'express', etc.
    type?: string;
    name: string;
    description?: string;
    price?: string;
    availability?: string;
    image?: string;
    rating?: number;
    contact?: string;
    location?: string;
    // Bus/Train specific fields
    from?: string;
    to?: string;
    via?: string[];
    frequency?: string;
    duration?: string;
    stops?: number;
    classes?: string[];
    departure?: string;
    arrival?: string;
    number?: string;
    // Cabs specific
    baseRate?: string;
    perKm?: string;
    bookingMethod?: string;
    bookingUrl?: string;
    bookingUrls?: { name: string; url: string }[];
    tips?: string;
    specialty?: string;
    // Train Station
    code?: string;
    address?: string;
    facilities?: string[];
    // Rental specific
    mapUrl?: string;
    openHours?: string;
}

export const SEED_DATA: TransitItem[] = [
    // --- RENTALS (SELF-DRIVE VEHICLES) ---
    // 🚲 Bike / Scooter Rental (Most Popular)
    {
        id: 'r1', category: 'rentals', subCategory: 'Bike', name: 'HAPPY RIDE BIKE RENTAL',
        rating: 4.8, price: '₹300-750/day',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
        contact: '+91 96776 87007', location: '152, South Boulevard, near Railway Station',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9266421,79.8253956',
        openHours: 'Open 24 hours',
        description: 'Popular choice near Railway Station. Well-maintained bikes and scooters. Helmet provided.'
    },
    {
        id: 'r2', category: 'rentals', subCategory: 'Bike', name: 'Bike Rental Pondy MANI',
        rating: 4.9, price: '₹350-800/day',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        contact: '+91 94869 63681', location: 'Sardar Vallabbhai Patel Salai, White Town',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9390,79.8361',
        openHours: '7:00 AM - 10:00 PM',
        description: 'Located in the heart of White Town. Wide range of geared and non-geared bikes.'
    },
    {
        id: 'r3', category: 'rentals', subCategory: 'Scooty', name: 'Mariyal Bike Rental',
        rating: 4.9, price: '₹350-700/day',
        image: 'https://images.unsplash.com/photo-1599819177477-0c1c63a8f5e1?w=800',
        contact: '+91 75399 76025', location: '12, Hyder Ali Street, South Boulevard, opposite Water Tank',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9416,79.8083',
        openHours: 'Open 24 hours',
        description: 'Reliable service opposite Water Tank. Good condition scooters available.'
    },
    {
        id: 'r4', category: 'rentals', subCategory: 'Bike', name: 'Bombay Bike Rental',
        rating: 4.8, price: '₹400-750/day',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        contact: '+91 98940 12345', location: 'Rue Milad Street, MG Road area',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9350,79.8300',
        openHours: '8:00 AM - 9:00 PM',
        description: 'Central location near MG Road. Good for city exploring.'
    },
    {
        id: 'r5', category: 'rentals', subCategory: 'Bike', name: 'Les Pondy Two wheeler Bike Rent',
        rating: 4.7, price: '₹300-600/day',
        image: 'https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?w=800',
        contact: '+91 99440 54321', location: 'Mission St, Heritage Town',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9333,79.8320',
        openHours: '7:30 AM - 9:30 PM',
        description: 'Convenient location in Heritage Town. Budget-friendly options.'
    },
    {
        id: 'r6', category: 'rentals', subCategory: 'Scooty', name: 'Joy ride\'s bike rental',
        rating: 4.6, price: '₹300-650/day',
        image: 'https://images.unsplash.com/photo-1525160354320-545e39edee96?w=800',
        contact: '+91 90030 98765', location: 'Karunanidhi St, Govindasalai',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9300,79.8200',
        openHours: '8:00 AM - 10:00 PM',
        description: 'Known for well-maintained scooters and friendly service.'
    },
    {
        id: 'r7', category: 'rentals', subCategory: 'Bike', name: 'PY Two Wheeler Rent',
        rating: 4.8, price: '₹350-700/day',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        contact: '+91 98423 11223', location: 'Near Pondicherry Bus Stand (Market St)',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9400,79.8060',
        openHours: 'Open 24 hours',
        description: 'Very closer to main bus stand. Convenient for travelers arriving by bus.'
    },
    {
        id: 'r8', category: 'rentals', subCategory: 'Bike', name: 'Rishi Bike rentals',
        rating: 4.9, price: '₹300-600/day',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
        contact: '+91 77082 23700', location: 'Market St, Nellithope',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9350,79.8250',
        openHours: 'Open 24 hours',
        description: 'Top rated. Excellent customer service and quick process.'
    },
    {
        id: 'r9', category: 'rentals', subCategory: 'Scooty', name: 'Sowmmya Bike Rent',
        rating: 4.7, price: '₹350-650/day',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        contact: '+91 96290 55444', location: 'Thennanjalai Rd (Subaiya Nagar)',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9280,79.8220',
        openHours: '7:00 AM - 10:00 PM',
        description: 'Good variety of scooters available at reasonable rates.'
    },
    {
        id: 'r10', category: 'rentals', subCategory: 'Bike', name: 'Arunachalam Bike Rent',
        rating: 4.8, price: '₹350-800/day',
        image: 'https://images.unsplash.com/photo-1599819177477-0c1c63a8f5e1?w=800',
        contact: '+91 73392 55722', location: 'Pavazha Nagar',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9320,79.8150',
        openHours: 'Open 24 hours',
        description: 'Reliable service with transparent pricing.'
    },
    {
        id: 'r11', category: 'rentals', subCategory: 'Bike', name: 'Golden Bikes Rental',
        rating: 4.9, price: '₹400-800/day',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        contact: '+91 90924 44222', location: 'Opposite Le Royal Park Hotel',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9360,79.8310',
        openHours: 'Open 24 hours',
        description: 'Premium bikes available. Located opposite Le Royal Park.'
    },
    {
        id: 'r12', category: 'rentals', subCategory: 'Bike', name: 'Sai two wheeler rent',
        rating: 4.6, price: '₹300-600/day',
        image: 'https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?w=800',
        contact: '+91 97890 23456', location: 'Mission St, Heritage Town',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9333,79.8320',
        openHours: '8:00 AM - 9:00 PM',
        description: 'Heritage town location. Easy pick up and drop.'
    },
    {
        id: 'r13', category: 'rentals', subCategory: 'Bike', name: 'DIVAKAR BIKE RENT',
        rating: 5.0, price: '₹300-550/day',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
        contact: '+91 99528 96808', location: 'Near New Bus Stand',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9410,79.8090',
        openHours: 'Open 24 hours',
        description: 'Highly rated. Best for travelers arriving at new bus stand.'
    },
    {
        id: 'r14', category: 'rentals', subCategory: 'Bike', name: 'Shri Vaasan Bike Rental',
        rating: 4.7, price: '₹350-700/day',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        contact: '+91 98941 67890', location: 'Kamaraj Salai, Naveena Garden',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9380,79.8280',
        openHours: '7:00 AM - 10:00 PM',
        description: 'Good condition vehicles and friendly staff.'
    },
    {
        id: 'r15', category: 'rentals', subCategory: 'Bike', name: 'Anthuvan Bike Rental',
        rating: 4.8, price: '₹300-650/day',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        contact: '+91 81223 45678', location: 'Milad St, MG Road area',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9350,79.8300',
        openHours: '8:00 AM - 9:00 PM',
        description: 'Central location. Hassle-free rental process.'
    },

    // 🚗 Car Self-Drive Rental
    {
        id: 'rc1', category: 'rentals', subCategory: 'Car', name: 'RIDE EASY CARS',
        rating: 4.8, price: '₹2000-4000/day',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        contact: '+91 63802 22267', location: 'Police Quarters Lane, Venkata Nagar',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9380,79.8280',
        openHours: 'Open 24 hours',
        description: 'Self Drive Car Rental. Verified cars. Easy documentation.'
    },
    {
        id: 'rc2', category: 'rentals', subCategory: 'Car', name: 'My Trip Cars',
        rating: 4.7, price: '₹1800-3500/day',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800',
        contact: '+91 78712 02798', location: 'Govindasalai',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9370,79.8250',
        openHours: '8:00 AM - 10:00 PM',
        description: 'Self Drive Car Rental. Hatchbacks and Sedans available.'
    },
    {
        id: 'rc3', category: 'rentals', subCategory: 'Car', name: 'PondyCar',
        rating: 4.5, price: '₹2000-4500/day',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800',
        contact: '+91 99445 67890', location: 'Near New Bus Stand',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9420,79.8080',
        openHours: 'Open 24 hours',
        description: 'Wide range of self-drive cars near bus stand.'
    },
    {
        id: 'rc4', category: 'rentals', subCategory: 'Car', name: 'SAN CARS',
        rating: 4.6, price: '₹2200-4000/day',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
        contact: '+91 88701 23456', location: 'Ilango Nagar',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9450,79.8100',
        openHours: '7:00 AM - 11:00 PM',
        description: 'Self Drive Car Rental. Clean and well-maintained cars.'
    },
    {
        id: 'rc5', category: 'rentals', subCategory: 'Car', name: 'RISHI CARS',
        rating: 4.8, price: '₹2500-5000/day',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        contact: '+91 77082 23700', location: 'MG Road Area',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9350,79.8300',
        openHours: 'Open 24 hours',
        description: 'Top rated car rental. SUVs and luxury cars also available.'
    },
    {
        id: 'rc6', category: 'rentals', subCategory: 'Car', name: 'City Car Rental PY',
        rating: 4.5, price: '₹2000-3500/day',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800',
        contact: '+91 90031 54321', location: 'Oulgaret Area',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9430,79.8050',
        openHours: '8:00 AM - 9:00 PM',
        description: 'Affordable self-drive cars in Oulgaret area.'
    },
    {
        id: 'rc7', category: 'rentals', subCategory: 'Car', name: 'OVA CARS',
        rating: 4.7, price: '₹2000-4000/day',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800',
        contact: '+91 96002 98765', location: 'Near Jipmer Campus',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9560,79.7990',
        openHours: 'Open 24 hours',
        description: 'Convenient for JIPMER visitors. Reliable service.'
    },
    {
        id: 'rc8', category: 'rentals', subCategory: 'Car', name: 'Alex Self driving cars',
        rating: 4.6, price: '₹1800-3800/day',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
        contact: '+91 98405 67890', location: 'Nellithope',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9350,79.8250',
        openHours: '7:30 AM - 10:00 PM',
        description: 'Budget friendly car rental in Nellithope.'
    },
    {
        id: 'rc9', category: 'rentals', subCategory: 'Car', name: 'PY01 self drive car',
        rating: 4.8, price: '₹2500-4500/day',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        contact: '+91 99441 23456', location: 'White Town',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9390,79.8361',
        openHours: 'Open 24 hours',
        description: 'Located in White Town. Premium cars for self drive.'
    },
    {
        id: 'rc10', category: 'rentals', subCategory: 'Car', name: 'ASH Self Drive Cars',
        rating: 4.7, price: '₹2200-4000/day',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800',
        contact: '+91 88705 67890', location: 'Lawspet',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9500,79.8100',
        openHours: '8:00 AM - 9:00 PM',
        description: 'Reliable car rental service in Lawspet area.'
    },
    {
        id: 'rc11', category: 'rentals', subCategory: 'Car', name: 'AKN CARS',
        rating: 4.6, price: '₹2000-3800/day',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800',
        contact: '+91 96006 54321', location: 'Lawspet',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9510,79.8120',
        openHours: '7:00 AM - 10:00 PM',
        description: 'Self Drive Car Rental. Good options in Lawspet.'
    },
    {
        id: 'rc12', category: 'rentals', subCategory: 'Car', name: 'AUTO CARS',
        rating: 4.8, price: '₹2500-4500/day',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
        contact: '+91 98408 12345', location: 'White Town',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9390,79.8361',
        openHours: 'Open 24 hours',
        description: 'Premium self drive cars in White Town area.'
    },
    // 🚲 Cycle Rental
    {
        id: 'cy1', category: 'rentals', subCategory: 'Cycle', name: 'Heritage Cycles',
        rating: 4.5, price: '₹80/hour',
        image: 'https://images.unsplash.com/photo-1485965120184-e224f7a1dbfe?w=800',
        contact: '+91 98765 43217', location: 'White Town Promenade',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9360,79.8350',
        openHours: '6:00 AM - 7:00 PM',
        description: 'Perfect for White Town exploration. ₹400/day. Easy rides along beach.'
    },
    {
        id: 'cy2', category: 'rentals', subCategory: 'Cycle', name: 'Beach Cruiser Hub',
        rating: 4.4, price: '₹60/hour',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800',
        contact: '+91 98765 43218', location: 'Rock Beach',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=11.9360,79.8350',
        openHours: '6:00 AM - 8:00 PM',
        description: 'Comfortable cruisers. ₹300/day. Great for promenade rides.'
    },
    {
        id: 'cy3', category: 'rentals', subCategory: 'Cycle', name: 'Auroville Eco Cycles',
        rating: 4.6, price: '₹100/hour',
        image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800',
        contact: '+91 98765 43219', location: 'Auroville Visitors Center',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=12.0070,79.8100',
        openHours: '9:00 AM - 5:00 PM',
        description: 'Eco-friendly bikes. ₹500/day. Well-maintained cycles for Auroville.'
    },


    // --- CABS (Types) ---
    {
        id: 'c1', category: 'cabs', type: 'service', name: 'Auto Rickshaw',
        description: 'Classic three-wheeler for short trips',
        baseRate: '₹30', perKm: '₹15/km', availability: '24/7',
        bookingMethod: 'Hail on street or call',
        bookingUrls: [
            { name: 'NammaOoruTaxi', url: 'https://nammaoorutaxi.com/' },
            { name: 'Rapido', url: 'https://www.rapido.bike/Home' }
        ],
        tips: 'Negotiate fare before starting.',
        image: '🛺'
    },
    {
        id: 'c2', category: 'cabs', type: 'service', name: 'Bike Taxi',
        description: 'Quick two-wheeler rides',
        baseRate: '₹20', perKm: '₹10/km', availability: '6 AM - 11 PM',
        bookingMethod: 'Rapido app or local stands',
        bookingUrls: [
            { name: 'Rapido', url: 'https://www.rapido.bike/Home' }
        ],
        tips: 'Helmets provided.',
        image: '🏍️'
    },
    {
        id: 'c3', category: 'cabs', type: 'service', name: 'City Taxi / Cab',
        description: 'Comfortable car rides',
        baseRate: '₹100', perKm: '₹18/km', availability: '24/7',
        bookingMethod: 'Call local operators',
        bookingUrls: [
            { name: 'HurryUpCabs', url: 'https://hurryupcabs.com/city/pondicherry' },
            { name: 'Rapido', url: 'https://www.rapido.bike/Home' }
        ],
        tips: 'AC cabs available.',
        image: '🚕'
    },
    // --- CABS (Operators) ---
    { id: 'co1', category: 'cabs', type: 'operator', name: 'Pondy Cabs', contact: '+91 9876543210', specialty: 'Airport transfers' },
    { id: 'co2', category: 'cabs', type: 'operator', name: 'French Town Autos', contact: '+91 9876543211', specialty: 'City tours' },
    { id: 'co3', category: 'cabs', type: 'operator', name: 'Auroville Taxi Service', contact: '+91 9876543212', specialty: 'Auroville trips' },

    // --- LOCAL TOWN BUSES (PRTC / TNSTC) ---
    {
        id: 'b1', category: 'bus', subCategory: 'local', name: 'New Bus Stand - Gorimedu',
        from: 'New Bus Stand', to: 'Gorimedu', via: ['Indira Gandhi Square', 'Reddiarpalayam'],
        frequency: '15 mins', duration: '25 mins',
        price: '₹10 - ₹15', availability: '5:00 AM - 10:30 PM', type: 'PRTC'
    },
    {
        id: 'b2', category: 'bus', subCategory: 'local', name: 'New Bus Stand - Lawspet',
        from: 'New Bus Stand', to: 'Lawspet', via: ['100ft Road'],
        frequency: '12 mins', duration: '20 mins',
        price: '₹8 - ₹12', availability: '5:30 AM - 10:00 PM', type: 'PRTC'
    },
    {
        id: 'b3', category: 'bus', subCategory: 'local', name: 'New Bus Stand - Muthialpet',
        from: 'New Bus Stand', to: 'Muthialpet', via: ['Anna Salai'],
        frequency: '18 mins', duration: '22 mins',
        price: '₹10 - ₹15', availability: '6:00 AM - 9:30 PM', type: 'PRTC'
    },
    {
        id: 'b4', category: 'bus', subCategory: 'local', name: 'New Bus Stand - Ariankuppam',
        from: 'New Bus Stand', to: 'Ariankuppam', via: ['Anna Salai', 'Chunnambar'],
        frequency: '20 mins', duration: '30 mins',
        price: '₹12 - ₹18', availability: '6:00 AM - 9:00 PM', type: 'PRTC'
    },
    {
        id: 'b5', category: 'bus', subCategory: 'local', name: 'New Bus Stand - Villianur',
        from: 'New Bus Stand', to: 'Villianur', via: ['Ozhukarai'],
        frequency: '20 mins', duration: '25 mins',
        price: '₹10 - ₹15', availability: '5:30 AM - 10:00 PM', type: 'TNSTC'
    },
    {
        id: 'b6', category: 'bus', subCategory: 'local', name: 'New Bus Stand - Bahour',
        from: 'New Bus Stand', to: 'Bahour', via: ['Villianur', 'Katterikuppam'],
        frequency: '25 mins', duration: '35 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 8:30 PM', type: 'TNSTC'
    },
    {
        id: 'b7', category: 'bus', subCategory: 'local', name: 'Old Bus Stand - White Town Loop',
        from: 'Old Bus Stand', to: 'White Town', via: ['Beach Road', 'Rue Dumas', 'Mission St'],
        frequency: '15 mins', duration: '20 mins',
        price: '₹8 - ₹12', availability: '6:00 AM - 10:00 PM', type: 'PRTC'
    },
    {
        id: 'b8', category: 'bus', subCategory: 'local', name: 'Muthialpet - Railway Station',
        from: 'Muthialpet', to: 'Railway Station', via: ['Gandhi Beach', 'Botanical Garden'],
        frequency: '20 mins', duration: '18 mins',
        price: '₹10 - ₹15', availability: '6:00 AM - 10:00 PM', type: 'PRTC'
    },
    {
        id: 'b9', category: 'bus', subCategory: 'local', name: 'Lawspet - Airport',
        from: 'Lawspet', to: 'Airport', via: ['Airport Road'],
        frequency: '25 mins', duration: '15 mins',
        price: '₹8 - ₹12', availability: '6:00 AM - 9:00 PM', type: 'PRTC'
    },
    {
        id: 'b10', category: 'bus', subCategory: 'local', name: 'Ariankuppam - Chinna Veerampattinam',
        from: 'Ariankuppam', to: 'Chinna Veerampattinam', via: ['ECR'],
        frequency: '30 mins', duration: '20 mins',
        price: '₹10 - ₹15', availability: '7:00 AM - 8:00 PM', type: 'TNSTC'
    },

    // --- ELECTRIC BUSES (PRTC E-Fleet) ---
    {
        id: 'e1', category: 'bus', subCategory: 'local', name: '1E - Gorimedu/Mettupalayam',
        from: 'Gorimedu', to: 'Mettupalayam', via: ['Town Center'],
        frequency: '20 mins', duration: '18 mins',
        price: '₹10 - ₹15', availability: '6:00 AM - 9:30 PM', type: 'PRTC Electric'
    },
    {
        id: 'e2', category: 'bus', subCategory: 'local', name: '2E - Railway Station/Gorimedu',
        from: 'Railway Station', to: 'Gorimedu', via: ['New Bus Stand'],
        frequency: '15 mins', duration: '20 mins',
        price: '₹10 - ₹12', availability: '6:00 AM - 10:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e3a', category: 'bus', subCategory: 'local', name: '3EA - Pathukannu/Gorimedu',
        from: 'Pathukannu', to: 'Gorimedu', via: ['Main Road'],
        frequency: '20 mins', duration: '25 mins',
        price: '₹12 - ₹15', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e3b', category: 'bus', subCategory: 'local', name: '3EB - Pathukannu/Gorimedu',
        from: 'Pathukannu', to: 'Gorimedu', via: ['Alternate Route'],
        frequency: '25 mins', duration: '25 mins',
        price: '₹12 - ₹15', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e7', category: 'bus', subCategory: 'local', name: '7E - Navarkulam/Nonankuppam',
        from: 'Navarkulam', to: 'Nonankuppam', via: ['Coastal Road'],
        frequency: '25 mins', duration: '22 mins',
        price: '₹10 - ₹15', availability: '6:30 AM - 8:30 PM', type: 'PRTC Electric'
    },
    {
        id: 'e8', category: 'bus', subCategory: 'local', name: '8E - Chinna Veerampattinam/Kurunji Nagar',
        from: 'Chinna Veerampattinam', to: 'Kurunji Nagar', via: ['ECR'],
        frequency: '30 mins', duration: '25 mins',
        price: '₹12 - ₹18', availability: '6:00 AM - 8:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e9', category: 'bus', subCategory: 'local', name: '9E - Chinna Veerampattinam/Gorimedu MGPGI',
        from: 'Chinna Veerampattinam', to: 'Gorimedu MGPGI', via: ['Town'],
        frequency: '20 mins', duration: '30 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e10a', category: 'bus', subCategory: 'local', name: '10EA - JIPMER-Auroville-Kottakuppam',
        from: 'JIPMER', to: 'Kottakuppam', via: ['Auroville', 'Pondicherry University'],
        frequency: '25 mins', duration: '35 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e10b', category: 'bus', subCategory: 'local', name: '10EB - JIPMER-Auroville-Kottakuppam',
        from: 'JIPMER', to: 'Kottakuppam', via: ['Auroville'],
        frequency: '30 mins', duration: '35 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e11a', category: 'bus', subCategory: 'local', name: '11EA - Villianur/Mettupalayam',
        from: 'Villianur', to: 'Mettupalayam', via: ['Town Center'],
        frequency: '20 mins', duration: '25 mins',
        price: '₹12 - ₹15', availability: '5:30 AM - 10:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e11b', category: 'bus', subCategory: 'local', name: '11EB - Villianur/Mettupalayam',
        from: 'Villianur', to: 'Mettupalayam', via: ['Alternate'],
        frequency: '25 mins', duration: '25 mins',
        price: '₹12 - ₹15', availability: '5:30 AM - 10:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e12a', category: 'bus', subCategory: 'local', name: '12EA - Veerampattinam/Gorimedu',
        from: 'Veerampattinam', to: 'Gorimedu', via: ['Main Road'],
        frequency: '20 mins', duration: '30 mins',
        price: '₹12 - ₹18', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e12b', category: 'bus', subCategory: 'local', name: '12EB - Veerampattinam/Gorimedu',
        from: 'Veerampattinam', to: 'Gorimedu', via: ['ECR'],
        frequency: '25 mins', duration: '30 mins',
        price: '₹12 - ₹18', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e13', category: 'bus', subCategory: 'local', name: '13E - Thavalakuppam/Lawspet',
        from: 'Thavalakuppam', to: 'Lawspet', via: ['Government Colleges'],
        frequency: '20 mins', duration: '25 mins',
        price: '₹12 - ₹15', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e17a', category: 'bus', subCategory: 'local', name: '17EA - Nallavadu/Gorimedu-Veerampattinam',
        from: 'Nallavadu', to: 'Gorimedu', via: ['Veerampattinam'],
        frequency: '25 mins', duration: '35 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 8:30 PM', type: 'PRTC Electric'
    },
    {
        id: 'e17b', category: 'bus', subCategory: 'local', name: '17EB - Nallavadu/Gorimedu-Veerampattinam',
        from: 'Nallavadu', to: 'Gorimedu', via: ['Veerampattinam Alt'],
        frequency: '30 mins', duration: '35 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 8:30 PM', type: 'PRTC Electric'
    },
    {
        id: 'e18', category: 'bus', subCategory: 'local', name: '18E - PIMS/Karikalampakkam/Gorimedu',
        from: 'PIMS', to: 'Gorimedu', via: ['Karikalampakkam'],
        frequency: '25 mins', duration: '30 mins',
        price: '₹15 - ₹20', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e19', category: 'bus', subCategory: 'local', name: '19E - Pudhukuppam/PIMS',
        from: 'Pudhukuppam', to: 'PIMS', via: ['Medical College Route'],
        frequency: '20 mins', duration: '25 mins',
        price: '₹12 - ₹15', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },
    {
        id: 'e20', category: 'bus', subCategory: 'local', name: '20E - Pudhukuppam/Panithittu/PIMS',
        from: 'Pudhukuppam', to: 'PIMS', via: ['Panithittu'],
        frequency: '25 mins', duration: '28 mins',
        price: '₹12 - ₹18', availability: '6:00 AM - 9:00 PM', type: 'PRTC Electric'
    },

    // --- INTERSTATE BUSES ---
    {
        id: 'b11', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Chennai',
        from: 'Puducherry Bus Stand', to: 'Chennai CMBT', via: ['Tindivanam', 'Chengalpattu', 'Tambaram'],
        frequency: '10-20/day', duration: '3.5 hrs',
        price: '₹180 - ₹350', availability: '5:00 AM - 11:00 PM', type: 'TNSTC / SETC / Private'
    },
    {
        id: 'b12', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Villupuram',
        from: 'Puducherry Bus Stand', to: 'Villupuram', via: ['Ariyur', 'Kandamangalam'],
        frequency: 'Very Frequent (5-10/day)', duration: '1 hr',
        price: '₹45', availability: '24 Hours', type: 'TNSTC'
    },
    {
        id: 'b13', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Cuddalore',
        from: 'Puducherry Bus Stand', to: 'Cuddalore', via: ['Mudaliarpet'],
        frequency: 'Frequent (5-10/day)', duration: '1.5 hrs',
        price: '₹50 - ₹80', availability: '6:00 AM - 9:00 PM', type: 'TNSTC'
    },
    {
        id: 'b14', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Tindivanam',
        from: 'Puducherry Bus Stand', to: 'Tindivanam', via: ['Ozhukarai'],
        frequency: 'Frequent', duration: '45 mins',
        price: '₹35 - ₹60', availability: '5:00 AM - 10:00 PM', type: 'TNSTC'
    },
    {
        id: 'b15', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Bangalore',
        from: 'Puducherry Bus Stand', to: 'Bangalore Majestic', via: ['Tindivanam', 'Tiruvannamalai', 'Hosur'],
        frequency: 'Multiple (2-6/day)', duration: '7 hrs',
        price: '₹450 - ₹800', availability: 'Evening / Night', type: 'Private / TNSTC'
    },
    {
        id: 'b16', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Tiruvannamalai',
        from: 'Puducherry Bus Stand', to: 'Tiruvannamalai', via: ['Gingee'],
        frequency: 'Daily', duration: '3 hrs',
        price: '₹120 - ₹200', availability: '6:00 AM - 8:00 PM', type: 'TNSTC'
    },
    {
        id: 'b17', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Trichy',
        from: 'Puducherry Bus Stand', to: 'Trichy', via: ['Villupuram', 'Ariyalur'],
        frequency: 'Daily (2-6/day)', duration: '5 hrs',
        price: '₹200 - ₹400', availability: '6:00 AM - 10:00 PM', type: 'Private / TNSTC'
    },
    {
        id: 'b18', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Salem',
        from: 'Puducherry Bus Stand', to: 'Salem', via: ['Villupuram', 'Kallakurichi'],
        frequency: 'Occasional', duration: '5 hrs',
        price: '₹250 - ₹450', availability: 'Limited', type: 'Private / TNSTC'
    },
    {
        id: 'b19', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Coimbatore',
        from: 'Puducherry Bus Stand', to: 'Coimbatore', via: ['Villupuram', 'Salem', 'Erode'],
        frequency: 'Occasional', duration: '8 hrs',
        price: '₹400 - ₹700', availability: 'Limited', type: 'Private'
    },
    {
        id: 'b20', category: 'bus', subCategory: 'interstate', name: 'Puducherry - Chennai (Volvo / AC)',
        from: 'Puducherry Bus Stand', to: 'Chennai CMBT', via: ['Tindivanam', 'Chengalpattu'],
        frequency: 'Several/day', duration: '3 hrs',
        price: '₹300 - ₹500', availability: '5:00 AM - 11:00 PM', type: 'Private Volvo'
    },


    // --- TRAIN ---
    // DAILY / FREQUENT SERVICES
    {
        id: 't1', category: 'train', type: 'route', name: 'Chennai Egmore - Puducherry Express', number: '16115',
        from: 'Chennai Egmore', to: 'Puducherry', departure: '06:10 PM', arrival: '10:15 PM',
        duration: '4h 05m', frequency: 'Daily', classes: ['2S', 'SL'], subCategory: 'Express',
        price: '₹60 - ₹150', availability: 'Daily'
    },
    {
        id: 't2', category: 'train', type: 'route', name: 'Puducherry - Chennai Egmore Express', number: '16116',
        from: 'Puducherry', to: 'Chennai Egmore', departure: '06:05 AM', arrival: '09:45 AM',
        duration: '3h 40m', frequency: 'Daily', classes: ['2S', 'CC', 'SL'], subCategory: 'Express',
        price: '₹120 - ₹600', availability: 'Daily'
    },
    {
        id: 't3', category: 'train', type: 'route', name: 'Chennai - Puducherry MEMU', number: '66851',
        from: 'Chennai Egmore', to: 'Puducherry', departure: '04:30 PM', arrival: '08:15 PM',
        duration: '3h 45m', frequency: 'Daily', classes: ['2S'], subCategory: 'Passenger',
        price: '₹50 - ₹120', availability: 'Daily'
    },
    {
        id: 't4', category: 'train', type: 'route', name: 'Puducherry - Chennai MEMU', number: '66852',
        from: 'Puducherry', to: 'Chennai Egmore', departure: '05:30 AM', arrival: '09:15 AM',
        duration: '3h 45m', frequency: 'Daily', classes: ['2S'], subCategory: 'Passenger',
        price: '₹50 - ₹120', availability: 'Daily'
    },

    // WEEKLY / LONG-DISTANCE SERVICES
    {
        id: 't5', category: 'train', type: 'route', name: 'Puducherry - Mangaluru Central Weekly Express', number: '16855',
        from: 'Puducherry', to: 'Mangaluru Central', departure: '04:45 PM', arrival: 'Next day Evening',
        duration: '18-20h', frequency: 'Weekly', classes: ['SL', '3A', '2A'], subCategory: 'Express',
        price: '₹350 - ₹1500', availability: 'Weekly'
    },
    {
        id: 't6', category: 'train', type: 'route', name: 'Puducherry - Bhubaneswar Superfast Express', number: '18419',
        from: 'Puducherry', to: 'Bhubaneswar', departure: '11:00 PM', arrival: 'Day 3 06:00 AM',
        duration: '31h', frequency: 'Weekly (Wednesday)', classes: ['2A', '3A', 'SL'], subCategory: 'Express',
        price: '₹1200 - ₹4000', availability: 'Wednesday Only'
    },
    {
        id: 't7', category: 'train', type: 'route', name: 'Howrah - Puducherry Superfast Express', number: '12867',
        from: 'Howrah Junction', to: 'Puducherry', departure: '04:55 PM', arrival: 'Next day Afternoon',
        duration: '30-32h', frequency: 'Weekly', classes: ['3E', '3A', '2A'], subCategory: 'Express',
        price: '₹1900 - ₹3200', availability: 'Weekly'
    },
    {
        id: 't8', category: 'train', type: 'route', name: 'Yesvantpur - Puducherry Express', number: '16573',
        from: 'Yesvantpur Junction', to: 'Puducherry', departure: '07:15 AM', arrival: 'Next day Morning',
        duration: '17-19h', frequency: 'Weekly', classes: ['SL', '3A', '2A'], subCategory: 'Express',
        price: '₹500 - ₹2100', availability: 'Weekly'
    },
    {
        id: 't9', category: 'train', type: 'route', name: 'Puducherry - Kanniyakumari Express', number: '16861',
        from: 'Puducherry', to: 'Kanniyakumari', departure: '01:10 PM', arrival: 'Next day Morning',
        duration: '16-18h', frequency: 'Weekly', classes: ['SL', '3A', '2A'], subCategory: 'Express',
        price: '₹500 - ₹2000', availability: 'Weekly'
    },
    {
        id: 't10', category: 'train', type: 'route', name: 'Kakinada Port - Puducherry Express', number: '17655',
        from: 'Kakinada Port', to: 'Puducherry', departure: '01:30 PM', arrival: 'Next day Evening',
        duration: '24-27h', frequency: 'Weekly', classes: ['SL', '3A', '2A'], subCategory: 'Express',
        price: '₹650 - ₹2700', availability: 'Weekly'
    },
    {
        id: 't11', category: 'train', type: 'route', name: 'Puducherry - New Delhi Express', number: '12651',
        from: 'Puducherry', to: 'New Delhi', departure: '04:00 PM', arrival: 'Day 3 09:00 AM',
        duration: '41h', frequency: 'Weekly (Saturday)', classes: ['2A', '3A', 'SL'], subCategory: 'Express',
        price: '₹1800 - ₹5500', availability: 'Saturday Only'
    },
    {
        id: 't12', category: 'train', type: 'route', name: 'Villupuram - Puducherry Passenger', number: '76851',
        from: 'Villupuram Junction', to: 'Puducherry', departure: '07:30 AM', arrival: '08:30 AM',
        duration: '1h', frequency: 'Daily', classes: ['2S'], subCategory: 'Passenger',
        price: '₹30', availability: 'Daily'
    },

    {
        id: 'ts1', category: 'train', type: 'station', name: 'Puducherry Railway Station',
        code: 'PDY', address: 'Railway Station Road, near Botanical Garden', facilities: ['Waiting Room', 'Ticket Counter', 'Parking', 'Tea Stall']
    }
];

export async function seedTransitData(): Promise<void> {
    try {
        const transitRef = collection(db, 'transit');
        // Always seed to ensure updates
        console.log('Seeding transit data...');

        // Chunk logic for batch limits (though SEED_DATA is small, robust code handles >500)
        const CHUNK_SIZE = 450;
        for (let i = 0; i < SEED_DATA.length; i += CHUNK_SIZE) {
            const chunk = SEED_DATA.slice(i, i + CHUNK_SIZE);
            const batch = writeBatch(db);

            chunk.forEach((item) => {
                const docRef = doc(transitRef, item.id);
                batch.set(docRef, item);
            });

            await batch.commit();
            console.log(`Seeded batch ${i / CHUNK_SIZE + 1}`);
        }

        console.log('Transit data seeded successfully!');
    } catch (error) {
        console.error('Error seeding transit data:', error);
        throw error;
    }
}
