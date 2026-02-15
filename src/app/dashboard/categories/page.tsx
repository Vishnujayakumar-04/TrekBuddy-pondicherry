'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Umbrella, TreePine, MapPin,
    Utensils, ShoppingBag, Bus,
    ArrowRight, Search, Sparkles, Compass
} from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
    beaches: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=80',
    heritage: 'https://images.unsplash.com/photo-1582255655519-7b3b6f0430f8?w=800&auto=format&fit=crop&q=80',
    temples: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Manakula_Vinayagar_Temple_Pondicherry.jpg/800px-Manakula_Vinayagar_Temple_Pondicherry.jpg',
    churches: 'https://images.unsplash.com/photo-1548625361-987747e70e3c?w=800&auto=format&fit=crop&q=80',
    mosques: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800&auto=format&fit=crop&q=80',
    spiritual: 'https://images.unsplash.com/photo-1623835606828-09553e77c8e3?w=800&auto=format&fit=crop&q=80',
    restaurants: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    nature: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
    adventure: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    shopping: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    hotels: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    transport: 'https://images.unsplash.com/photo-1518134253900-5034c5147854?w=800&auto=format&fit=crop&q=80',
};

const HERO_IMAGE = 'https://images.unsplash.com/photo-1621517720977-ce9d53da3657?w=1600&auto=format&fit=crop&q=80';

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const categories = [
        { id: 'beaches', name: 'Beaches', icon: Umbrella, desc: 'Sun-kissed shores & sunrise walks', emoji: '🏖️', count: '8 spots' },
        { id: 'heritage', name: 'Heritage', icon: '🏰', desc: 'French Quarter & colonial charm', emoji: '🏛️', count: '12 spots' },
        { id: 'spiritual', name: 'Temples & Spiritual', icon: '🛕', desc: 'Hindu temples, churches, mosques & ashrams', emoji: '🕉️', count: '17 places' },
        { id: 'hotels', name: 'Hotels & Stays', icon: '🏨', desc: 'Boutique hotels, resorts & PG accommodations', emoji: '🏨', count: '15 places' },
        { id: 'restaurants', name: 'Food & Dining', icon: Utensils, desc: 'Cafes, French cuisine & street food', emoji: '🍽️', count: '15 spots' },
        { id: 'nature', name: 'Nature', icon: TreePine, desc: 'Mangroves, lakes & botanical gardens', emoji: '🌿', count: '5 spots' },
        { id: 'adventure', name: 'Adventure', icon: MapPin, desc: 'Scuba, surfing & kayaking', emoji: '🏄', count: '7 spots' },
        { id: 'shopping', name: 'Shopping', icon: ShoppingBag, desc: 'Boutiques, handicrafts & markets', emoji: '🛍️', count: '9 spots' },
        { id: 'transport', name: 'Local Transit', icon: Bus, desc: 'Bikes, buses, autos & trains', emoji: '🚲', count: '20+ options' },
    ];

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen pb-20 relative">
            {/* Immersive Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden -mt-16">
                <Image
                    src={HERO_IMAGE}
                    alt="Puducherry"
                    fill
                    className="object-cover scale-105"
                    priority
                    unoptimized
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-50 dark:to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-transparent" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 md:px-6 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="space-y-4"
                    >
                        <Badge className="bg-white/15 backdrop-blur-xl text-white border-white/20 px-4 py-1.5 text-sm font-semibold rounded-full">
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                            Puducherry Travel Guide
                        </Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
                            Discover<br />
                            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                Puducherry
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-lg font-medium leading-relaxed">
                            Curated experiences across beaches, heritage, cuisine & more.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-12 -mt-4 relative z-10">
                {/* Search Bar — Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xl"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-900/5 overflow-hidden">
                            <Search className="h-5 w-5 text-slate-400 ml-5 shrink-0" />
                            <Input
                                type="text"
                                placeholder="Search beaches, food, adventure..."
                                className="border-0 h-14 text-base pl-3 pr-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-slate-400 hover:text-slate-600 pr-5 text-sm font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Section Label */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                            Browse by Experience
                        </h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
                </div>

                {/* Category Grid — Australia.com style immersive cards */}
                {filteredCategories.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    >
                        {filteredCategories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.06 }}
                            >
                                <Link
                                    href={cat.id === 'transport' ? '/dashboard/transit' : `/dashboard/categories/${cat.id}`}
                                    className="group block h-full"
                                    onMouseEnter={() => setHoveredCard(cat.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer">
                                        {/* Background Image */}
                                        <Image
                                            src={CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.beaches}
                                            alt={cat.name}
                                            fill
                                            className={`object-cover transition-transform duration-700 ease-out ${hoveredCard === cat.id ? 'scale-110' : 'scale-100'}`}
                                            unoptimized
                                        />

                                        {/* Dark gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-300" />

                                        {/* Hover shine effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === cat.id ? 'opacity-100' : 'opacity-0'}`} />

                                        {/* Top badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="text-2xl">{cat.emoji}</span>
                                        </div>
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-white/15 backdrop-blur-xl text-white border-white/10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                                {cat.count}
                                            </Badge>
                                        </div>

                                        {/* Bottom content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                                                {cat.name}
                                            </h3>
                                            <p className="text-white/70 text-sm font-medium leading-relaxed mb-3">
                                                {cat.desc}
                                            </p>

                                            {/* Explore button that slides in on hover */}
                                            <div className={`flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-all duration-300 ${hoveredCard === cat.id ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
                                                <span>Explore</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-slate-500 text-lg font-medium">No matches found for "{searchQuery}"</p>
                        <Button
                            variant="link"
                            onClick={() => setSearchQuery('')}
                            className="text-cyan-600 font-semibold mt-2"
                        >
                            Clear filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
