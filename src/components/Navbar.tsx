import React from 'react';
import { ShoppingBasket, Search, User as UserIcon, Menu, X, Leaf, Citrus } from 'lucide-react';
import { User, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: User | null;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
  onSearch: (term: string) => void;
}

export default function Navbar({ 
  user, 
  cart, 
  onOpenCart, 
  onOpenLogin, 
  onNavigate, 
  currentView,
  onSearch 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-lemon-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('shop')}
          >
            <div className="relative">
              <Citrus className="w-8 h-8 text-lemon-500 transition-transform group-hover:rotate-12" />
              <Leaf className="w-4 h-4 text-leaf-600 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold font-serif tracking-tight text-stone-900">
              Lemon<span className="text-leaf-600">Grove</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('shop')}
              className={`font-semibold transition-colors ${currentView === 'shop' ? 'text-leaf-600' : 'text-stone-600 hover:text-leaf-500'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => onNavigate('tracking')}
              className={`font-semibold transition-colors ${currentView === 'tracking' ? 'text-leaf-600' : 'text-stone-600 hover:text-leaf-500'}`}
            >
              Track Order
            </button>
            <button 
              onClick={() => onNavigate('admin')}
              className={`font-semibold transition-colors ${currentView === 'admin' ? 'text-leaf-600' : 'text-stone-600 hover:text-leaf-500'}`}
            >
              Admin
            </button>
          </div>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search citrus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-stone-100 border-none focus:ring-2 focus:ring-lemon-300 w-48 transition-all focus:w-64"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-700 font-medium"
            >
              <UserIcon className="w-4 h-4" />
              {user ? user.name : 'Login'}
            </button>

            <button 
              onClick={onOpenCart}
              className="relative p-3 rounded-full bg-lemon-100 text-lemon-700 hover:bg-lemon-200 transition-all active:scale-95"
            >
              <ShoppingBasket className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-leaf-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-stone-700"
            >
              <ShoppingBasket className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-leaf-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-stone-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button 
                onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-lemon-50 font-semibold"
              >
                Shop
              </button>
              <button 
                onClick={() => { onNavigate('tracking'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-lemon-50 font-semibold"
              >
                Track Order
              </button>
              <button 
                onClick={() => { onNavigate('admin'); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-lemon-50 font-semibold"
              >
                Admin
              </button>
              <div className="pt-4 border-t border-stone-100">
                <button 
                  onClick={() => { onOpenLogin(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-stone-100 font-semibold"
                >
                  <UserIcon className="w-5 h-5" />
                  {user ? user.name : 'Login / Register'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
