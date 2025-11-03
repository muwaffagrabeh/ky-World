// src/ui/AlertBanner.jsx

import { useEffect, useState } from "react";

export default function AlertsStream() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      {
        id: "a1",
        time: new Date().toLocaleTimeString(),
        level: "warning",
        msg: "سرعة الرياح ارتفعت إلى 16kt.",
      },
      {
        id: "a2",
        time: new Date(Date.now() - 600000).toLocaleTimeString(),
        level: "info",
        msg: "تم تحديث بيانات الطقس.",
      },
    ]);
  }, []);

  const color = (lvl) =>
    lvl === "danger"
      ? "bg-red-900/30 text-red-300 border-red-700"
      : lvl === "warning"
      ? "bg-yellow-900/30 text-yellow-300 border-yellow-700"
      : "bg-blue-900/30 text-blue-300 border-blue-700";

  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">سجل التنبيهات</div>
      <div className="space-y-2">
        {items.map((i) => (
          <div
            key={i.id}
            className={`text-sm px-3 py-2 rounded-lg border ${color(i.level)}`}
          >
            <b className="mr-2">{i.time}</b>
            {i.msg}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-sm muted">لا توجد تنبيهات حالياً.</div>
        )}
      </div>
    </div>
  );
}
