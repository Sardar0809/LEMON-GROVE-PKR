import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBasket, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-lemon-100 rounded-xl text-lemon-600">
                  <ShoppingBasket className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">Your Basket</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center">
                    <ShoppingBasket className="w-10 h-10 text-stone-200" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-stone-900">Your basket is empty</p>
                    <p className="text-stone-500">Looks like you haven't added any citrus yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-6 py-3 bg-leaf-600 text-white rounded-full font-bold hover:bg-leaf-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-stone-900 truncate pr-4">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-stone-500 mb-3">Rs. {item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-stone-100 rounded-full p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-leaf-600">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span className="text-leaf-600 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-leaf-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-leaf-700 transition-all active:scale-[0.98] shadow-lg shadow-leaf-100"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
