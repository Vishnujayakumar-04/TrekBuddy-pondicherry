'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';

const GALLERY_ITEMS = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1582510003544-5243789972d0?q=80&w=800&fit=crop', // Temple
        alt: 'Manakula Vinayagar Temple',
        className: 'md:col-span-1 md:row-span-2',
        location: 'White Town'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1596367402913-647c16705d15?q=80&w=800&fit=crop', // Colorful Street
        alt: 'French Quarter Streets',
        className: 'md:col-span-1 md:row-span-1',
        location: 'Rue Romain Rolland'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1587474260584-136574528615?q=80&w=800&fit=crop', // French Building
        alt: 'Colonial Architecture',
        className: 'md:col-span-1 md:row-span-1',
        location: 'French Colony'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1543362906-ac1b4526c1d0?q=80&w=1200&fit=crop', // Beach (Wide)
        alt: 'Paradise Beach Sunrise',
        className: 'md:col-span-2 md:row-span-1',
        location: 'Paradise Beach'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1615821556860-29c87d853b0e?q=80&w=800&fit=crop', // Auroville
        alt: 'Matrimandir',
        className: 'md:col-span-1 md:row-span-2',
        location: 'Auroville'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&fit=crop', // Cafe
        alt: 'Cafe des Arts',
        className: 'md:col-span-1 md:row-span-1',
        location: 'Heritage Town'
    },
];

export function GallerySection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full">
                            Photo Gallery
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display"
                    >
                        Glimpses of <span className="font-serif italic text-violet-500">Paradise</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto"
                    >
                        Immerse yourself in the beauty of Pondicherry through our curated collection of stunning photographs.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {GALLERY_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${item.className}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-white">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 text-white/80">
                                    <Camera className="w-3 h-3" />
                                    {item.location}
                                </div>
                                <h3 className="font-bold text-lg">{item.alt}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
