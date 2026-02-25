import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export default function BlogSection() {
  return (
    <section id="blog" className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Citrus Stories</h2>
            <p className="text-stone-600 max-w-md">
              Tips, recipes, and insights from the heart of our lemon groves.
            </p>
          </div>
          <button className="flex items-center gap-2 font-bold text-leaf-600 hover:text-leaf-700 transition-colors group">
            View All Posts
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[32px] overflow-hidden border border-stone-100 card-shadow hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 group-hover:text-leaf-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-stone-500 text-sm mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <button className="text-sm font-bold text-stone-900 flex items-center gap-2 hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4 text-leaf-600" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
