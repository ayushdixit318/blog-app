import { LogOut, PenLine, Plus, UserRound } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "../store/authSlice.js";
import { notify } from "../store/toastSlice.js";

const navLink = ({ isActive }) =>
  `rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
    isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
  }`;

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await dispatch(logout());
    dispatch(notify("Signed out"));
    navigate("/");
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-blue-100/50 bg-gradient-to-r from-white via-blue-50/50 to-white shadow-sm backdrop-blur-md sticky top-0 z-40"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PenLine className="h-7 w-7 text-blue-600" />
          </motion.div>
          BlogForge
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLink}>
            Explore
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={navLink}>
                Dashboard
              </NavLink>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/editor"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  New
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLink}>
                Login
              </NavLink>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-slate-950 hover:to-slate-900 transition-all duration-200"
                >
                  <UserRound className="h-4 w-4" />
                  Join
                </Link>
              </motion.div>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
