// path: src/ui/WeatherNow.jsx
import { useEffect, useState } from "react";
import { fetchWeather, evaluateAlerts } from "../services/weather";

export default function WeatherNow({ site }) {
  const [state, setState] = useState({
    loading: true,
    current: null,
    alerts: [],
  });

  async function load() {
    try {
      const { current } = await fetchWeather(site.lat, site.lon);
      setState({ loading: false, current, alerts: evaluateAlerts(current) });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [site.lat, site.lon]);

  if (state.loading) {
    return <div className="animate-pulse h-32 panel" />;
  }

  const c = state.current;
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-brand">الطقس الحالي</div>{" "}
        <div className="text-xs muted">{c?.time || "--"}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
        <div>
          حرارة: <b>{c?.temperature ?? "--"}°C</b>
        </div>
        <div>
          رياح: <b>{c?.windspeed ?? "--"} kt</b>
        </div>
        <div>
          هبّات: <b>{c?.windgusts ?? "--"} kt</b>
        </div>
        <div>
          اتجاه: <b>{c?.winddirection ?? "--"}°</b>
        </div>
        <div>
          سحب: <b>{c?.cloudcover ?? "--"}%</b>
        </div>
        <div>
          هطول: <b>{c?.precipitation ?? "--"} mm/h</b>
        </div>
      </div>

      {state.alerts.length > 0 && (
        <div className="mt-3 space-y-2">
          {state.alerts.map((a, i) => (
            <div
              key={i}
              className={
                "text-sm px-3 py-2 rounded-lg border " +
                (a.level === "danger"
                  ? "bg-red-900/30 text-red-300 border-red-700"
                  : a.level === "warning"
                  ? "bg-yellow-900/30 text-yellow-300 border-yellow-700"
                  : "bg-blue-900/30 text-blue-300 border-blue-700")
              }
            >
              {a.msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
