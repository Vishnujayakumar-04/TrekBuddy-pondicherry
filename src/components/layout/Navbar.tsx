'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, User, LogOut, Map, Heart, Search, Compass, Shield, PhoneCall } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

export function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pathname = usePathname();
    const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(pathname);

    if (isAuthPage) return null;

    return (
        <header className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300 border-b",
            scrolled
                ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 py-2 shadow-sm"
                : "bg-transparent border-transparent py-4"
        )}>
            <div className="container flex items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4 lg:gap-8">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-200">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] border-r border-slate-200 dark:border-slate-800">
                            <SheetHeader className="text-left mb-8">
                                <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                    TrekBuddy
                                </SheetTitle>
                                <SheetDescription>
                                    Explore Puddingcherry with AI.
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="flex flex-col gap-2">
                                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-medium">
                                    <Compass className="w-5 h-5 text-cyan-500" />
                                    Home
                                </Link>
                                <Link href="/dashboard/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-medium">
                                    <Map className="w-5 h-5 text-blue-500" />
                                    Explore
                                </Link>
                                <Link href="/dashboard/planner" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-medium">
                                    <Shield className="w-5 h-5 text-purple-500" />
                                    Trip Planner
                                </Link>
                                <Link href="/dashboard/chat" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-medium">
                                    <PhoneCall className="w-5 h-5 text-green-500" />
                                    AI Guide
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-xl shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                            TB
                        </div>
                        <span className={cn(
                            "font-bold text-xl tracking-tight transition-colors duration-300",
                            scrolled ? "text-slate-900 dark:text-white" : "text-white md:text-white"
                        )}>
                            TrekBuddy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/" className={cn(navigationMenuTriggerStyle(),
                                            "bg-transparent hover:bg-white/10 hover:text-cyan-400 focus:bg-white/10 transition-colors",
                                            scrolled ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" : "text-slate-200 hover:text-white"
                                        )}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/dashboard/categories" className={cn(navigationMenuTriggerStyle(),
                                            "bg-transparent hover:bg-white/10 hover:text-cyan-400 focus:bg-white/10 transition-colors",
                                            scrolled ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" : "text-slate-200 hover:text-white"
                                        )}>
                                            Explore
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/dashboard/planner" className={cn(navigationMenuTriggerStyle(),
                                            "bg-transparent hover:bg-white/10 hover:text-cyan-400 focus:bg-white/10 transition-colors",
                                            scrolled ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" : "text-slate-200 hover:text-white"
                                        )}>
                                            Planner
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/dashboard/chat" className={cn(navigationMenuTriggerStyle(),
                                            "bg-transparent hover:bg-white/10 hover:text-cyan-400 focus:bg-white/10 transition-colors",
                                            scrolled ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" : "text-slate-200 hover:text-white"
                                        )}>
                                            AI Guide
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "hidden sm:flex transition-colors",
                            scrolled ? "text-slate-500 hover:text-slate-900" : "text-slate-300 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-white/20 hover:ring-white/50 transition-all p-0 overflow-hidden">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                        <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-medium">
                                            {user.displayName?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/profile?tab=saved" className="cursor-pointer">
                                        <Heart className="mr-2 h-4 w-4" />
                                        <span>Saved Places</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/planner" className="cursor-pointer">
                                        <Map className="mr-2 h-4 w-4" />
                                        <span>My Trips</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                asChild
                                className={cn(
                                    "hidden sm:flex hover:bg-white/10",
                                    scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:text-white"
                                )}
                            >
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all font-semibold rounded-full px-6 shadow-sm"
                            >
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

