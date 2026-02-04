
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Page } from '../App';
import { GoogleIcon, FacebookIcon, DashboardIcon, UserIcon } from '../components/icons';

interface LoginPageProps {
    setPage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            // Check if user is admin/manager to direct to dashboard if needed
            // The AuthContext will have updated the 'user' state already
            if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('layla')) {
                setPage('dashboard');
            } else {
                setPage('home');
            }
        } else {
            setError('البريد الإلكتروني غير مسجل أو كلمة المرور خاطئة');
        }
    };

    const handleQuickLogin = (role: 'admin' | 'user') => {
        const credentials = role === 'admin' 
            ? { email: 'admin@reptilehouse.sy', pass: 'admin123' }
            : { email: 'user@reptilehouse.sy', pass: 'user123' };
            
        const success = login(credentials.email, credentials.pass);
        if (success) {
            if (role === 'admin') {
                setPage('dashboard');
            } else {
                setPage('home');
            }
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg animate-scale-in">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white">تسجيل الدخول</h2>
                    <p className="text-gray-400 text-sm">أهلاً بك مجدداً في بيت الزواحف</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl text-xs text-center font-bold">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 space-x-reverse w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-3 text-white hover:bg-white/20 transition-all active:scale-95">
                        <GoogleIcon />
                        <span className="text-sm font-bold">Google</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 space-x-reverse w-full bg-blue-600/30 border border-blue-500/50 rounded-lg py-2.5 px-3 text-white hover:bg-blue-600/50 transition-all active:scale-95">
                        <FacebookIcon />
                        <span className="text-sm font-bold">Facebook</span>
                    </button>
                </div>

                 <div className="flex items-center py-2">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-xs text-gray-500 uppercase tracking-widest font-bold">أو البريد الإلكتروني</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-xs font-black text-amber-400 uppercase tracking-wider mb-2 ms-1">البريد الإلكتروني</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-right"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2 ms-1">
                             <label htmlFor="password"  className="block text-xs font-black text-amber-400 uppercase tracking-wider">كلمة المرور</label>
                             <a href="#" onClick={(e) => { e.preventDefault(); setPage('forgotPassword'); }} className="text-xs text-amber-500 hover:text-amber-400 hover:underline">نسيت كلمة المرور؟</a>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all text-right"
                            placeholder="********"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-gray-900 font-black py-4 rounded-xl hover:bg-amber-400 transition-all duration-300 transform hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95"
                    >
                        دخول للموقع
                    </button>
                </form>

                <div className="pt-4 border-t border-white/10 space-y-3 text-right">
                    <div className="flex gap-2">
                         <button 
                            onClick={() => handleQuickLogin('admin')}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-black py-3 rounded-xl hover:bg-indigo-500/30 transition-all group text-xs"
                        >
                            <DashboardIcon className="w-4 h-4" />
                            <span>دخول كمسؤول</span>
                        </button>
                        <button 
                            onClick={() => handleQuickLogin('user')}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/40 text-green-300 font-black py-3 rounded-xl hover:bg-green-500/30 transition-all group text-xs"
                        >
                            <UserIcon className="w-4 h-4" />
                            <span>دخول كمستخدم</span>
                        </button>
                    </div>
                </div>

                <p className="text-center text-gray-400 text-sm">
                    ليس لديك حساب؟{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage('register'); }} className="font-bold text-amber-500 hover:text-amber-400 underline underline-offset-4">
                        أنشئ حساباً جديداً
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
