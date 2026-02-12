'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Map,
  Search,
  MessageCircle,
  Bus,
  Umbrella,
  Camera,
  Hotel,
  Utensils,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Featured categories matching mobile app, updated icons/colors
  const categories = [
    { id: 'beaches', name: 'Beaches', icon: Umbrella, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'temples', name: 'Temples', icon: '🛕', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'hotels', name: 'Hotels', icon: Hotel, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'restaurants', name: 'Restaurants', icon: Utensils, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'places', name: 'Places', icon: Camera, color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { id: 'education', name: 'Education', icon: '🎓', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Puducherry Coastline"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
        </div>

        <div className="relative z-10 container flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-100 text-sm font-semibold tracking-wide shadow-2xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              The Official Travel Companion
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-lg leading-[1.05]">
              Discover the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200 pb-2">
                French Riviera
              </span> of the East
            </h1>

            <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md text-balance opacity-90">
              Your intelligent guide to Puducherry&apos;s golden beaches, colonial heritage, and spiritual sanctuaries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto mt-12"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full opacity-40 blur-lg group-hover:opacity-75 transition duration-700 animate-tilt"></div>

              <div className="relative flex items-center p-2 bg-white/95 backdrop-blur-2xl rounded-full shadow-2xl ring-1 ring-white/50 transition-all focus-within:ring-4 focus-within:ring-cyan-500/20 focus-within:scale-[1.02]">
                <div className="pl-5 text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <Input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="flex-1 border-none bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-14 px-4 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link href={searchQuery ? `/dashboard/search?q=${searchQuery}` : '/dashboard/categories'}>
                  <Button size="lg" className="rounded-full px-8 bg-slate-900 hover:bg-black text-white font-bold shadow-lg h-14 tracking-wide text-base transition-all hover:scale-105 active:scale-95">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300/80"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300/0 via-slate-300/50 to-slate-300/0"></div>
        </motion.div>
      </section>

      {/* Quick Actions - Floating Cards */}
      <section className="container -mt-24 md:-mt-32 relative z-20 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Link href="/dashboard/planner" className="group h-full">
            <Card className="h-full border-none shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />

              <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                <div className="p-5 bg-cyan-50 dark:bg-cyan-950/30 rounded-2xl text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-cyan-100 dark:ring-cyan-900/50">
                  <Map className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Trip Planner</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Create your perfect custom itinerary in seconds with drag-and-drop ease.</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/chat" className="group h-full">
            <Card className="h-full border-none shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl hover:-translate-y-2 hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/30">New</span>
              </div>
              <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                <div className="p-5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ring-1 ring-purple-100 dark:ring-purple-900/50">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">AI Guide</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Chat with our smart assistant for instant tips, history, and food recommendations.</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/transit/bus" className="group h-full">
            <Card className="h-full border-none shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl hover:-translate-y-2 hover:shadow-teal-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
              <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl text-teal-600 dark:text-teal-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ring-1 ring-teal-100 dark:ring-teal-900/50">
                  <Bus className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Transit</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Find local bus routes, bike rentals, and auto fares easily.</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-600 dark:bg-cyan-400"></span> Curated Collections
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Interest</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                Whether you&apos;re looking for spiritual peace, adventure, or culinary delights, we&apos;ve organized the best spots for you.
              </p>
            </div>
            <Link href="/dashboard/categories">
              <Button variant="outline" className="group rounded-full px-8 h-12 border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-all shadow-sm">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((cat) => (
              <Link key={cat.id} href={`/dashboard/categories/${cat.id}`}>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card className="h-full border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 bg-white dark:bg-slate-900 group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${cat.bg}`} />

                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full gap-5 relative z-10">
                      <div className={`p-4 rounded-2xl ${cat.bg} ${cat.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        {typeof cat.icon === 'string' ? <span className="text-2xl">{cat.icon}</span> : <cat.icon className="w-6 h-6" />}
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {cat.name}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
