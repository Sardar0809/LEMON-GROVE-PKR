export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: {
    processing: 'pending' | 'processing' | 'completed';
    delivery: 'pending' | 'shipped' | 'delivered';
    payment: 'pending' | 'paid';
  };
  userId: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DiscountCode {
  code: string;
  percent: number;
}
