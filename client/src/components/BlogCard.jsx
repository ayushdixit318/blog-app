import { CalendarDays, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_ORIGIN } from "../api/http.js";

export default function BlogCard({ blog, compact = false }) {
  const image = blog.coverImage
    ? `${API_ORIGIN}${blog.coverImage}`
    : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
    >
      {!compact && (
        <Link to={`/blogs/${blog.slug}`} className="overflow-hidden block">
          <motion.img 
            src={image} 
            alt="" 
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      )}
      <div className="space-y-4 p-5">
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {(blog.tags || []).slice(0, 3).map((tag) => (
            <motion.span 
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200"
            >
              {tag}
            </motion.span>
          ))}
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize border ${
              blog.status === 'published' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
            }`}
          >
            {blog.status}
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Link to={`/blogs/${blog.slug}`} className="text-xl font-black text-slate-900 hover:text-blue-600 transition-colors duration-200">
            {blog.title}
          </Link>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{blog.excerpt}</p>
        </motion.div>
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-600 pt-2 border-t border-blue-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <span className="font-semibold text-slate-700">{blog.author?.name || "Unknown author"}</span>
          <span className="inline-flex items-center gap-1 text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-3 text-slate-600">
            <motion.span 
              className="inline-flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="h-3.5 w-3.5" />
              {blog.likes?.length || 0}
            </motion.span>
            <motion.span 
              className="inline-flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {blog.comments?.length || 0}
            </motion.span>
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}
