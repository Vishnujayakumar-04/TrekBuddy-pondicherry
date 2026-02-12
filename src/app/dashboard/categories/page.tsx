'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Umbrella, AlertTriangle, TreePine, Moon, MapPin,
    Utensils, Hotel, ShoppingBag, Clapperboard, Bus,
    ArrowRight, Search
} from 'lucide-react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'beaches', name: 'Beaches', icon: Umbrella, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Sun, sand, and sea' },
        { id: 'temples', name: 'Temples', icon: '🛕', color: 'text-orange-500', bg: 'bg-orange-500/10', desc: 'Spiritual heritage' },
        { id: 'churches', name: 'Churches', icon: '⛪', color: 'text-blue-600', bg: 'bg-blue-600/10', desc: 'French architecture' },
        { id: 'museums', name: 'Museums', icon: '🏛️', color: 'text-amber-700', bg: 'bg-amber-700/10', desc: 'History & Culture' },
        { id: 'parks', name: 'Parks & Gardens', icon: TreePine, color: 'text-green-500', bg: 'bg-green-500/10', desc: 'Nature & Relaxation' },
        { id: 'heritage', name: 'Heritage Sites', icon: '🏰', color: 'text-yellow-600', bg: 'bg-yellow-600/10', desc: 'Colonial buildings' },
        { id: 'restaurants', name: 'Restaurants', icon: Utensils, color: 'text-red-500', bg: 'bg-red-500/10', desc: 'Local & French cuisine' },
        { id: 'hotels', name: 'Hotels', icon: Hotel, color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'Comfortable stays' },
        { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-500/10', desc: 'Souvenirs & more' },
        { id: 'nightlife', name: 'Nightlife', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-500/10', desc: 'Pubs & Bars' },
        { id: 'adventure', name: 'Adventure', icon: MapPin, color: 'text-orange-600', bg: 'bg-orange-600/10', desc: 'Be active' },
        { id: 'theatres', name: 'Theatres', icon: Clapperboard, color: 'text-red-600', bg: 'bg-red-600/10', desc: 'Movies & Entertainment' },
        { id: 'transport', name: 'Transport', icon: Bus, color: 'text-blue-400', bg: 'bg-blue-400/10', desc: 'Getting around' },
        { id: 'emergency', name: 'Emergency', icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-700/10', desc: 'Important contacts' },
    ];

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen pb-12">
            <DashboardHeader
                title="Explore Categories"
                subtitle="Discover Puducherry your way. Select a category to find the best spots curated just for you."
                showHome={true}
            />

            <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-8">
                {/* Search Bar */}
                <div className="relative max-w-md mx-auto md:mx-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search categories..."
                        className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-full shadow-sm focus-visible:ring-cyan-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {filteredCategories.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {filteredCategories.map((cat) => (
                            <motion.div key={cat.id} variants={item} className="h-full">
                                <Link href={`/dashboard/categories/${cat.id}`} className="block h-full group">
                                    <div className="h-full">
                                        <Card className="h-full border-slate-100 dark:border-slate-800 shadow-sm card-hover relative overflow-hidden bg-white dark:bg-slate-900 ring-1 ring-slate-200/50 dark:ring-slate-800">
                                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${cat.bg.replace('/10', '/40')}`} />

                                            <CardContent className="flex flex-col items-start justify-between min-h-[180px] p-6 relative z-10">
                                                <div className={`p-3.5 rounded-2xl ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform duration-300 mb-6 ring-1 ring-inset ring-black/5`}>
                                                    {typeof cat.icon === 'string' ? <span className="text-2xl">{cat.icon}</span> : <cat.icon className="w-7 h-7" />}
                                                </div>

                                                <div className="space-y-3 w-full">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                                                            {cat.name}
                                                        </h3>
                                                        <ArrowRight className={`w-5 h-5 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ${cat.color}`} />
                                                    </div>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                        {cat.desc}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No categories found matching &quot;{searchQuery}&quot;</p>
                        <Button
                            variant="link"
                            onClick={() => setSearchQuery('')}
                            className="text-cyan-600 mt-2"
                        >
                            Clear search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
