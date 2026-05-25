import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { register } from "../store/authSlice.js";
import { notify } from "../store/toastSlice.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await dispatch(register(form));
    if (register.fulfilled.match(result)) {
      dispatch(notify("Account created"));
      navigate("/dashboard");
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center py-12 px-4">
      <motion.div 
        className="w-full max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">Join us</h1>
          <p className="text-slate-600 text-sm mt-1">Create a new account to get started</p>
        </motion.div>
        <motion.form 
          onSubmit={handleSubmit} 
          className="mt-8 space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div custom={0} variants={inputVariants}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <motion.input
              required
              placeholder="Enter your name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          <motion.div custom={1} variants={inputVariants}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <motion.input
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          <motion.div custom={2} variants={inputVariants}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <motion.input
              type="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          {error && (
            <motion.p 
              className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
          <motion.button 
            disabled={loading} 
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition-all duration-200 shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Creating..." : "Create account"}
          </motion.button>
        </motion.form>
        <motion.p 
          className="mt-6 text-center text-sm text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Already have an account? <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/login">Sign in</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
