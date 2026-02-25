import React from 'react';
import { motion } from 'motion/react';
import { Search, Truck, Package, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Order } from '../types';

interface TrackingSectionProps {
  orders: Order[];
}

export default function TrackingSection({ orders }: TrackingSectionProps) {
  const [orderId, setOrderId] = React.useState('');
  const [foundOrder, setFoundOrder] = React.useState<Order | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    setFoundOrder(order || null);
    if (!order) alert('Order not found. Please check your ID.');
  };

  return (
    <section id="tracking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Track Your Harvest</h2>
        <p className="text-stone-600">
          Enter your order ID to see the real-time status of your citrus delivery.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleTrack} className="relative">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ORD-123...)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full pl-6 pr-32 py-5 rounded-3xl bg-white border border-stone-200 shadow-xl shadow-stone-100 focus:ring-2 focus:ring-leaf-500 text-lg font-medium"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 bg-leaf-600 text-white font-bold rounded-2xl hover:bg-leaf-700 transition-all active:scale-95"
          >
            Track
          </button>
        </form>
      </div>

      {foundOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-[40px] border border-stone-100 card-shadow overflow-hidden"
        >
          <div className="p-8 bg-leaf-50 border-b border-leaf-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-leaf-600 uppercase tracking-widest mb-1">Order Status</p>
              <h3 className="text-2xl font-serif font-bold text-stone-900">{foundOrder.id}</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Estimated Arrival</p>
                <p className="font-bold text-stone-900">Tomorrow, by 6:00 PM</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-leaf-600 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-stone-100" />
              
              <div className="space-y-12">
                <TrackingStep 
                  icon={CheckCircle2} 
                  title="Order Placed" 
                  time={foundOrder.date} 
                  description="Your order has been received and is waiting for processing."
                  isCompleted={true}
                />
                <TrackingStep 
                  icon={Package} 
                  title="Processing" 
                  time="Processing" 
                  description="Our team is carefully picking and packing your fresh citrus."
                  isCompleted={foundOrder.status.processing === 'completed'}
                  isActive={foundOrder.status.processing === 'processing'}
                />
                <TrackingStep 
                  icon={Truck} 
                  title="Shipped" 
                  time="In Transit" 
                  description="Your package is on its way to your delivery address."
                  isCompleted={foundOrder.status.delivery === 'shipped' || foundOrder.status.delivery === 'delivered'}
                  isActive={foundOrder.status.delivery === 'shipped'}
                />
                <TrackingStep 
                  icon={MapPin} 
                  title="Delivered" 
                  time="Pending" 
                  description="Package has been successfully delivered to your doorstep."
                  isCompleted={foundOrder.status.delivery === 'delivered'}
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-stone-100 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h4 className="font-bold text-stone-900 mb-2">Delivery Address</h4>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {foundOrder.customer.name}<br />
                  {foundOrder.customer.address}<br />
                  {foundOrder.customer.phone}
                </p>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-stone-900 mb-2">Order Summary</h4>
                <div className="space-y-1">
                  {foundOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-stone-500">{item.qty}x {item.name}</span>
                      <span className="font-bold text-stone-900">Rs. {(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-2 border-t border-stone-100 mt-2">
                    <span className="font-bold text-stone-900">Total Paid</span>
                    <span className="font-black text-leaf-600">Rs. {foundOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

function TrackingStep({ icon: Icon, title, time, description, isCompleted, isActive }: any) {
  return (
    <div className="relative flex gap-8">
      <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
        isCompleted ? 'bg-leaf-600 text-white shadow-lg shadow-leaf-100' : 
        isActive ? 'bg-lemon-300 text-stone-900 animate-pulse' : 'bg-stone-50 text-stone-300'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h4 className={`font-bold ${isCompleted || isActive ? 'text-stone-900' : 'text-stone-400'}`}>{title}</h4>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{time}</span>
        </div>
        <p className="text-sm text-stone-500 max-w-md">{description}</p>
      </div>
    </div>
  );
}
