// path: src/ui/AlertBanner.jsx

import { useEffect, useState } from "react";

export default function AlertsStream() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Mock: أحدث 3 تنبيهات
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
      ? "bg-red-50 text-red-800 border-red-200"
      : lvl === "warning"
      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
      : "bg-blue-50 text-blue-800 border-blue-200";

  return (
    <div className="bg-white rounded-xl border p-4">
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
          <div className="text-sm text-gray-500">لا توجد تنبيهات حالياً.</div>
        )}
      </div>
    </div>
  );
}
