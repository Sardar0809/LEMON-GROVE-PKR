import { Product, DiscountCode } from './types';

const PKR_FACTOR = 200;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Organic Lemons (1 kg)",
    price: 4.99 * PKR_FACTOR,
    category: "fresh",
    stock: 15,
    description: "Freshly picked organic lemons from our sun-drenched groves.",
    image: "https://images.pexels.com/photos/2295248/pexels-photo-2295248.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    name: "Cold Pressed Juice (500ml)",
    price: 6.49 * PKR_FACTOR,
    category: "drinks",
    stock: 8,
    description: "Pure, unadulterated lemon juice with no added sugar or preservatives.",
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    name: "Meyer Lemon Tree (1ft)",
    price: 19.99 * PKR_FACTOR,
    category: "plants",
    stock: 4,
    description: "A hardy, young Meyer lemon tree perfect for indoor or outdoor pots.",
    image: "https://images.pexels.com/photos/158053/lemons-tree-lemon-fruit-158053.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    name: "Lemon Gift Crate",
    price: 29.99 * PKR_FACTOR,
    category: "gifts",
    stock: 6,
    description: "A curated selection of our finest lemon products in a rustic wooden crate.",
    image: "https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 5,
    name: "Dried Lemon Wheels (50g)",
    price: 8.99 * PKR_FACTOR,
    category: "preserved",
    stock: 12,
    description: "Slow-dried lemon slices, perfect for garnishing drinks or baking.",
    image: "https://images.pexels.com/photos/4192803/pexels-photo-4192803.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    name: "Lemon Blossom Honey (250g)",
    price: 12.49 * PKR_FACTOR,
    category: "food",
    stock: 7,
    description: "Rare honey harvested from bees that pollinate our lemon blossoms.",
    image: "https://images.pexels.com/photos/634365/pexels-photo-634365.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 7,
    name: "Lemon Curd (200g Jar)",
    price: 7.99 * PKR_FACTOR,
    category: "food",
    stock: 10,
    description: "Velvety smooth and tangy lemon curd made with fresh eggs and butter.",
    image: "https://images.pexels.com/photos/1395963/pexels-photo-1395963.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 8,
    name: "Handmade Lemon Soap",
    price: 14.99 * PKR_FACTOR,
    category: "gifts",
    stock: 5,
    description: "Artisanal soap bars infused with real lemon essential oils.",
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 9,
    name: "Fresh Lemon Leaves",
    price: 3.99 * PKR_FACTOR,
    category: "fresh",
    stock: 20,
    description: "Aromatic leaves for cooking, tea, or decorative garnishing.",
    image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const INITIAL_DISCOUNTS: DiscountCode[] = [
  { code: "LEMON10", percent: 10 },
  { code: "FRESH20", percent: 20 },
  { code: "CITRUS5", percent: 5 }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Lemonade Recipe",
    image: "https://images.pexels.com/photos/2103949/pexels-photo-2103949.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt: "Discover the secret to the most refreshing summer drink you've ever tasted.",
    date: "May 12, 2024"
  },
  {
    id: 2,
    title: "3 Ways to Use Lemon Zest",
    image: "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt: "Don't throw away those peels! Here's how to elevate your cooking with zest.",
    date: "June 05, 2024"
  },
  {
    id: 3,
    title: "Caring for Your Lemon Tree",
    image: "https://images.pexels.com/photos/2295248/pexels-photo-2295248.jpeg?auto=compress&cs=tinysrgb&w=600",
    excerpt: "A beginner's guide to keeping your citrus plants healthy and productive.",
    date: "July 20, 2024"
  }
];
