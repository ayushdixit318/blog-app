import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-red-100"
      >
        <motion.div 
          className="flex items-start gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <motion.div 
            className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-red-100 to-red-50 text-red-600 flex-shrink-0"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AlertTriangle className="h-6 w-6" />
          </motion.div>
          <div>
            <h2 className="text-xl font-black text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
          </div>
        </motion.div>
        <motion.div 
          className="mt-8 flex justify-end gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button" 
            onClick={onCancel} 
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button" 
            onClick={onConfirm} 
            className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
          >
            Delete
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
