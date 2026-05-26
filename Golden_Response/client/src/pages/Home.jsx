import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard.jsx";
import { fetchBlogs } from "../store/blogSlice.js";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.blogs);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  function handleSearch(event) {
    event.preventDefault();
    dispatch(fetchBlogs({ search }));
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="space-y-12">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 border-b border-blue-100/50 pb-12 lg:grid-cols-[1fr_420px] lg:items-end"
      >
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.p 
            className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Modern publishing
          </motion.p>
          <motion.h1 
            className="max-w-3xl text-5xl sm:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            BlogForge
          </motion.h1>
          <motion.p 
            className="mt-4 max-w-2xl text-lg leading-8 text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Read, publish, draft, comment, and manage posts from a complete full-stack blog workspace.
          </motion.p>
        </motion.div>
        <motion.form 
          onSubmit={handleSearch} 
          className="flex items-center rounded-xl border border-blue-200 bg-white p-2 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-200"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
        >
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 px-4 py-2 text-sm outline-none placeholder-slate-400"
            placeholder="Search posts..."
          />
          <motion.button 
            type="submit" 
            className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Search"
          >
            <Search className="h-4 w-4" />
          </motion.button>
        </motion.form>
      </motion.section>

      {loading && (
        <motion.div 
          className="py-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-flex items-center gap-2 text-slate-600">
            <motion.div 
              className="h-3 w-3 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="h-3 w-3 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            ></motion.div>
            <motion.div 
              className="h-3 w-3 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            ></motion.div>
            <span>Loading amazing posts...</span>
          </div>
        </motion.div>
      )}
      {error && (
        <motion.div 
          className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 text-red-700 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      {!loading && items.length === 0 && (
        <motion.div 
          className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            className="text-slate-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No published posts yet.
          </motion.div>
          <motion.p 
            className="text-slate-500 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Be the first to share your thoughts!
          </motion.p>
        </motion.div>
      )}
      {items.length > 0 && (
        <motion.section 
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((blog) => (
            <motion.div
              key={blog._id}
              variants={itemVariants}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.section>
      )}
    </div>
  );
}
