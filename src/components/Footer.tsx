import React from 'react';
import { Leaf, Citrus, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Citrus className="w-8 h-8 text-lemon-400" />
              <span className="text-2xl font-bold font-serif tracking-tight text-white">
                Lemon<span className="text-leaf-400">Grove</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Bringing the freshest, sun-ripened citrus from our family-owned 
              groves directly to your doorstep. Sustainable, organic, and 
              bursting with flavor.
            </p>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-leaf-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-leaf-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-leaf-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#shop" className="hover:text-lemon-400 transition-colors">Shop All</a></li>
              <li><a href="#blog" className="hover:text-lemon-400 transition-colors">Citrus Stories</a></li>
              <li><a href="#tracking" className="hover:text-lemon-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-lemon-400 transition-colors">Our Story</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-lemon-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-lemon-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-lemon-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-lemon-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-sm mb-6">Join the citrus club for exclusive offers and recipes.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-stone-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-leaf-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-leaf-600 text-white rounded-lg hover:bg-leaf-700 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <p>© 2025 Lemon Grove PKR. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Prices in PKR</span>
            <span>Real-time Stock</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
