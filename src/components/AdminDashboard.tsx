import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Truck,
  TrendingUp,
  Download,
  Search
} from 'lucide-react';
import { Product, Order, User, DiscountCode } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  users: User[];
  discounts: DiscountCode[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateOrderStatus: (id: string, field: string, value: string) => void;
}

export default function AdminDashboard({ 
  products, 
  orders, 
  users, 
  discounts,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = React.useState('orders');
  
  const stats = [
    { label: 'Total Revenue', value: `Rs. ${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: TrendingUp, color: 'text-leaf-600', bg: 'bg-leaf-50' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-lemon-600', bg: 'bg-lemon-50' },
    { label: 'Active Products', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Customers', value: users.length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">Admin Dashboard</h2>
          <p className="text-stone-500">Manage your harvest, orders, and citrus community.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 font-bold text-stone-600 hover:bg-stone-50 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-leaf-600 text-white font-bold hover:bg-leaf-700 transition-colors shadow-lg shadow-leaf-100">
            <Plus className="w-4 h-4" />
            New Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-stone-100 card-shadow"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-stone-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 mb-8">
        {[
          { id: 'orders', label: 'Orders', icon: ShoppingBag },
          { id: 'products', label: 'Products & Stock', icon: Package },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'discounts', label: 'Discounts', icon: TrendingUp },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-8 py-4 font-bold transition-all relative ${
              activeTab === tab.id ? 'text-leaf-600' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-leaf-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-[32px] border border-stone-100 card-shadow overflow-hidden">
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Processing</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Delivery</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-stone-500">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-stone-900">{order.customer.name}</p>
                      <p className="text-xs text-stone-400">{order.customer.email}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900">Rs. {order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        order.status.payment === 'paid' ? 'bg-leaf-100 text-leaf-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status.processing}
                        onChange={(e) => onUpdateOrderStatus(order.id, 'processing', e.target.value)}
                        className="text-xs font-bold bg-stone-100 border-none rounded-lg focus:ring-2 focus:ring-leaf-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status.delivery}
                        onChange={(e) => onUpdateOrderStatus(order.id, 'delivery', e.target.value)}
                        className="text-xs font-bold bg-stone-100 border-none rounded-lg focus:ring-2 focus:ring-leaf-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-stone-400 hover:text-leaf-600 transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="p-6 grid grid-cols-1 gap-4">
            {products.map(product => (
              <div key={product.id} className="flex items-center gap-6 p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:border-leaf-200 transition-all group">
                <img src={product.image} className="w-16 h-16 rounded-xl object-cover" alt={product.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900">{product.name}</h4>
                  <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">{product.category}</p>
                </div>
                <div className="text-right px-6">
                  <p className="text-sm font-bold text-stone-900">Rs. {product.price.toLocaleString()}</p>
                  <p className={`text-xs font-bold ${product.stock < 5 ? 'text-red-500' : 'text-leaf-600'}`}>
                    {product.stock} in stock
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onUpdateProduct(product)} className="p-2 bg-white rounded-lg border border-stone-200 text-stone-400 hover:text-leaf-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDeleteProduct(product.id)} className="p-2 bg-white rounded-lg border border-stone-200 text-stone-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="p-6 rounded-3xl bg-stone-50 border border-stone-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-black">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-stone-900">{user.name}</p>
                  <p className="text-xs text-stone-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'discounts' && (
          <div className="p-6 space-y-4">
            <div className="flex gap-4 mb-8">
              <input type="text" placeholder="Code (e.g. SUMMER25)" className="flex-1 px-4 py-2 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500" />
              <input type="number" placeholder="% Off" className="w-32 px-4 py-2 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-leaf-500" />
              <button className="px-6 py-2 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors">Add Code</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {discounts.map(d => (
                <div key={d.code} className="p-4 rounded-2xl border-2 border-dashed border-stone-200 flex justify-between items-center">
                  <div>
                    <p className="font-black text-stone-900">{d.code}</p>
                    <p className="text-xs font-bold text-leaf-600">{d.percent}% Off</p>
                  </div>
                  <button className="text-stone-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
