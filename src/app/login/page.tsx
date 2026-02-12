'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!auth) {
                throw new Error('Authentication service not available');
            }
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Logged in successfully!');
            router.push('/dashboard/planner?welcome=true');
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : 'Failed to login';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Box - Image & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Pondicherry Coast"
                    fill
                    className="object-cover opacity-60 mixture-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/50 to-cyan-900/30" />
                <div className="relative z-10 flex flex-col justify-between p-16 h-full text-white">
                    <div>
                        <Link href="/" className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30 font-bold text-xl">TB</div>
                            TrekBuddy
                        </Link>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight">
                            Your journey to the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">French Riviera</span> <br />
                            starts here.
                        </h1>
                        <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                            Plan your trip, discover hidden gems, and explore Puducherry like a local with our AI-powered travel guide.
                        </p>
                    </div>
                    <div className="text-sm text-slate-400/60 font-medium tracking-wide">
                        © 2026 TrekBuddy Tourism.
                    </div>
                </div>
            </div>

            {/* Right Box - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
                <Card className="w-full max-w-md border-none shadow-none bg-transparent">
                    <CardHeader className="space-y-2 px-0">
                        <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome back</CardTitle>
                        <CardDescription className="text-slate-500 text-base">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus-visible:ring-cyan-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="text-sm font-medium text-cyan-600 hover:text-cyan-500 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus-visible:ring-cyan-500 transition-all font-medium"
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 text-base font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all mt-2" loading={loading}>
                                Sign in
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="px-0 flex flex-col space-y-5">
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-50 dark:bg-slate-950 px-3 text-slate-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full h-12 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all" type="button">
                            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </Button>
                        <p className="text-center text-sm text-slate-500 mt-4">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-cyan-600 hover:text-cyan-500 font-semibold transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
