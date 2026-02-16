'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Landmark, Church, TreePine, UtensilsCrossed, Building2 } from 'lucide-react';
import Image from 'next/image';

const FAMOUS_PLACES = {
    historical: [
        { name: 'French War Memorial', location: 'Goubert Avenue', image: 'https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=800' },
        { name: 'Aayi Mandapam', location: 'White Town', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800' },
        { name: 'Bharathi Park', location: 'White Town', image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b0?w=800' },
        { name: 'Arikamedu Archaeological Site', location: 'Arikamedu', image: 'https://images.unsplash.com/photo-1518012312832-96aea3c91144?w=800' },
        { name: 'Kargil War Memorial', location: 'Shanmugha Vilasam', image: 'https://images.unsplash.com/photo-1552751072-4ac0c9c2b5c4?w=800' },
        { name: 'Raj Niwas', location: 'White Town', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
    ],
    temples: [
        { name: 'Manakula Vinayagar Temple', location: 'White Town', image: 'https://images.unsplash.com/photo-1582443168850-6e1ea092647b?w=800' },
        { name: 'Varadaraja Perumal Temple', location: 'Near French Consulate', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800' },
        { name: 'Kamakshi Amman Temple', location: 'Near Beach', image: 'https://images.unsplash.com/photo-1609682448995-3e4cb7e5e4f8?w=800' },
        { name: 'Vedapureeswarar Temple', location: 'Near Serenity Beach', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800' },
        { name: 'Arulmigu Kanniga Parameswari Temple', location: 'Kuruchikuppam', image: 'https://images.unsplash.com/photo-1580533319007-5d61615dc6f7?w=800' },
    ],
    nature: [
        { name: 'Paradise Beach', location: 'Chunnambar', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' },
        { name: 'Auroville Beach', location: 'Auroville', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
        { name: 'Serenity Beach', location: 'Auroville Road', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800' },
        { name: 'Ousteri Lake & Wildlife Sanctuary', location: 'Ossudu', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800' },
        { name: 'Bharathi Park', location: 'White Town', image: 'https://images.unsplash.com/photo-1585581505402-85f3eebbddf8?w=800' },
        { name: 'Pichavaram Mangrove Forest', location: 'Near Chidambaram', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800' },
        { name: 'Botanical Garden', location: 'Near Railway Station', image: 'https://images.unsplash.com/photo-1585581505402-85f3eebbddf8?w=800' },
    ],
    churches: [
        { name: 'Basilica of the Sacred Heart of Jesus', location: 'Subbaiah Salai', image: 'https://images.unsplash.com/photo-1548625149-720367fa4c1c?w=800' },
        { name: 'The Sacred Heart Church', location: 'Near Beach', image: 'https://images.unsplash.com/photo-1478731674354-0c4464769e76?w=800' },
        { name: 'Immaculate Conception Cathedral', location: 'Mission Street', image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800' },
        { name: 'Eglise de Notre Dame des Anges', location: 'Rue Dumas', image: 'https://images.unsplash.com/photo-1578659568744-67b0b3759729?w=800' },
    ],
    popular: [
        { name: 'Promenade Beach', location: 'Beach Road', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' },
        { name: 'Rock Beach', location: 'Goubert Avenue', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
        { name: 'Aurobindo Ashram', location: 'Rue de la Marine', image: 'https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?w=800' },
        { name: 'Auroville Matrimandir', location: 'Auroville', image: 'https://images.unsplash.com/photo-1548625149-720367fa4c1c?w=800' },
        { name: 'Pondicherry Lighthouse', location: 'Promenade', image: 'https://images.unsplash.com/photo-1589829145333-6f6b7d4c1e81?w=800' },
        { name: 'Pondicherry Museum', location: 'Bharathi Park', image: 'https://images.unsplash.com/photo-1566127444510-a8dc77cda928?w=800' },
        { name: 'Chunnambar Boat House', location: 'Chunnambar', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800' },
        { name: 'Goubert Avenue', location: 'Beach Road', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' },
    ],
    food: [
        { name: 'Ratatouille', type: 'Vegetarian', restaurant: 'Various French Cafés' },
        { name: 'Crepes', type: 'Vegetarian', restaurant: 'Café des Arts' },
        { name: 'Masala Dosa', type: 'Vegetarian', restaurant: 'Surguru' },
        { name: 'Kadugu Yerra', type: 'Vegetarian', restaurant: 'Local Eateries' },
        { name: 'Idiyappam with Coconut Milk', type: 'Vegetarian', restaurant: 'Traditional Restaurants' },
        { name: 'Prawn Risotto', type: 'Non-Vegetarian', restaurant: 'Villa Shanti' },
        { name: 'Fish Vindaloo', type: 'Non-Vegetarian', restaurant: 'Coromandel Café' },
        { name: 'Chicken Chettinad', type: 'Non-Vegetarian', restaurant: 'Le Dupleix' },
        { name: 'Tandoori Prawns', type: 'Non-Vegetarian', restaurant: 'Various Restaurants' },
        { name: 'Mutton Curry', type: 'Non-Vegetarian', restaurant: 'Local Restaurants' },
    ],
    restaurants: [
        { name: 'Café des Arts', cuisine: 'French', location: 'White Town', rating: 4.5 },
        { name: 'Le Dupleix', cuisine: 'Continental', location: 'White Town', rating: 4.7 },
        { name: 'Villa Shanti', cuisine: 'Multi-cuisine', location: 'Suffren Street', rating: 4.6 },
        { name: 'Surguru', cuisine: 'South Indian', location: 'Mission Street', rating: 4.3 },
        { name: 'Coromandel Café', cuisine: 'Seafood', location: 'Rue Suffren', rating: 4.4 },
    ],
};

const CATEGORIES = [
    { id: 'historical', label: 'Historical Sites', icon: Landmark, count: FAMOUS_PLACES.historical.length },
    { id: 'temples', label: 'Temples', icon: Building2, count: FAMOUS_PLACES.temples.length },
    { id: 'nature', label: 'Nature & Wildlife', icon: TreePine, count: FAMOUS_PLACES.nature.length },
    { id: 'churches', label: 'Churches', icon: Church, count: FAMOUS_PLACES.churches.length },
    { id: 'popular', label: 'Popular Places', icon: MapPin, count: FAMOUS_PLACES.popular.length },
    { id: 'food', label: 'Famous Food', icon: UtensilsCrossed, count: FAMOUS_PLACES.food.length },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed, count: FAMOUS_PLACES.restaurants.length },
];

export default function FamousPlacesPage() {
    const [activeCategory, setActiveCategory] = useState('historical');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8 lg:py-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-12 space-y-4"
                >
                    <Badge variant="secondary" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                        <MapPin className="w-4 h-4 mr-2 inline-block" />
                        Tourist Guide
                    </Badge>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Famous Places in <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">Puducherry</span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Discover the best tourist attractions, historical sites, and culinary delights
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
                    {/* Centered Category Navigation */}
                    {/* Sticky Category Navigation */}
                    <div className="sticky top-20 z-30 px-4 pb-4 bg-gradient-to-b from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950 pt-2">
                        <TabsList className="h-auto bg-transparent dark:bg-transparent border-0 shadow-none p-0 w-full flex flex-wrap justify-center gap-2 sm:gap-3">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <TabsTrigger
                                        key={cat.id}
                                        value={cat.id}
                                        className="rounded-full px-4 py-2 sm:px-5 sm:py-2.5 font-bold text-sm transition-all duration-300 flex items-center gap-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm
                                            data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 
                                            data-[state=active]:text-white data-[state=active]:border-transparent
                                            data-[state=active]:shadow-md data-[state=active]:scale-105
                                            text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{cat.label}</span>
                                        <span className="ml-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-extrabold px-1
                                            group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white text-slate-500">
                                            {cat.count}
                                        </span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    {/* Places Grid */}
                    {Object.keys(FAMOUS_PLACES).filter(key => key !== 'food' && key !== 'restaurants').map(category => (
                        <TabsContent key={category} value={category} className="mt-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {(FAMOUS_PLACES[category as keyof typeof FAMOUS_PLACES] as { name: string; location: string; image: string }[]).map((place, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                                    >
                                        {place.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={place.image}
                                                    alt={place.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>
                                        )}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{place.name}</h3>
                                            {place.location && (
                                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {place.location}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>
                    ))}

                    {/* Food List */}
                    <TabsContent value="food" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Vegetarian */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                    <UtensilsCrossed className="w-6 h-6" />
                                    Vegetarian
                                </h3>
                                {FAMOUS_PLACES.food.filter(f => f.type === 'Vegetarian').map((food, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{food.name}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{food.restaurant}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Non-Vegetarian */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                                    <UtensilsCrossed className="w-6 h-6" />
                                    Non-Vegetarian
                                </h3>
                                {FAMOUS_PLACES.food.filter(f => f.type === 'Non-Vegetarian').map((food, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{food.name}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{food.restaurant}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Restaurants */}
                    <TabsContent value="restaurants" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {FAMOUS_PLACES.restaurants.map((restaurant, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{restaurant.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{restaurant.cuisine}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {restaurant.location}
                                        </p>
                                        <Badge className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200">
                                            ⭐ {restaurant.rating}
                                        </Badge>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
