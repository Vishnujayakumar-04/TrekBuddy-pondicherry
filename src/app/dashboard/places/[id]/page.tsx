'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MapPin, Star, Clock, Ticket, Globe, Share2, Heart, Plus, Map as MapIcon, ArrowLeft, Camera, Navigation, ExternalLink
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const PLACE_DATA = {
    id: '1',
    name: 'Promenade Beach',
    category: 'Beaches',
    rating: 4.5,
    reviews: 1240,
    location: 'White Town, Puducherry',
    description: 'Promenade Beach is the popular stretch of beachfront in the city of Puducherry, India, along the Bay of Bengal.',
    longDescription: `The Promenade Beach is the pride of Puducherry and stretches for approximately 1.5 km. 
It is a wonderland for travelers and has some of the most magnificent landmarks like the War Memorial, statue of Joan of Arc and the heritage town hall. 

The beach is clean and well maintained, perfect for evening walks and watching the sunrise. Vehicle movement is banned on the beach road in the evening, making it safe for pedestrians.`,
    images: [
        '/images/promenade.jpg',
        '/images/promenade-2.jpg',
        '/images/promenade-3.jpg',
    ],
    timings: 'Open 24 hours',
    entryFee: 'Free',
    coordinates: { lat: 11.936, lng: 79.834 }
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function PlaceDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const place = PLACE_DATA;
    return <PlaceDetailView id={id} place={place} />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PlaceDetailView({ id, place }: { id: string, place: typeof PLACE_DATA }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? 'Removed from favorites' : 'Saved to favorites');
    };

    const addToTrip = () => {
        toast.success('Added to trip planner');
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Immersive Hero Image */}
            <div className="relative h-[45vh] min-h-[300px] md:h-[50vh] w-full overflow-hidden -mt-16">
                <Image
                    src={place.images[0]}
                    alt={place.name}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Multi-layer gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-50 dark:to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />

                {/* Top actions bar */}
                <div className="absolute top-20 left-0 right-0 px-4 md:px-8 z-20 flex justify-between items-center max-w-7xl mx-auto w-full">
                    <Button variant="secondary" size="sm" asChild className="rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xl border-white/10 shadow-lg px-5 font-semibold">
                        <Link href="/dashboard/categories">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            className={`rounded-full backdrop-blur-xl border-white/10 shadow-lg h-10 w-10 ${isFavorite ? 'bg-red-500/80 text-white hover:bg-red-600/90' : 'bg-white/15 text-white hover:bg-white/30'}`}
                            onClick={toggleFavorite}
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xl border-white/10 shadow-lg h-10 w-10"
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Gallery button */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary" size="sm" className="absolute bottom-20 right-4 md:right-8 z-20 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xl border-white/10 shadow-lg gap-2 font-semibold">
                            <Camera className="w-4 h-4" /> View Gallery
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden bg-black rounded-2xl">
                        <div className="w-full h-full flex items-center justify-center text-white">
                            Gallery Placeholder
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 w-full px-4 md:px-8 pb-16 z-20 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <Badge className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md font-bold shadow-lg rounded-lg px-3 py-1">
                                {place.category}
                            </Badge>
                            <Badge className="bg-amber-100/90 text-amber-800 backdrop-blur-md font-bold shadow-lg rounded-lg px-3 py-1">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                                {place.rating} · {place.reviews.toLocaleString()} reviews
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                            {place.name}
                        </h1>
                        <div className="flex items-center text-white/80 text-base font-medium">
                            <MapPin className="w-4 h-4 mr-2 text-cyan-300" />
                            {place.location}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container px-4 md:px-6 max-w-7xl mx-auto -mt-4 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info Chips */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-3"
                        >
                            {[
                                { icon: Clock, label: place.timings, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
                                { icon: Ticket, label: place.entryFee, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                            ].map(chip => (
                                <div key={chip.label} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${chip.bg} border border-slate-200/50 dark:border-slate-700/50 shadow-sm`}>
                                    <chip.icon className={`w-4 h-4 ${chip.color}`} />
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{chip.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* About Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-base">
                                {place.longDescription}
                            </p>
                        </motion.div>

                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm"
                        >
                            <div className="p-6 pb-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Location</h2>
                            </div>
                            <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-400 font-mono text-sm">
                                <div className="text-center">
                                    <Navigation className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
                                    <p>Map · {place.coordinates.lat}, {place.coordinates.lng}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <div className="sticky top-24 space-y-5">
                            {/* Action Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-xl shadow-slate-900/5 space-y-4"
                            >
                                <Button
                                    className="w-full gap-2 h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/15 transition-all hover:-translate-y-0.5"
                                    onClick={addToTrip}
                                >
                                    <Plus className="w-4 h-4" /> Add to Trip Plan
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        className={`w-full gap-2 rounded-xl h-11 font-semibold transition-all ${isFavorite ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/10 hover:bg-red-100' : ''}`}
                                        onClick={toggleFavorite}
                                    >
                                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                        {isFavorite ? 'Saved' : 'Save'}
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2 rounded-xl h-11 font-semibold">
                                        <Share2 className="w-4 h-4" /> Share
                                    </Button>
                                </div>
                                <Button variant="outline" className="w-full gap-2 rounded-xl h-11 font-semibold text-slate-600 dark:text-slate-400">
                                    <MapIcon className="w-4 h-4" /> Get Directions
                                </Button>
                            </motion.div>

                            {/* Visitor Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm"
                            >
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Visitor Info</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Clock, label: 'Timings', value: place.timings, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
                                        { icon: Ticket, label: 'Entry Fee', value: place.entryFee, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                                        { icon: Globe, label: 'Website', value: 'Official Website', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', isLink: true },
                                    ].map((item, i) => (
                                        <div key={item.label}>
                                            <div className="flex items-start gap-3">
                                                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                                                    <item.icon className={`w-4 h-4 ${item.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                                                    {item.isLink ? (
                                                        <a href="#" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                                                            {item.value} <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    ) : (
                                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.value}</p>
                                                    )}
                                                </div>
                                            </div>
                                            {i < 2 && <div className="h-px bg-slate-100 dark:bg-slate-800 mt-4" />}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
