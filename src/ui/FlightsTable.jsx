// path: src/ui/FlightsTable.jsx

import { useEffect, useState } from "react";

export default function FlightsTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([
      {
        id: "F-001",
        date: "2025-11-04",
        window: "06:00-10:00",
        site: "مدينة1",
        status: "scheduled",
      },
      {
        id: "F-002",
        date: "2025-11-05",
        window: "06:00-10:00",
        site: "مدينة2",
        status: "scheduled",
      },
    ]);
  }, []);

  const chip = (s) =>
    s === "scheduled"
      ? "chip chip-green"
      : s === "delayed"
      ? "chip chip-yellow"
      : "chip chip-gray";

  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">الرحلات المجدولة (موسمية)</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-dark">
          <thead>
            <tr className="text-left">
              <th className="py-2">#</th>
              <th>التاريخ</th>
              <th>النافذة</th>
              <th>الموقع</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-neutral-900 last:border-0"
              >
                <td className="py-2">{r.id}</td>
                <td>{r.date}</td>
                <td>{r.window}</td>
                <td>{r.site}</td>
                <td>
                  <span className={chip(r.status)}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
