'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MapPin, Star, Clock, Ticket, Navigation, Phone, Share2, Heart
} from 'lucide-react';
import { toast } from 'sonner';

const PLACE_DATA = {
    id: '1',
    name: 'Paradise Beach',
    category: 'Beaches',
    rating: 4.8,
    reviews: 1240,
    location: 'Chunnambar, Pondicherry',
    description: 'A pristine stretch of golden sand accessible only by boat, offering crystal-clear waters and peaceful seclusion away from the crowds. Perfect for swimming, sunbathing, and enjoying nature\'s beauty.',
    longDescription: `Experience the unique charm of Paradise Beach, one of Pondicherry's most beloved destinations. Whether you're seeking tranquility, adventure, or cultural immersion, this spot offers an unforgettable experience for every type of traveler.

    The ferry ride to the beach is an experience in itself, cutting through the green backwaters with thick mangrove forests. The sand is extremely soft and the water is clean and shallow.`,
    image: 'https://images.unsplash.com/photo-1543362906-ac1b4526c1d0?q=80&w=1200&auto=format&fit=crop',
    timings: '9:00 AM – 6:00 PM',
    entryFee: '₹200 (Ferry)',
    phone: '+91 98765 43210'
};


interface PageProps {
    params: Promise<{ id: string }>;
}

export default function PlaceDetailPage({ params }: PageProps) {
    const { id } = use(params);
    // In a real app, fetch data based on ID
    return <PlaceDetailView id={id} place={PLACE_DATA} />;
}

function PlaceDetailView({ id, place }: { id: string, place: typeof PLACE_DATA }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? 'Removed from favorites' : 'Saved to favorites');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20">
            {/* 1. HERO SECTION */}
            <div className="relative h-[400px] w-full bg-slate-900 group overflow-hidden">
                <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 max-w-3xl"
                    >
                        <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-cyan-500/20">
                            {place.category}
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-wide drop-shadow-lg">
                            {place.name}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-white/90 font-medium">
                            <div className="flex items-center gap-1 text-orange-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="text-white text-lg">{place.rating}</span>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <div className="flex items-center gap-1">
                                <MapPin className="w-5 h-5 text-white/80" />
                                <span>{place.location}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 2. MAIN LAYOUT (2 Columns) */}
            <div className="container mx-auto px-4 md:px-6 max-w-7xl -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: About & Similar */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">About This Place</h2>
                            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                <p>{place.description}</p>
                                <p className="text-base opacity-80">{place.longDescription}</p>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 sticky top-24">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Visit Information</h3>

                            <div className="space-y-6 mb-8">
                                {/* Timings */}
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Timings</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{place.timings}</p>
                                    </div>
                                </div>

                                {/* Entry Fee */}
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                                        <Ticket className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Entry Fee</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{place.entryFee}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0 text-violet-600 dark:text-violet-400">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{place.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]">
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Get Directions
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
