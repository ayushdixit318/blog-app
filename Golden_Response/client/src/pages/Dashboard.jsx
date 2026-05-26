import { Edit3, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ConfirmModal from "../components/ConfirmModal.jsx";
import http, { getErrorMessage } from "../api/http.js";
import { fetchMine } from "../store/blogSlice.js";
import { notify } from "../store/toastSlice.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { mine, loading } = useSelector((state) => state.blogs);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchMine());
  }, [dispatch]);

  async function deletePost() {
    try {
      await http.delete(`/blogs/${target._id}`);
      dispatch(notify("Post deleted"));
      setTarget(null);
      dispatch(fetchMine());
    } catch (error) {
      dispatch(notify(getErrorMessage(error), "error"));
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-blue-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage and publish your amazing posts</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/editor" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </motion.div>
      </motion.div>

      {loading && (
        <motion.div 
          className="p-12 text-center"
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
            <span>Loading your posts...</span>
          </div>
        </motion.div>
      )}
      
      {!loading && mine.length === 0 && (
        <motion.div 
          className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.p 
            className="font-semibold text-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No posts yet
          </motion.p>
          <motion.p 
            className="text-slate-600 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Start creating your first post to share your thoughts!
          </motion.p>
        </motion.div>
      )}

      {mine.length > 0 && (
        <motion.div 
          className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-blue-50 to-blue-50 text-xs font-bold uppercase text-slate-700 border-b border-blue-100">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Updated</th>
                  <th className="px-6 py-4">Engagement</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <motion.tbody 
                className="divide-y divide-blue-50"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {mine.map((blog) => (
                  <motion.tr 
                    key={blog._id} 
                    className="hover:bg-blue-50 transition-colors duration-200"
                    variants={rowVariants}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900 max-w-xs truncate">{blog.title}</td>
                    <td className="px-6 py-4">
                      <motion.span 
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold capitalize border ${
                          blog.status === 'published' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {blog.status}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{new Date(blog.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <motion.span 
                          className="inline-flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-red-500">❤</span>
                          {blog.likes?.length || 0}
                        </motion.span>
                        <motion.span 
                          className="inline-flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-blue-500">💬</span>
                          {blog.comments?.length || 0}
                        </motion.span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link to={`/editor/${blog._id}`} className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200" title="Edit">
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </motion.div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTarget(blog)} 
                          className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-200" 
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      )}

      <ConfirmModal
        open={Boolean(target)}
        title="Delete post"
        message="This permanently removes the post and its comments."
        onCancel={() => setTarget(null)}
        onConfirm={deletePost}
      />
    </div>
  );
}
