import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-lemon-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-leaf-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lemon-100 text-lemon-700 text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                Fresh Harvest Now in PKR
              </span>
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-stone-900 leading-[1.1] mb-8">
                Nature's Zest, <br />
                <span className="text-leaf-600 italic">Delivered Fresh.</span>
              </h1>
              <p className="text-lg lg:text-xl text-stone-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the pure essence of our sun-ripened lemon groves. 
                Homegrown with love, naturally processed, and delivered with 
                real-time inventory control.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onShopClick}
                  className="group relative px-8 py-4 bg-leaf-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:bg-leaf-700 active:scale-95 shadow-lg shadow-leaf-200"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop the Harvest
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button className="px-8 py-4 text-stone-600 font-bold hover:text-leaf-600 transition-colors">
                  Our Story
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8 grayscale opacity-50"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-stone-900">100%</span>
                <span className="text-xs uppercase tracking-widest font-bold">Organic</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-stone-900">24h</span>
                <span className="text-xs uppercase tracking-widest font-bold">Delivery</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-stone-900">PKR</span>
                <span className="text-xs uppercase tracking-widest font-bold">Local</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/2295248/pexels-photo-2295248.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh Lemons"
                className="rounded-[40px] lg:rounded-[80px] shadow-2xl card-shadow object-cover aspect-[4/5] lg:aspect-square"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 glass p-6 rounded-3xl card-shadow max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-leaf-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Live Stock</span>
                </div>
                <p className="text-sm font-medium text-stone-800">
                  Fresh batch harvested just 4 hours ago.
                </p>
              </motion.div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-lemon-300 rounded-full -z-10 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/2 -right-12 w-16 h-16 bg-leaf-200 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
