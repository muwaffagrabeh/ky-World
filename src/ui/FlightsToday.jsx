// path: src/ui/FlightsToday.jsx

import { useEffect, useState } from "react";

export default function FlightsToday({ site }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([
      {
        id: "F-001",
        window: "06:00–10:00",
        site: site.name,
        status: "scheduled",
      },
      {
        id: "F-002",
        window: "15:30–18:00",
        site: site.name,
        status: "scheduled",
      },
    ]);
  }, [site.name]);

  const chip = (s) =>
    s === "scheduled"
      ? "chip chip-green"
      : s === "delayed"
      ? "chip chip-yellow"
      : s === "cancelled"
      ? "chip chip-red"
      : "chip chip-gray";

  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">رحلات اليوم</div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between border border-neutral-800 rounded-lg p-2 bg-neutral-950"
          >
            <div className="text-sm">
              <div className="font-medium">{r.id}</div>
              <div className="muted">
                {r.site} • {r.window}
              </div>
            </div>
            <div className={chip(r.status)}>{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
