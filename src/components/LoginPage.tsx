import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight, Loader2, Mail, GraduationCap } from 'lucide-react';

interface LoginPageProps {
    onLoginSuccess: (userName: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [educationLevel, setEducationLevel] = useState<'Secondary' | 'Post-Secondary'>('Post-Secondary');

    const API_URL = 'http://localhost:8001';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const body = isLogin
                ? { username, password }
                : { username, password, education_level: educationLevel };

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Authentication failed');
            }

            // Success
            onLoginSuccess(data.username);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7EB8B3] mb-4 shadow-lg">
                        <User size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#4A5568] mb-2 font-serif">
                        {isLogin ? 'Welcome Back' : 'Join YUNO'}
                    </h1>
                    <p className="text-[#9CA3AF]">
                        {isLogin
                            ? 'Sign in to continue your journey'
                            : 'Create an account to discover your path'
                        }
                    </p>
                </div>

                <div
                    className="bg-[#FFFEF9] rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-[#4A5568] ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F5F0EB] text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#7EB8B3]/50 transition-all placeholder-gray-400"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-[#4A5568] ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F5F0EB] text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#7EB8B3]/50 transition-all placeholder-gray-400"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Registration Extra Fields */}
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-1 overflow-hidden"
                            >
                                <label className="text-sm font-medium text-[#4A5568] ml-1">Education Level</label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => setEducationLevel('Secondary')}
                                        className={`py-3 px-2 rounded-2xl text-sm transition-all ${educationLevel === 'Secondary'
                                                ? 'bg-[#7EB8B3] text-white shadow-md'
                                                : 'bg-[#F5F0EB] text-[#9CA3AF] hover:bg-gray-100'
                                            }`}
                                    >
                                        Secondary
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEducationLevel('Post-Secondary')}
                                        className={`py-3 px-2 rounded-2xl text-sm transition-all ${educationLevel === 'Post-Secondary'
                                                ? 'bg-[#7EB8B3] text-white shadow-md'
                                                : 'bg-[#F5F0EB] text-[#9CA3AF] hover:bg-gray-100'
                                            }`}
                                    >
                                        Post-Secondary
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#7EB8B3] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-[#7EB8B3]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Switch */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-[#9CA3AF] text-sm hover:text-[#7EB8B3] transition-colors"
                        >
                            {isLogin
                                ? "Don't have an account? Create one"
                                : "Already have an account? Sign in"
                            }
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
