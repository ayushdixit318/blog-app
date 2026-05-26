import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import ToastHost from "./components/ToastHost.jsx";
import { fetchMe } from "./store/authSlice.js";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <ToastHost />
    </div>
  );
}
