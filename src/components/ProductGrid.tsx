import React from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Info, AlertCircle } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
  wishlist: number[];
}

export default function ProductGrid({ products, onAddToCart, onToggleWishlist, wishlist }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">The Harvest</h2>
          <p className="text-stone-600 max-w-md">
            Explore our range of fresh citrus and artisanal lemon products, 
            all sourced directly from our groves.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all capitalize ${
                activeCategory === cat 
                  ? 'bg-leaf-600 text-white shadow-md shadow-leaf-100' 
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <div key={product.id}>
            <ProductCard 
              product={product} 
              index={index}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ 
  product, 
  index, 
  onAddToCart, 
  onToggleWishlist,
  isWishlisted 
}: { 
  product: Product; 
  index: number;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}) {
  const isOutOfStock = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative bg-white rounded-[32px] overflow-hidden border border-stone-100 card-shadow transition-all hover:-translate-y-1 ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 rounded-full glass text-[10px] font-bold uppercase tracking-wider text-stone-700">
            {product.category}
          </span>
          {isOutOfStock && (
            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-4 right-4 p-2 rounded-full glass transition-all active:scale-90 ${isWishlisted ? 'text-red-500' : 'text-stone-400 hover:text-red-400'}`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-900 group-hover:text-leaf-600 transition-colors">
            {product.name}
          </h3>
          <span className="text-xl font-black text-leaf-600">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-sm text-stone-500 mb-6 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Availability</span>
            <span className={`text-sm font-bold ${product.stock < 5 ? 'text-orange-500' : 'text-leaf-600'}`}>
              {isOutOfStock ? 'Restocking soon' : `${product.stock} units left`}
            </span>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all active:scale-95 ${
              isOutOfStock 
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                : 'bg-lemon-300 text-stone-900 hover:bg-lemon-400 shadow-lg shadow-lemon-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
