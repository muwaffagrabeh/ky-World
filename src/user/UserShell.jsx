// path: src/shell/UserShell.jsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isUserAuthed, logoutUser } from "../store/session";

export default function UserShell() {
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!isUserAuthed() && !/^\/u\/login(\/)?$/.test(loc.pathname)) {
      nav("/u/login", { replace: true });
    }
  }, [loc, nav]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-neutral-950 border-b border-neutral-800">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" className="h-12 w-auto" alt="logo" />
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <NavLink
                to="/u"
                end
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                لوحتي
              </NavLink>
              <NavLink
                to="/u/alerts"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                التنبيهات
              </NavLink>
              <NavLink
                to="/u/tickets"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                حجوزاتي
              </NavLink>
              <NavLink
                to="/u/book"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                حجز تذكرة
              </NavLink>
            </nav>
          </div>
          <button
            onClick={() => {
              logoutUser();
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
