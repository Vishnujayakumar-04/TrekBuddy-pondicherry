'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bike, Car, Bus, Train, MapPin, Navigation } from 'lucide-react';
import { seedTransitData } from '@/services/transitService';

// Import sub-page components
import RentalsPage from './rentals/page';
import CabsPage from './cabs/page';
import BusPage from './bus/page';
import TrainPage from './train/page';

const TAB_CONFIG = [
    { value: 'rentals', label: 'Vehicle Rentals', icon: Bike, gradient: 'from-emerald-500 to-teal-600', emoji: '🏍️' },
    { value: 'cabs', label: 'Auto & Cabs', icon: Car, gradient: 'from-amber-500 to-orange-600', emoji: '🚕' },
    { value: 'bus', label: 'Bus Services', icon: Bus, gradient: 'from-blue-500 to-indigo-600', emoji: '🚌' },
    { value: 'train', label: 'Train', icon: Train, gradient: 'from-purple-500 to-violet-600', emoji: '🚆' },
];

export default function TransitPage() {
    const [activeTab, setActiveTab] = useState('rentals');

    useEffect(() => {
        seedTransitData().catch(error => {
            console.error("Failed to seed transit data:", error);
        });
    }, []);

    const activeConfig = TAB_CONFIG.find(t => t.value === activeTab) || TAB_CONFIG[0];

    return (
        <div className="min-h-screen pb-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                {/* Floating orbs */}
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 right-1/4 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"
                />
            </div>

            <DashboardHeader
                title="Getting Around"
                subtitle="Finding your way around Puducherry is easy with our comprehensive transit guide."
                showBack={false}
                showHome={false}
            />

            <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-8">

                {/* Hero Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                    {[
                        { label: 'Rental Shops', value: '10+', icon: '🏪', color: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200/50 dark:border-emerald-800/30' },
                        { label: 'Cab Services', value: '5+', icon: '🚗', color: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/30' },
                        { label: 'Bus Routes', value: '20+', icon: '🗺️', color: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/30' },
                        { label: 'Train Lines', value: '6+', icon: '🛤️', color: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50 dark:border-purple-800/30' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            whileHover={{ y: -3, scale: 1.02 }}
                            className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-4 text-center cursor-default group transition-shadow duration-300 hover:shadow-lg`}
                        >
                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Decorative Badge - Centered */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <Badge variant="outline" className="px-5 py-2 text-sm font-semibold border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-700 dark:text-cyan-400 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-shadow">
                        <Sparkles className="w-3.5 h-3.5 mr-2 inline-block text-cyan-500 animate-pulse" />
                        Namma Pondy Transit
                    </Badge>
                </motion.div>

                {/* Main Navigation Tabs */}
                <Tabs defaultValue="rentals" value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">

                    {/* Centered Navigation Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center w-full sticky top-[80px] z-30 py-4 -mx-4 px-4 md:mx-0 md:px-0 md:static"
                    >
                        <div className="relative w-full md:w-auto">
                            {/* Glow behind tabs */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-60" />
                            <TabsList className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-2 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-900/5 inline-flex h-auto w-full md:w-auto overflow-x-auto justify-start md:justify-center no-scrollbar gap-1.5">
                                {TAB_CONFIG.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.value;
                                    return (
                                        <TabsTrigger
                                            key={tab.value}
                                            value={tab.value}
                                            className={`relative rounded-xl px-5 py-3.5 text-sm md:text-base font-semibold transition-all duration-400 flex items-center gap-2.5 min-w-fit
                                                ${isActive
                                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20'
                                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                                                }`}
                                        >
                                            <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>{tab.emoji}</span>
                                            <span>{tab.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTabIndicator"
                                                    className="absolute inset-0 bg-slate-900 dark:bg-white rounded-xl -z-10"
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                                />
                                            )}
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </div>
                    </motion.div>

                    {/* Content Areas with smooth transitions */}
                    <div className="min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                <TabsContent value="rentals" className="focus-visible:outline-none focus-visible:ring-0 mt-0">
                                    <RentalsPage embedded={true} />
                                </TabsContent>
                                <TabsContent value="cabs" className="focus-visible:outline-none focus-visible:ring-0 mt-0">
                                    <CabsPage embedded={true} />
                                </TabsContent>
                                <TabsContent value="bus" className="focus-visible:outline-none focus-visible:ring-0 mt-0">
                                    <BusPage embedded={true} />
                                </TabsContent>
                                <TabsContent value="train" className="focus-visible:outline-none focus-visible:ring-0 mt-0">
                                    <TrainPage embedded={true} />
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
