import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { demoCities, demoSeasons } from "../store/demoConfig";
import { setCtx, getCtx } from "../store/demoCtx";
import { isAuthedAdmin, logoutAll } from "../store/session";

export default function AppShell() {
  const nav = useNavigate();
  const loc = useLocation();
  const [siteId, setSiteId] = useState(getCtx().siteId || demoCities[0].id);
  const [seasonId, setSeasonId] = useState(
    getCtx().seasonId || demoSeasons[0].id
  );

  useEffect(() => {
    if (!isAuthedAdmin()) nav("/login", { replace: true });
  }, [loc, nav]);

  useEffect(() => setCtx({ siteId, seasonId }), [siteId, seasonId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-neutral-950 border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Medinah" className="h-16 w-auto" />
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <NavLink
                to="/app"
                end
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/app/flights"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                Flights
              </NavLink>
              <NavLink
                to="/app/sites"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }
              >
                Sites
              </NavLink>
            </nav>
          </div>
          <button
            onClick={() => {
              logoutAll();
              nav("/login", { replace: true });
            }}
            className="px-3 py-2 rounded-lg text-sm border border-neutral-700 text-white hover:bg-neutral-900"
          >
            خروج
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet context={{ siteId, seasonId }} />
      </main>
    </div>
  );
}
