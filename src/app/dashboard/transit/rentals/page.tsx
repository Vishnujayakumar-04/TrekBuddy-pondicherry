'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Loader2, Star, ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { getTransitItems } from '@/services/transitService';
import { TransitItem } from '@/utils/seedTransitData';

const VEHICLE_CATEGORIES = [
    { id: 'All', label: 'All Vehicles', emoji: '🔥' },
    { id: 'Bike', label: 'Bikes', emoji: '🏍️' },
    { id: 'Scooty', label: 'Scooters', emoji: '🛵' },
    { id: 'Car', label: 'Cars', emoji: '🚗' },
    { id: 'Cycle', label: 'Cycles', emoji: '🚲' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, bounce: 0.3 } }
};

export default function RentalsPage({ embedded = false }: { embedded?: boolean }) {
    const [providers, setProviders] = useState<TransitItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = await getTransitItems('rentals');
                setProviders(data);
                setError(null);
            } catch (err: unknown) {
                console.error("Failed to load rentals:", err);
                setError("Failed to load rentals. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredProviders = filter === 'All'
        ? providers
        : providers.filter(p => p.subCategory === filter);

    return (
        <div className={embedded ? "space-y-8" : "container mx-auto py-8 px-4 max-w-6xl space-y-8"}>
            {!embedded && (
                <DashboardHeader
                    title="Vehicle Rentals"
                    subtitle="Self-drive bikes, scooters & cars"
                    backHref="/dashboard/transit"
                    backLabel="Transit"
                />
            )}

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-8 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Self Drive</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Explore at Your Own Pace
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
                        Rent a vehicle and discover Puducherry's hidden gems on your schedule.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Filter className="w-4 h-4" />
                    <span>{filteredProviders.length} options available</span>
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {VEHICLE_CATEGORIES.map((type) => (
                    <motion.button
                        key={type.id}
                        onClick={() => setFilter(type.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2
                            ${filter === type.id
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/15'
                                : 'bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
                            }`}
                    >
                        <span className="text-base">{type.emoji}</span>
                        {type.label}
                    </motion.button>
                ))}
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                            <Loader2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 animate-spin" />
                        </div>
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl animate-pulse" />
                    </div>
                    <p className="text-slate-500 font-medium">Loading rentals...</p>
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200/50 dark:border-red-800/30"
                >
                    <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                </motion.div>
            ) : filteredProviders.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {filteredProviders.map((provider) => (
                        <motion.div
                            key={provider.id}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-emerald-300/60 dark:hover:border-emerald-700/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-400 backdrop-blur-sm"
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* Image Section */}
                                <div className="w-full sm:w-44 h-44 sm:h-auto relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shrink-0">
                                    {provider.image ? (
                                        <Image
                                            src={provider.image}
                                            alt={provider.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-4xl">
                                            {provider.subCategory === 'Bike' ? '🏍️' : provider.subCategory === 'Scooty' ? '🛵' : provider.subCategory === 'Car' ? '🚗' : '🚲'}
                                        </div>
                                    )}
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {/* Rating chip */}
                                    {typeof provider.rating === 'number' && (
                                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-lg">
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            {provider.rating}
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                                {provider.name}
                                            </h3>
                                            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1.5 gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                                                    <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <span>{provider.location}</span>
                                            </div>
                                        </div>
                                        <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-0 font-medium rounded-lg px-3 py-1 text-xs">
                                            {provider.subCategory}
                                        </Badge>
                                    </div>

                                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                                        <div>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold block">Starting at</span>
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xl tracking-tight">
                                                {provider.price}
                                            </span>
                                        </div>
                                        {provider.contact ? (
                                            <Button
                                                size="sm"
                                                className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold px-4"
                                                asChild
                                            >
                                                <a href={`tel:${provider.contact}`}>
                                                    <Phone className="w-3.5 h-3.5 mr-2" />
                                                    Call
                                                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" />
                                                </a>
                                            </Button>
                                        ) : (
                                            <Button size="sm" disabled className="rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold px-4">
                                                <Phone className="w-3.5 h-3.5 mr-2" /> Unavailable
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800"
                >
                    <div className="text-4xl mb-4">🏍️</div>
                    <p className="text-slate-500 font-medium text-lg">
                        {providers.length === 0
                            ? "Transit data under preparation"
                            : `No rentals found for "${filter}"`
                        }
                    </p>
                    <p className="text-slate-400 text-sm mt-2">Check back soon for updates</p>
                </motion.div>
            )}
        </div>
    );
}
