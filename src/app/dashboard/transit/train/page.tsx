'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Train, Clock, MapPin, Calendar, ExternalLink, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { getTransitItems } from '@/services/transitService';
import { TransitItem } from '@/utils/seedTransitData';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, bounce: 0.3 } }
};

export default function TrainPage({ embedded = false }: { embedded?: boolean }) {
    const [transitData, setTransitData] = useState<TransitItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = await getTransitItems('train');
                setTransitData(data);
                setError(null);
            } catch (err: unknown) {
                console.error("Failed to load train schedules:", err);
                setError((err instanceof Error) ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const station = transitData.find(d => d.type === 'station');
    const routes = transitData.filter(d => d.type === 'route' && (d.subCategory === 'Express' || d.subCategory === 'Passenger'));

    return (
        <div className={embedded ? "space-y-10" : "container mx-auto py-8 px-4 max-w-5xl space-y-10"}>
            {!embedded && (
                <DashboardHeader
                    title="Train Services"
                    subtitle="Railway schedules from Puducherry"
                    backHref="/dashboard/transit"
                    backLabel="Transit"
                />
            )}

            {/* Section Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-1.5 w-8 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Railways</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Train Services & Schedules
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
                    Express & passenger trains connecting Puducherry to major Indian cities.
                </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 flex items-center justify-center">
                            <Loader2 className="w-7 h-7 text-purple-600 dark:text-purple-400 animate-spin" />
                        </div>
                        <div className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-xl animate-pulse" />
                    </div>
                    <p className="text-slate-500 font-medium">Loading train schedules...</p>
                </div>
            ) : error ? (
                <div className="text-center py-16 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200/50 dark:border-red-800/30 text-red-600 dark:text-red-400">{error}</div>
            ) : transitData.length > 0 ? (
                <>
                    {/* Station Info Card */}
                    {station && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative overflow-hidden rounded-2xl border border-purple-200/50 dark:border-purple-800/30"
                        >
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-violet-50/50 to-indigo-50 dark:from-purple-950/40 dark:via-violet-950/20 dark:to-indigo-950/30" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

                            <div className="relative p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                                            <Train className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{station.name}</h2>
                                            <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2 mt-2 text-sm">
                                                <MapPin className="w-4 h-4 text-purple-500" />
                                                {station.address}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {station.facilities?.map((f) => (
                                                    <Badge key={f} variant="secondary" className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 border-0 font-medium rounded-lg text-xs px-3 py-1.5 shadow-sm">
                                                        {f}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {station.code && (
                                        <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-purple-200/30 dark:border-purple-800/30 shadow-sm">
                                            <div className="text-center">
                                                <p className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">Station Code</p>
                                                <p className="text-3xl font-black text-purple-700 dark:text-purple-400 tracking-wide mt-1">{station.code}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Train Routes */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-6 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full" />
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Popular Routes</h2>
                            </div>
                            <Badge variant="secondary" className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium text-xs rounded-lg border-0">
                                {routes.length} trains
                            </Badge>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="space-y-4"
                        >
                            {routes.map((train) => (
                                <motion.div
                                    key={train.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                    className="group bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-purple-200/60 dark:hover:border-purple-800/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-400 backdrop-blur-sm"
                                >
                                    {/* Gradient top accent */}
                                    <div className={`h-1 ${train.subCategory === 'Express' ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-slate-300 to-slate-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center gap-6">
                                        <div className="flex-1 space-y-4">
                                            {/* Train name and badges */}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300">
                                                    <Train className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">{train.name}</h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <Badge variant="outline" className="text-[10px] font-mono tracking-wider border-slate-200 dark:border-slate-700">{train.number}</Badge>
                                                        <Badge className={`text-[10px] font-bold ${train.subCategory === 'Express' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-0'}`}>
                                                            {train.subCategory || 'Train'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Journey route */}
                                            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/40 dark:to-slate-800/20 p-3 rounded-xl w-fit">
                                                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg shadow-sm">{train.from}</span>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                                                    <div className="w-12 h-[2px] bg-gradient-to-r from-purple-400 to-violet-400 rounded-full" />
                                                    <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
                                                    <div className="w-12 h-[2px] bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full" />
                                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                                </div>
                                                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg shadow-sm">{train.to}</span>
                                            </div>
                                        </div>

                                        {/* Right info panel */}
                                        <div className="flex flex-col sm:flex-row gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800/60 pt-4 lg:pt-0 lg:pl-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2.5 bg-cyan-50 dark:bg-cyan-900/15 rounded-xl px-3.5 py-2.5 border border-cyan-100/50 dark:border-cyan-800/30">
                                                    <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center">
                                                        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{train.departure} – {train.arrival}</span>
                                                </div>
                                                <div className="flex items-center gap-2.5 bg-orange-50 dark:bg-orange-900/15 rounded-xl px-3.5 py-2.5 border border-orange-100/50 dark:border-orange-800/30">
                                                    <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                                                        <Calendar className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{train.frequency}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1.5 sm:max-w-[140px]">
                                                {train.classes?.map((c) => (
                                                    <Badge key={c} variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-0 font-medium rounded-lg px-2.5 py-1">
                                                        {c}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-slate-900 dark:to-purple-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800"
                >
                    <div className="text-4xl mb-4">🚆</div>
                    <p className="text-slate-500 font-medium text-lg">Transit data under preparation</p>
                    <p className="text-slate-400 text-sm mt-2">Check back soon for updates</p>
                </motion.div>
            )}

            {/* Book Tickets CTA */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="relative overflow-hidden rounded-2xl border border-cyan-200/50 dark:border-cyan-800/30"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-indigo-950/30" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />

                <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Book Train Tickets</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">Book online via IRCTC or visit the station counter</p>
                        </div>
                    </div>
                    <Button
                        asChild
                        className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 px-6 py-3 font-semibold"
                    >
                        <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            Visit IRCTC
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
