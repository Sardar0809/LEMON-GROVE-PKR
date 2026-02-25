import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [isRegister, setIsRegister] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: 'U' + Date.now(),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <div className="flex justify-end mb-4">
                <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-stone-400" />
                </button>
              </div>

              <div className="text-center mb-10">
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">
                  {isRegister ? 'Join the Grove' : 'Welcome Back'}
                </h2>
                <p className="text-stone-500">
                  {isRegister ? 'Create an account to start your citrus journey.' : 'Sign in to access your orders and wishlist.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                  <div className="relative">
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500"
                    />
                    <UserIcon className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                )}
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500"
                  />
                  <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative">
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500"
                  />
                  <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black text-xl shadow-xl shadow-stone-100 hover:bg-stone-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isRegister ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-sm font-bold text-leaf-600 hover:text-leaf-700 transition-colors"
                >
                  {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Join the Grove"}
                </button>
              </div>
            </div>

            <div className="bg-lemon-100 p-6 text-center">
              <p className="text-xs font-bold text-lemon-800 uppercase tracking-widest">
                🍋 Join 5,000+ citrus lovers today
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
