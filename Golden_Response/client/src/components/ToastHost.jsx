import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { dismiss } from "../store/toastSlice.js";

export default function ToastHost() {
  const toasts = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[min(92vw,380px)] flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 400, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex items-start justify-between gap-3 rounded-xl px-5 py-4 text-sm font-semibold shadow-lg border backdrop-blur-sm pointer-events-auto ${
              toast.tone === "error" 
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500/30" 
                : "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-500/30"
            }`}
          >
            <span>{toast.message}</span>
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              type="button" 
              onClick={() => dispatch(dismiss(toast.id))} 
              className="text-white/80 hover:text-white transition-colors" 
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
