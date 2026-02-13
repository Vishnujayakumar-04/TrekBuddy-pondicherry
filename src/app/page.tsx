'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Map, MessageCircle, Bus, ArrowRight, ArrowDown, Waves, Landmark, Utensils, Flower2, Umbrella,
  Sparkles, Star, Users, Compass, Globe, ChevronRight, Heart, Camera, Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/* ─────────── DATA ─────────── */
const FEATURES = [
  { title: 'AI Trip Planner', desc: 'Tell us your vibe — adventure, culture, or zen — and our AI builds your dream itinerary in seconds.', icon: Map, href: '/dashboard/planner', gradient: 'from-cyan-500 to-blue-600', accent: 'cyan' },
  { title: 'Smart AI Guide', desc: 'A personal travel concierge that answers anything about Puducherry — history, food, hidden gems.', icon: MessageCircle, href: '/dashboard/chat', gradient: 'from-violet-500 to-purple-600', accent: 'violet' },
  { title: 'Local Transit Hub', desc: 'Real-time bikes, autos, buses, and trains. Navigate like a local from day one.', icon: Bus, href: '/dashboard/transit', gradient: 'from-amber-500 to-orange-600', accent: 'amber' },
];

const CATEGORIES = [
  { id: 'beaches', title: 'Beaches', image: '/images/category-beach.jpg', icon: Waves, count: '5 Spots', color: 'from-cyan-400 to-blue-500' },
  { id: 'heritage', title: 'Heritage', image: '/images/category-heritage.jpg', icon: Landmark, count: '12 Sites', color: 'from-amber-400 to-orange-500' },
  { id: 'food', title: 'Food & Dining', image: '/images/category-food.jpg', icon: Utensils, count: '20+ Cafes', color: 'from-rose-400 to-pink-500' },
  { id: 'spiritual', title: 'Spiritual', image: '/images/category-spiritual.jpg', icon: Flower2, count: '4 Centers', color: 'from-violet-400 to-purple-500' },
  { id: 'nature', title: 'Nature', image: '/images/category-nature.jpg', icon: Umbrella, count: '8 Parks', color: 'from-emerald-400 to-teal-500' },
];

const STATS = [
  { label: 'Places to Explore', value: 50, suffix: '+' },
  { label: 'AI Itineraries', value: 1200, suffix: '+' },
  { label: 'Happy Travelers', value: 3400, suffix: '+' },
  { label: 'Local Insights', value: 100, suffix: '%' },
];

const TESTIMONIALS = [
  { name: 'Aditi Sharma', role: 'Solo Traveler', text: 'TrekBuddy helped me discover hidden gems I would have never found. The AI planner created a perfect 3-day itinerary!', avatar: '🧳' },
  { name: 'Rahul Menon', role: 'Family Trip', text: 'We used the transit feature to navigate the entire city by local buses. Saved us so much time and money!', avatar: '👨‍👩‍👧' },
  { name: 'Sophie Laurent', role: 'Heritage Enthusiast', text: 'As a French history lover, the heritage trails recommended by the AI were absolutely insightful.', avatar: '🏛️' },
];

/* ─────────── COUNTER HOOK ─────────── */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

/* ─────────── FLOATING PARTICLES ─────────── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── MAIN PAGE ─────────── */
export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleStartPlanning = () => {
    if (loading) return;
    router.push(user ? '/dashboard/planner' : '/login?redirect=/dashboard/planner');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">

      {/* ═══════════════ 1. CINEMATIC HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY, scale: heroScale }}>
          <div className="absolute inset-0 bg-slate-900" />
          <Image src="/images/hero-bg.jpg" alt="Puducherry Coastline" fill className="object-cover object-center" priority />
        </motion.div>

        {/* Multi-layer cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/80 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent z-[1]" />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Animated vignette edges */}
        <div className="absolute inset-0 z-[2] shadow-[inset_0_0_150px_60px_rgba(0,0,0,0.4)]" />

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Badge className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 text-sm uppercase tracking-[0.3em] backdrop-blur-xl border-white/10 font-medium rounded-full">
                <Compass className="w-3.5 h-3.5 mr-2 animate-spin" style={{ animationDuration: '8s' }} />
                Welcome to Puducherry
              </Badge>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[0.95]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="block"
              >
                The French Riviera
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              >
                of the East
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Colonial heritage, spiritual tranquility, and coastal vibes — explore Puducherry like never before with AI-powered travel intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={handleStartPlanning}
                disabled={loading}
                className="group rounded-full px-10 h-16 text-lg font-bold bg-white text-slate-900 hover:bg-white shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_-15px_rgba(255,255,255,0.5)] transition-all duration-500 hover:scale-105"
              >
                {loading ? 'Loading...' : 'Start Your Journey'}
                {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-16 text-lg font-semibold border-white/20 text-white hover:text-white hover:bg-white/10 backdrop-blur-md"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Discover Puducherry
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ 2. FEATURE CARDS (Overlapping Hero) ═══════════════ */}
      <section className="relative z-20 -mt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <Link key={feature.title} href={feature.href}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring', bounce: 0.25 }}
                  onHoverStart={() => setHoveredFeature(i)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="group relative h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  {/* Hover gradient reveal */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 p-8">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:bg-white/20 group-hover:shadow-none transition-all`}>
                      <feature.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 group-hover:text-white/80 leading-relaxed mb-6 transition-colors text-sm">
                      {feature.desc}
                    </p>

                    <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors">
                      Explore
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. ANIMATED STATS BAR ═══════════════ */}
      <section className="py-20 bg-slate-950 dark:bg-slate-900 relative overflow-hidden">
        {/* Animated bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const { count, ref } = useCounter(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
                    {count.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-slate-400 font-medium tracking-wide">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. IMMERSIVE CATEGORIES ═══════════════ */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 max-w-2xl"
            >
              <Badge className="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                Curated For You
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Explore by
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> Interest</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Handpicked collections of the best Puducherry has to offer.
              </p>
            </motion.div>
            <Link href="/dashboard/categories">
              <Button variant="outline" className="rounded-full px-6 h-12 font-bold border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Horizontal scroll categories */}
          <div className="w-full overflow-x-auto pb-8 -mx-4 px-4 hide-scrollbar">
            <div className="flex gap-5 w-max">
              {CATEGORIES.map((cat, i) => (
                <Link key={cat.id} href={`/dashboard/categories/${cat.id}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', bounce: 0.2 }}
                    onHoverStart={() => setHoveredCat(cat.id)}
                    onHoverEnd={() => setHoveredCat(null)}
                    className="group relative w-[280px] md:w-[320px] h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
                    <Image src={cat.image} alt={cat.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                    {/* Count badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <Badge className="bg-white/15 hover:bg-white/25 border-none text-white backdrop-blur-xl text-xs font-bold px-3 py-1 rounded-lg">
                        {cat.count}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                      <div className={`h-1 rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500 ${hoveredCat === cat.id ? 'w-20' : 'w-10'}`} />

                      {/* Hover CTA */}
                      <div className={`flex items-center gap-2 text-sm font-bold text-white mt-3 transition-all duration-300 ${hoveredCat === cat.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                        Explore <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. TESTIMONIALS ═══════════════ */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <Badge className="bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
              <Star className="w-3 h-3 mr-1.5 fill-amber-500" />
              Loved by Travelers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Stories from the Road
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring', bounce: 0.2 }}
                className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-7 border border-slate-200/80 dark:border-slate-700/50 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all hover:shadow-lg"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. CINEMATIC CTA ═══════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-slate-950 to-violet-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.08),transparent_60%)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/20 mx-auto">
                <Sparkles className="w-10 h-10" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Experience Puducherry
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              TrekBuddy combines local insights with AI intelligence to craft your perfect itinerary. Don&apos;t just visit — explore smarter.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                onClick={handleStartPlanning}
                className="group rounded-full px-10 h-16 text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-500 hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Plan Your Trip with AI
              </Button>
              <Link href="/dashboard/chat">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-16 text-lg font-semibold border-slate-700 text-white hover:text-white hover:bg-white/5 hover:border-slate-600"
                >
                  Ask AI a Question
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
