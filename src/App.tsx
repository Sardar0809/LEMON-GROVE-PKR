import React from 'react';
import { Product, CartItem, Order, User, DiscountCode } from './types';
import { INITIAL_PRODUCTS, INITIAL_DISCOUNTS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import TrackingSection from './components/TrackingSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // State
  const [products, setProducts] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('lemon_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [orders, setOrders] = React.useState<Order[]>(() => {
    const saved = localStorage.getItem('lemon_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = React.useState<User | null>(() => {
    const saved = localStorage.getItem('lemon_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [wishlist, setWishlist] = React.useState<number[]>(() => {
    const saved = localStorage.getItem('lemon_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentView, setCurrentView] = React.useState('shop');
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Persistence
  React.useEffect(() => {
    localStorage.setItem('lemon_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('lemon_orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    localStorage.setItem('lemon_user', JSON.stringify(user));
  }, [user]);

  React.useEffect(() => {
    localStorage.setItem('lemon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Handlers
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prev.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        alert('Not enough stock available');
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      const product = products.find(p => p.id === id);
      if (!item || !product) return prev;

      const newQty = item.quantity + delta;
      if (newQty <= 0) return prev.filter(i => i.id !== id);
      if (newQty > product.stock) {
        alert('Not enough stock available');
        return prev;
      }
      return prev.map(i => i.id === id ? { ...i, quantity: newQty } : i);
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleToggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePlaceOrder = (orderDetails: any) => {
    const orderId = 'ORD-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);
    
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-PK', { 
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      }),
      customer: {
        name: orderDetails.name,
        email: orderDetails.email,
        phone: orderDetails.phone,
        address: orderDetails.address
      },
      items: cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
      subtotal: orderDetails.subtotal,
      shipping: orderDetails.shipping,
      discount: orderDetails.discount,
      total: orderDetails.total,
      paymentMethod: orderDetails.paymentMethod,
      status: {
        processing: 'pending',
        delivery: 'pending',
        payment: orderDetails.paymentMethod === 'cod' ? 'pending' : 'paid'
      },
      userId: user?.id || null
    };

    // Update stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.id === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock - cartItem.quantity };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setCurrentView('tracking');
    alert(`Order placed successfully! Your Order ID is ${orderId}`);
  };

  const handleUpdateOrderStatus = (id: string, field: string, value: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        return {
          ...o,
          status: {
            ...o.status,
            [field]: value
          }
        };
      }
      return o;
    }));
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to remove this product from the harvest?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateProduct = (product: Product) => {
    // In a real app, this would open a modal to edit
    const newName = prompt('Enter new name:', product.name);
    if (newName) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, name: newName } : p));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onNavigate={setCurrentView}
        currentView={currentView}
        onSearch={setSearchTerm}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onShopClick={() => {
                const el = document.getElementById('shop');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} />
              <ProductGrid 
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
              <BlogSection />
            </motion.div>
          )}

          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AdminDashboard 
                products={products}
                orders={orders}
                users={[]} // In this demo, we don't track all users
                discounts={INITIAL_DISCOUNTS}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            </motion.div>
          )}

          {currentView === 'tracking' && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <TrackingSection orders={orders} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={setUser}
      />
    </div>
  );
}
