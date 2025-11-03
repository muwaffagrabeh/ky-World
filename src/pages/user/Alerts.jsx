// src/pages/user/Alerts.jsx
import { useEffect, useState } from "react";

export default function UserAlerts() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([
      { id: 1, msg: "تم تأكيد حجزك للرحلة F-001" },
      { id: 2, msg: "تحديث حالة الطقس لمنطقتك" },
    ]);
  }, []);
  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">التنبيهات</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="chip chip-gray">
            {i.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
