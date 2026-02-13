'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Loader2, Route, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { getTransitItems } from '@/services/transitService';
import { TransitItem } from '@/utils/seedTransitData';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04 }
    }
};

const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: 'spring' as const, bounce: 0.2 } }
};

export default function BusPage({ embedded = false }: { embedded?: boolean }) {
    const [buses, setBuses] = useState<TransitItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadData() {
            setLoading(true);
            try {
                const data = await getTransitItems('bus');
                if (mounted) {
                    setBuses(data);
                    setError(null);
                }
            } catch (err: unknown) {
                if (mounted) {
                    setError((err instanceof Error) ? err.message : String(err));
                    console.error("Failed to load bus schedules:", err);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            mounted = false;
        };
    }, []);

    const localBuses = buses.filter(b => b.subCategory === 'local');
    const interBuses = buses.filter(b => b.subCategory === 'interstate');

    const renderBusList = (routeBuses: TransitItem[]) => (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm backdrop-blur-sm"
        >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800/50 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden md:grid">
                <div className="col-span-1">Route</div>
                <div className="col-span-5">Journey</div>
                <div className="col-span-3">Via</div>
                <div className="col-span-3 text-right">Frequency</div>
            </div>
            <div className="divide-y divide-slate-100/80 dark:divide-slate-800/80">
                {routeBuses.map((bus) => (
                    <motion.div
                        key={bus.id}
                        variants={rowVariants}
                        whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.02)' }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-5 items-center group cursor-default transition-all duration-300"
                    >
                        {/* Route No */}
                        <div className="col-span-1 flex items-center gap-3 md:block">
                            <span className="md:hidden text-[10px] text-slate-400 font-bold uppercase tracking-widest">Route</span>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center font-bold text-sm text-blue-700 dark:text-blue-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                                {bus.id.length > 3 ? bus.id.substring(0, 3) : bus.id}
                            </div>
                        </div>

                        {/* Journey */}
                        <div className="col-span-11 md:col-span-5 flex flex-col justify-center">
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                                <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg">{bus.from}</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
                                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                                    <div className="w-8 h-[2px] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                                </div>
                                <span className="bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg">{bus.to}</span>
                            </div>
                            <span className="text-xs text-slate-500 mt-1.5 pl-1">{bus.name}</span>
                        </div>

                        {/* Via */}
                        <div className="col-span-11 md:col-span-3 md:flex items-center pl-11 md:pl-0">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50/80 dark:bg-slate-800/40 rounded-lg px-3 py-1.5 w-fit">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span className="truncate max-w-[180px]">{bus.via?.join(' → ') || 'Direct'}</span>
                            </div>
                        </div>

                        {/* Frequency */}
                        <div className="col-span-11 md:col-span-3 md:text-right flex md:block items-center justify-between pl-11 md:pl-0">
                            <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100/50 dark:border-blue-800/30 text-xs font-semibold text-blue-700 dark:text-blue-400 group-hover:shadow-md transition-shadow duration-300">
                                <Clock className="w-3 h-3 mr-1.5" />
                                {bus.frequency}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className={embedded ? "space-y-8" : "container mx-auto py-8 px-4 max-w-5xl space-y-8"}>
            {!embedded && (
                <DashboardHeader
                    title="Bus Schedule"
                    subtitle="Live status & timetables for Town Buses & Inter-city routes"
                    backHref="/dashboard/transit"
                    backLabel="Transit Hub"
                />
            )}

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-8 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" />
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Schedules</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Bus Routes & Timetables
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
                        Town buses & inter-city routes connecting Puducherry to major cities.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    <Route className="w-3.5 h-3.5 text-blue-500" />
                    <span>{buses.length} routes found</span>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                            <Loader2 className="w-7 h-7 text-blue-600 dark:text-blue-400 animate-spin" />
                        </div>
                        <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl animate-pulse" />
                    </div>
                    <p className="text-slate-500 font-medium">Loading bus schedules...</p>
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200/50 dark:border-red-800/30"
                >
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                    <p className="text-red-600 dark:text-red-400 font-medium">Error: {error}</p>
                    <p className="text-red-400 text-sm mt-2">Please try refreshing the page.</p>
                </motion.div>
            ) : (
                <Tabs defaultValue="local" className="w-full">
                    <TabsList className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 p-1.5 mb-8 h-auto rounded-xl shadow-lg shadow-slate-900/5 w-full md:w-auto inline-flex">
                        <TabsTrigger
                            value="local"
                            className="flex-1 md:flex-initial rounded-lg px-6 py-3 font-semibold text-sm transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-600/20 text-slate-500 dark:text-slate-400"
                        >
                            <span className="mr-2">🏘️</span>
                            Town Bus (Local)
                        </TabsTrigger>
                        <TabsTrigger
                            value="interstate"
                            className="flex-1 md:flex-initial rounded-lg px-6 py-3 font-semibold text-sm transition-all duration-300 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 text-slate-500 dark:text-slate-400"
                        >
                            <span className="mr-2">🏙️</span>
                            Inter-city (Outstation)
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="local" className="space-y-4">
                        {localBuses.length > 0 ? (
                            renderBusList(localBuses)
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <div className="text-4xl mb-4">🚌</div>
                                <p className="text-slate-500 font-medium text-lg">No local buses found</p>
                                <p className="text-slate-400 text-sm mt-2">Check back soon for updates</p>
                            </motion.div>
                        )}
                    </TabsContent>

                    <TabsContent value="interstate" className="space-y-4">
                        {interBuses.length > 0 ? (
                            renderBusList(interBuses)
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <div className="text-4xl mb-4">🚍</div>
                                <p className="text-slate-500 font-medium text-lg">No inter-city buses found</p>
                                <p className="text-slate-400 text-sm mt-2">Check back soon for updates</p>
                            </motion.div>
                        )}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
