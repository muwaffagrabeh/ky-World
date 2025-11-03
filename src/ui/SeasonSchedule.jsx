// path: src/ui/SeasonSchedule.jsx

import { useMemo } from "react";

export default function SeasonSchedule({ site, season }) {
  const windows = useMemo(
    () => [
      {
        id: "W-01",
        season: season.name,
        site: site.name,
        start: "06:00",
        end: "10:00",
        active: true,
      },
      {
        id: "W-02",
        season: season.name,
        site: site.name,
        start: "15:00",
        end: "18:30",
        active: true,
      },
    ],
    [site.name, season.name]
  );

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
              {w.site} • {w.season} — {w.start}–{w.end}
            </div>
            <span className={`chip ${w.active ? "chip-green" : "chip-gray"}`}>
              {w.active ? "active" : "paused"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
