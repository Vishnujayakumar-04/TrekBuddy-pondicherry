'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bike, Car, Bus, Train, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { seedTransitData } from '@/services/transitService';

const TRANSIT_CATEGORIES = [
    {
        id: 'rentals',
        name: 'Vehicle Rentals',
        description: 'Self-drive bikes, cars & cycles',
        icon: Bike,
        color: 'text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        types: ['Bike', 'Scooty', 'Car', 'Cycle']
    },
    {
        id: 'cabs',
        name: 'Cabs & Autos',
        description: 'On-demand local transport',
        icon: Car,
        color: 'text-cyan-500',
        bg: 'bg-cyan-50 dark:bg-cyan-900/20',
        types: ['Auto Rickshaw', 'City Taxi', 'Bike Taxi']
    },
    {
        id: 'bus',
        name: 'Bus Services',
        description: 'PRTC & Inter-state routes',
        icon: Bus,
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        types: ['Local Town Bus', 'Inter-city (Chennai/Bangalore)']
    },
    {
        id: 'train',
        name: 'Train',
        description: 'Railway schedules & status',
        icon: Train,
        color: 'text-purple-600',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        types: ['Express', 'Passenger']
    }
];

export default function TransitPage() {
    useEffect(() => {
        // Ensure data exists in Firestore for first-time users
        seedTransitData().catch(error => {
            console.error("Failed to seed transit data:", error);
        });
    }, []);

    return (
        <div className="min-h-screen pb-12">
            <DashboardHeader
                title="Getting Around"
                subtitle="Whether you want to rent a scooter like a local, catch a town bus, or book a cab – find all transport info right here."
                showHome={true}
            />

            <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-8">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1 text-sm border-cyan-500/30 bg-cyan-500/10 text-cyan-600 backdrop-blur-sm">
                        <Sparkles className="w-3 h-3 mr-2 inline-block" />
                        Namma Pondy Transit
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TRANSIT_CATEGORIES.map((category) => (
                        <Link href={`/dashboard/transit/${category.id}`} key={category.id} className="block h-full group">
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="h-full"
                            >
                                <Card className="h-full border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden relative bg-white dark:bg-slate-900">
                                    {/* Background decorative blob */}
                                    <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${category.bg.replace('50', '400')}`} />

                                    <CardContent className="p-8 flex flex-col h-full relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={cn("p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-sm", category.bg, category.color)}>
                                                <category.icon className="w-8 h-8" />
                                            </div>
                                            <div className="p-2 rounded-full text-slate-300 group-hover:text-cyan-500 transition-colors">
                                                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-8 flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                                                {category.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {category.types.map((type) => (
                                                <span
                                                    key={type}
                                                    className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
