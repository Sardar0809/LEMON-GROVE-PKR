import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Truck, Gift, Tag, CheckCircle2 } from 'lucide-react';
import { CartItem, DiscountCode } from '../types';
import { INITIAL_DISCOUNTS } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onPlaceOrder: (details: any) => void;
}

export default function CheckoutModal({ isOpen, onClose, cart, onPlaceOrder }: CheckoutModalProps) {
  const [step, setStep] = React.useState(1);
  const [details, setDetails] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isGift: false,
    giftMessage: '',
    discountCode: '',
    paymentMethod: 'easypaisa'
  });
  const [appliedDiscount, setAppliedDiscount] = React.useState<DiscountCode | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 1000;
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0;
  const total = subtotal + shipping - discountAmount;

  const handleApplyDiscount = () => {
    const discount = INITIAL_DISCOUNTS.find(d => d.code.toUpperCase() === details.discountCode.toUpperCase());
    if (discount) {
      setAppliedDiscount(discount);
    } else {
      alert('Invalid discount code');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder({
      ...details,
      subtotal,
      shipping,
      discount: discountAmount,
      total,
      appliedDiscount: appliedDiscount?.code
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
            className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
          >
            {/* Left Side: Form */}
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-stone-900">Checkout</h2>
                <button onClick={onClose} className="lg:hidden p-2 hover:bg-stone-100 rounded-full">
                  <X className="w-6 h-6 text-stone-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Info */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-leaf-600 font-bold uppercase tracking-widest text-xs">
                    <Truck className="w-4 h-4" />
                    Shipping Details
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={details.name}
                      onChange={e => setDetails({ ...details, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={details.email}
                      onChange={e => setDetails({ ...details, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500"
                    />
                  </div>
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number (e.g. +92 3xx xxxxxxx)"
                    value={details.phone}
                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500"
                  />
                  <textarea
                    required
                    placeholder="Complete Delivery Address"
                    rows={3}
                    value={details.address}
                    onChange={e => setDetails({ ...details, address: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500 resize-none"
                  />
                </section>

                {/* Gift Option */}
                <section className="p-6 rounded-3xl bg-lemon-50 border border-lemon-100 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={details.isGift}
                      onChange={e => setDetails({ ...details, isGift: e.target.checked })}
                      className="w-5 h-5 rounded border-lemon-300 text-lemon-500 focus:ring-lemon-500"
                    />
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <Gift className="w-4 h-4 text-lemon-600" />
                      This is a gift
                    </div>
                  </label>
                  {details.isGift && (
                    <motion.textarea
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      placeholder="Enter your gift message here..."
                      rows={2}
                      value={details.giftMessage}
                      onChange={e => setDetails({ ...details, giftMessage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-lemon-300 resize-none"
                    />
                  )}
                </section>

                {/* Payment Method */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-leaf-600 font-bold uppercase tracking-widest text-xs">
                    <CreditCard className="w-4 h-4" />
                    Payment Method
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['easypaisa', 'jazzcash', 'bank', 'cod'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setDetails({ ...details, paymentMethod: method })}
                        className={`px-4 py-4 rounded-2xl border-2 font-bold capitalize transition-all ${
                          details.paymentMethod === method
                            ? 'border-leaf-600 bg-leaf-50 text-leaf-700'
                            : 'border-stone-100 bg-stone-50 text-stone-500 hover:border-stone-200'
                        }`}
                      >
                        {method === 'cod' ? 'Cash on Delivery' : method}
                      </button>
                    ))}
                  </div>
                </section>

                <button
                  type="submit"
                  className="w-full py-5 bg-leaf-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-leaf-100 hover:bg-leaf-700 transition-all active:scale-[0.98]"
                >
                  Place Order • Rs. {total.toLocaleString()}
                </button>
              </form>
            </div>

            {/* Right Side: Summary */}
            <div className="w-full lg:w-[380px] bg-stone-50 p-8 lg:p-12 border-l border-stone-100 overflow-y-auto">
              <div className="hidden lg:flex justify-end mb-8">
                <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                  <X className="w-6 h-6 text-stone-400" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-600">
                      <span className="font-bold text-stone-900">{item.quantity}x</span> {item.name}
                    </span>
                    <span className="font-bold text-stone-900">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-stone-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Discount Code"
                    value={details.discountCode}
                    onChange={e => setDetails({ ...details, discountCode: e.target.value })}
                    className="w-full pl-10 pr-20 py-3 rounded-xl bg-white border border-stone-200 text-sm focus:ring-2 focus:ring-leaf-500"
                  />
                  <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscount && (
                  <div className="flex items-center justify-between px-3 py-2 bg-leaf-50 rounded-xl text-leaf-700 text-xs font-bold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Code {appliedDiscount.code} Applied
                    </span>
                    <span>-{appliedDiscount.percent}%</span>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span>Rs. {shipping.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-leaf-600 font-bold">
                      <span>Discount</span>
                      <span>-Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-black text-stone-900 pt-4 border-t border-stone-200">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-white border border-stone-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-[10px] leading-tight text-stone-500 uppercase tracking-widest font-bold">
                  Estimated Delivery<br />
                  <span className="text-stone-900 text-xs normal-case tracking-normal">Within 24-48 Hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
