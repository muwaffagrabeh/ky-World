// path: src/shell/UserShell.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthedUser, logoutAll } from "../store/session";

export default function UserShell() {
  const nav = useNavigate();

  // حراسة دخول المستخدم
  useEffect(() => {
    if (!isAuthedUser()) nav("/u/login", { replace: true });
  }, [nav]);

  const linkCls = ({ isActive }) =>
    isActive ? "text-white" : "text-neutral-400 hover:text-white";

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-neutral-950 border-b border-neutral-800">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" className="h-12 w-auto" alt="logo" />
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <NavLink to="/u" end className={linkCls}>
                لوحتي
              </NavLink>
              <NavLink to="/u/alerts" className={linkCls}>
                التنبيهات
              </NavLink>

              {/* ✅ روابط الحجوزات */}
              <NavLink to="/u/tickets" className={linkCls}>
                حجوزاتي
              </NavLink>
              <NavLink to="/u/book" className={linkCls}>
                حجز تذكرة
              </NavLink>
            </nav>
          </div>

          <button
            onClick={() => {
              logoutAll();
              nav("/u/login", { replace: true });
            }}
            className="px-3 py-2 rounded-lg text-sm border border-neutral-700"
          >
            خروج
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
