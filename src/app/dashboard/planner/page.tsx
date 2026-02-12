'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, MapPin, MoreVertical, Trash, Edit, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, orderBy, serverTimestamp } from 'firebase/firestore';
import { useAuthContext } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

interface Trip {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    places: number;
    image: string;
    userId: string;
}

export default function TripPlannerPage() {
    const { user } = useAuthContext();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newTripName, setNewTripName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (!user || !db) {
            setIsLoading(false);
            return;
        }

        const q = query(
            collection(db, 'trips'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tripData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Trip[];
            setTrips(tripData);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching trips:", error);
            setIsLoading(false);
            if (error.code === 'failed-precondition') {
                console.log("Likely missing index for composite query.");
            }
        });

        return () => unsubscribe();
    }, [user]);

    const handleCreateTrip = async () => {
        if (!newTripName.trim() || !user || !db) return;

        setIsCreating(true);
        try {
            await addDoc(collection(db, 'trips'), {
                name: newTripName,
                userId: user.uid,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0],
                places: 0,
                image: '/images/hero-bg.jpg', // Default placeholder
                createdAt: serverTimestamp()
            });

            setIsCreateOpen(false);
            setNewTripName('');
            toast.success('Trip created successfully!');
        } catch (error) {
            console.error("Error creating trip:", error);
            toast.error('Failed to create trip');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteTrip = async (id: string) => {
        if (!confirm('Are you sure you want to delete this trip?')) return;

        try {
            if (db) {
                await deleteDoc(doc(db, 'trips', id));
                toast.success('Trip deleted');
            }
        } catch (error) {
            console.error("Error deleting trip:", error);
            toast.error('Failed to delete trip');
        }
    };

    return (
        <div className="min-h-screen pb-12">
            <DashboardHeader
                title="Your Adventures"
                subtitle="Plan, organize, and relive your journeys in Puducherry."
                showHome={true}
            >
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 rounded-full px-6">
                            <Plus className="w-5 h-5 mr-2" /> Create New Trip
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <DialogHeader>
                            <DialogTitle>Create a New Trip</DialogTitle>
                            <DialogDescription>
                                Start your journey by naming your trip. You can add specific places later.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tripName">Trip Name</Label>
                                <Input
                                    id="tripName"
                                    placeholder="e.g. Summer Beach Vacation"
                                    value={newTripName}
                                    onChange={(e) => setNewTripName(e.target.value)}
                                    className="col-span-3 bg-slate-50 dark:bg-slate-800"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateTrip} className="bg-cyan-600 hover:bg-cyan-700 text-white" loading={isCreating}>
                                Create Trip
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DashboardHeader>

            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
                    </div>
                ) : trips.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {trips.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="group h-full border border-slate-100 dark:border-slate-800 shadow-sm card-hover overflow-hidden bg-white dark:bg-slate-900">
                                    <CardHeader className="p-0 relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />

                                        <Image
                                            src={trip.image || '/images/hero-bg.jpg'}
                                            alt={trip.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white text-slate-900 border-none rounded-full shadow-sm">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Edit className="w-4 h-4 mr-2" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDeleteTrip(trip.id)}>
                                                        <Trash className="w-4 h-4 mr-2" /> Delete Trip
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="absolute bottom-5 left-5 z-20 text-white w-full pr-10">
                                            <CardTitle className="text-2xl font-bold tracking-tight mb-2 truncate drop-shadow-sm">{trip.name}</CardTitle>
                                            <div className="flex items-center text-xs font-medium space-x-2">
                                                <span className="bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1.5" />
                                                    {trip.startDate}
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                                <MapPin className="w-4 h-4 text-cyan-600" />
                                                <span className="font-semibold">{trip.places || 0} Places</span>
                                            </div>
                                            <span className="text-xs bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 font-medium">
                                                2 Days
                                            </span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-6 pt-0">
                                        <Link href={`/dashboard/planner/${trip.id}`} className="w-full">
                                            <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all font-semibold h-11 group/btn border border-transparent" variant="default">
                                                View Itinerary
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50 max-w-3xl mx-auto"
                    >
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-full mb-6 shadow-xl shadow-cyan-500/10 ring-1 ring-slate-100 dark:ring-slate-700">
                            <Sparkles className="w-12 h-12 text-cyan-500" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Start Your First Adventure</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed text-lg">
                            Your itinerary is waiting to be written. Create a trip to begin curating your perfect Puducherry experience.
                        </p>
                        <Button onClick={() => setIsCreateOpen(true)} size="lg" className="h-12 px-8 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105">
                            Create Your First Trip
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
