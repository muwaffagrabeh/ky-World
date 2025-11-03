// path: src/pages/Dashboard.jsx
import { useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { demoCities, demoWindows } from "../store/demoConfig";
import { simulateWeather } from "../sim/weatherSim";
import { demoApi } from "../services/demoApi";

export default function Dashboard() {
  const { siteId, seasonId } = useOutletContext();
  const site = demoCities.find((c) => c.id === siteId);
  const windows = useMemo(
    () => demoWindows.filter((w) => w.siteId === siteId),
    [siteId]
  );

  const [wx, setWx] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    let tick = 0,
      stop = false;
    const loop = () => {
      if (stop) return;
      const w = simulateWeather({
        lat: site.lat,
        lon: site.lon,
        minuteTick: tick++,
      });
      setWx(w);
      setAlerts(w.alerts);
      setTimeout(loop, 2500);
    };
    loop();
    return () => {
      stop = true;
    };
  }, [siteId]);

  useEffect(() => {
    demoApi.listFlights({ siteId }).then(setFlights);
  }, [siteId]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-xl font-semibold">مراقبة الرحلات والطقس</h1>
        <div className="text-sm muted">
          الموقع: <b className="text-white">{site.name}</b> — الموسم:{" "}
          <b className="text-white">{seasonId}</b>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <WeatherPanel wx={wx} />
          <WindowsPanel windows={windows} />
        </div>
        <div className="space-y-4">
          <AlertsPanel items={alerts} />
          <FlightsToday flights={flights} />
        </div>
      </div>
    </div>
  );
}

function WeatherPanel({ wx }) {
  if (!wx) return <div className="h-32 panel animate-pulse" />;
  return (
    <div className="panel p-4">
      <div className="flex justify-between">
        <div className="font-semibold text-brand">الطقس الحالي</div>
        <div className="text-xs muted">{wx.time}</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm mt-2">
        <div>
          حرارة: <b>{wx.temperature}°C</b>
        </div>
        <div>
          رياح: <b>{wx.windspeed} kt</b>
        </div>
        <div>
          هبّات: <b>{wx.windgusts} kt</b>
        </div>
        <div>
          اتجاه: <b>{wx.winddirection}°</b>
        </div>
        <div>
          سحب: <b>{wx.cloudcover}%</b>
        </div>
        <div>
          هطول: <b>{wx.precipitation} mm/h</b>
        </div>
      </div>
    </div>
  );
}

function AlertsPanel({ items = [] }) {
  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">سجل التنبيهات</div>
      <div className="space-y-2">
        {items.length === 0 && (
          <div className="text-sm muted">لا توجد تنبيهات حالياً.</div>
        )}
        {items.map((a, i) => (
          <div
            key={i}
            className={
              "text-sm px-3 py-2 rounded-lg border " +
              (a.level === "danger"
                ? "bg-red-900/20 text-red-300 border-red-700"
                : a.level === "warning"
                ? "bg-yellow-900/20 text-yellow-300 border-yellow-700"
                : "bg-blue-900/20 text-blue-300 border-blue-700")
            }
          >
            {a.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

function WindowsPanel({ windows = [] }) {
  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">نوافذ الموسم</div>
      <div className="grid gap-2">
        {windows.map((w) => (
          <div
            key={w.id}
            className="flex items-center justify-between border border-neutral-800 rounded-lg p-2 text-sm bg-neutral-950"
          >
            <div>
              {w.label} — {w.start}–{w.end} • أيام: {w.days.join(",")}
            </div>
            <span className="chip chip-green">active</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlightsToday({ flights = [] }) {
  const chip = (s) =>
    s === "scheduled"
      ? "chip chip-green"
      : s === "ready"
      ? "chip chip-blue"
      : s === "launched"
      ? "chip chip-gray"
      : s === "delayed"
      ? "chip chip-yellow"
      : s === "cancelled"
      ? "chip chip-red"
      : "chip chip-gray";
  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">رحلات اليوم</div>
      <div className="space-y-2">
        {flights.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between border border-neutral-800 rounded-lg p-2 bg-neutral-950"
          >
            <div className="text-sm">
              <div className="font-medium">{r.id}</div>
              <div className="muted">
                {r.start}–{r.end}
              </div>
            </div>
            <div className={chip(r.status)}>{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
