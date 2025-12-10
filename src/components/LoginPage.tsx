import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight, Loader2, GraduationCap } from 'lucide-react';

interface LoginPageProps {
    onLoginSuccess: (userName: string, userId: number, isNewUser: boolean) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [educationLevel, setEducationLevel] = useState<'Secondary' | 'Post-Secondary'>('Post-Secondary');

    const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8001';

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
            const isNewUser = !isLogin;
            onLoginSuccess(data.username, data.user_id, isNewUser);

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

                <div className="bg-[#FFFEF9] rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-[#4A5568] ml-1">
                                <User size={18} color="#7EB8B3" />
                                <span>Username</span>
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#7EB8B3]/50 transition-all placeholder-gray-400"
                                style={{ backgroundColor: '#F5F0EB' }}
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-[#4A5568] ml-1">
                                <Lock size={18} color="#7EB8B3" />
                                <span>Password</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-2xl text-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#7EB8B3]/50 transition-all placeholder-gray-400"
                                style={{ backgroundColor: '#F5F0EB' }}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Registration Extra Fields */}
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-2 overflow-hidden"
                            >
                                <label className="flex items-center gap-2 text-sm font-medium text-[#4A5568] ml-1">
                                    <GraduationCap size={18} color="#7EB8B3" />
                                    <span>Education Level</span>
                                </label>
                                <div
                                    className="grid grid-cols-2 gap-2 p-1 rounded-2xl"
                                    style={{ backgroundColor: '#F5F0EB' }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setEducationLevel('Secondary')}
                                        className="py-2.5 px-2 rounded-xl text-sm font-semibold transition-all duration-200"
                                        style={{
                                            backgroundColor: educationLevel === 'Secondary' ? '#7EB8B3' : 'transparent',
                                            color: educationLevel === 'Secondary' ? '#FFFFFF' : '#9CA3AF',
                                            boxShadow: educationLevel === 'Secondary' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                                        }}
                                    >
                                        Secondary
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEducationLevel('Post-Secondary')}
                                        className="py-2.5 px-2 rounded-xl text-sm font-semibold transition-all duration-200"
                                        style={{
                                            backgroundColor: educationLevel === 'Post-Secondary' ? '#7EB8B3' : 'transparent',
                                            color: educationLevel === 'Post-Secondary' ? '#FFFFFF' : '#9CA3AF',
                                            boxShadow: educationLevel === 'Post-Secondary' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                                        }}
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
                            className="w-full text-white py-4 rounded-2xl font-bold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6"
                            style={{
                                backgroundColor: isLogin ? '#7EB8B3' : '#D4A574',
                                boxShadow: isLogin ? '0 10px 20px -5px rgba(126, 184, 179, 0.4)' : '0 10px 20px -5px rgba(212, 165, 116, 0.4)'
                            }}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight size={20} />
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
