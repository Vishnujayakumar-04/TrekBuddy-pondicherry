'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Settings as SettingsIcon, LogOut, User, Camera, Shield, Bell, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [updating, setUpdating] = useState(false);

    const handleUpdateProfile = async () => {
        setUpdating(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Profile updated successfully');
        setUpdating(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center mb-6 shadow-xl">
                    <User className="w-10 h-10 text-cyan-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Please Login</h1>
                <p className="mb-6 text-slate-500">You need to be logged in to view your profile.</p>
                <Button asChild className="rounded-2xl px-8 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24">
            {/* Profile Hero Banner */}
            <div className="relative h-48 md:h-56 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 overflow-hidden -mt-16">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_50%)]" />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
            </div>

            <div className="container max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row gap-8"
                >
                    {/* Sidebar — Profile card */}
                    <div className="w-full md:w-80 space-y-5 shrink-0">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800/80 p-6 text-center">
                            {/* Avatar */}
                            <div className="relative inline-block mb-4">
                                <Avatar className="w-24 h-24 ring-4 ring-white dark:ring-slate-900 shadow-xl">
                                    <AvatarImage src={user.photoURL || ''} />
                                    <AvatarFallback className="text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                                        {user.displayName?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <Camera className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.displayName}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{user.email}</p>

                            <Badge className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs font-bold rounded-full mb-5">
                                ✨ Active Explorer
                            </Badge>

                            <Button
                                variant="outline"
                                className="w-full rounded-xl h-11 font-semibold border-red-200 dark:border-red-900/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-300 transition-all"
                                onClick={logout}
                            >
                                <LogOut className="w-4 h-4 mr-2" /> Log Out
                            </Button>
                        </div>

                        {/* Quick Settings */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800/80 p-5">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Preferences</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: Palette, label: 'Theme', value: 'System', color: 'text-violet-500' },
                                    { icon: Bell, label: 'Notifications', value: 'On', color: 'text-amber-500' },
                                    { icon: Shield, label: 'Privacy', value: 'Public', color: 'text-emerald-500' },
                                ].map(pref => (
                                    <div key={pref.label} className="flex items-center justify-between py-1">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${pref.color}`}>
                                                <pref.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{pref.label}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg">{pref.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <Tabs defaultValue="saved" className="w-full">
                            <TabsList className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-12 p-1 rounded-xl shadow-sm mb-6">
                                <TabsTrigger value="saved" className="gap-2 rounded-lg h-full font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all">
                                    <Heart className="w-4 h-4" /> Saved
                                </TabsTrigger>
                                <TabsTrigger value="trips" className="gap-2 rounded-lg h-full font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all">
                                    <MapPin className="w-4 h-4" /> Trips
                                </TabsTrigger>
                                <TabsTrigger value="profile" className="gap-2 rounded-lg h-full font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all">
                                    <User className="w-4 h-4" /> Edit
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="saved">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
                                >
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Saved Places</h3>
                                        <p className="text-sm text-slate-500 mt-0.5">Destinations you've bookmarked for later.</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/10">
                                            <Heart className="w-7 h-7 text-rose-500" />
                                        </div>
                                        <p className="text-slate-500 font-medium mb-3">You haven't saved any places yet.</p>
                                        <Button variant="link" asChild className="text-cyan-600 font-semibold">
                                            <Link href="/dashboard/categories">Explore Places →</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="trips">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
                                >
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">My Trips</h3>
                                        <p className="text-sm text-slate-500 mt-0.5">Your planned itineraries.</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/10">
                                            <MapPin className="w-7 h-7 text-cyan-600" />
                                        </div>
                                        <p className="text-slate-500 font-medium mb-3">No upcoming trips.</p>
                                        <Button variant="link" asChild className="text-cyan-600 font-semibold">
                                            <Link href="/dashboard/planner">Plan a Trip →</Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="profile">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
                                >
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Personal Information</h3>
                                        <p className="text-sm text-slate-500 mt-0.5">Update your personal details.</p>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Display Name</Label>
                                            <Input
                                                id="name"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-cyan-300 dark:focus:border-cyan-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</Label>
                                            <Input
                                                id="email"
                                                value={user.email || ''}
                                                disabled
                                                className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60"
                                            />
                                        </div>
                                        <Button
                                            onClick={handleUpdateProfile}
                                            disabled={updating}
                                            className="rounded-xl h-12 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/15 transition-all hover:-translate-y-0.5"
                                        >
                                            {updating ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </motion.div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
