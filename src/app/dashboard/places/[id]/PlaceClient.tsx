
'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPlaceById, PLACES_DATA } from '@/services/data/places';
import { ArrowLeft, ArrowRight, MapPin, Clock, Calendar, Globe, Star, Wallet, Camera } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PlaceClientProps {
    id: string;
}

export default function PlaceClient({ id }: PlaceClientProps) {
    const place = getPlaceById(id);

    if (!place) {
        return notFound();
    }

    // Fallback gallery logic: if no gallery provided, use the main image repeated 4 times for effect
    // In a real scenario, this would be populated with 4-5 unique downloaded images
    const galleryImages = place.gallery && place.gallery.length > 0
        ? place.gallery
        : [place.image, place.image, place.image, place.image, place.image];

    // Ensure we have at least 5 items for a smooth marquee loop by duplicating if necessary
    const marqueeImages = galleryImages.length < 5
        ? [...galleryImages, ...galleryImages, ...galleryImages].slice(0, 10)
        : galleryImages;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* 1. Immersive Header / Marquee */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-slate-900">
                {/* Scrolling Background Marquee */}
                <div className="absolute inset-0 flex items-center overflow-hidden">
                    <motion.div
                        className="flex gap-0 min-w-full"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...marqueeImages, ...marqueeImages].map((img, idx) => (
                            <div key={idx} className="relative w-[60vh] md:w-[800px] h-[60vh] shrink-0">
                                <Image
                                    src={img}
                                    alt={`${place.name} scene ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={idx < 2}
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-slate-950/20" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <Button variant="secondary" size="sm" asChild className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10">
                        <Link href="/dashboard/categories">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
                        </Link>
                    </Button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 backdrop-blur-md px-3 py-1 text-sm font-bold uppercase tracking-wider">
                                {place.category.replace('_', ' ')}
                            </Badge>
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 backdrop-blur-md px-3 py-1 text-sm font-bold">
                                <Star className="w-3.5 h-3.5 mr-1 fill-amber-300" />
                                {place.rating} / 5.0
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                            {place.name}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-6 text-white/80 pt-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-cyan-400" />
                                <span className="text-lg font-medium">{place.location}</span>
                            </div>
                            {place.bestTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-cyan-400" />
                                    <span className="text-lg font-medium">Best Time: {place.bestTime}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container px-4 md:px-6 max-w-7xl mx-auto py-12 grid lg:grid-cols-3 gap-12">
                {/* 2. Main Description & Details */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Globe className="w-6 h-6 text-cyan-600" />
                            About this Place
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            {place.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {place.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Visitor Information</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Opening Hours</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{place.openTime || 'Open 24 Hours'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Entry Fee</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{place.entryFee || 'Free Entry'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Best Time to Visit</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{place.bestTime || 'Anytime'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                                    <Camera className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Photography</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Allowed</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 3. Sidebar / CTA */}
                <div className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-cyan-500/20">
                            <h3 className="text-2xl font-black mb-2">Want to visit here?</h3>
                            <p className="text-white/90 mb-6 text-sm">Add this spot to your personalized itinerary with our AI Trip Planner.</p>
                            <Button size="lg" className="w-full bg-white text-cyan-600 hover:bg-white/90 font-bold border-none">
                                Plan a Trip Here
                            </Button>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Location</h3>
                            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                                Map View Placeholder
                            </div>
                            <Button variant="outline" className="w-full mt-4 font-bold border-slate-200 dark:border-slate-700">
                                Get Directions <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
