// path: src/user/UserNotifications.jsx
import { useEffect, useState } from "react";
import { userDemoApi } from "../services/userDemoApi";

export default function UserNotifications() {
  const [items, setItems] = useState([]);

  const load = () => userDemoApi.list().then(setItems);
  useEffect(() => {
    load();
  }, []);

  const mark = async (id) => {
    await userDemoApi.markRead(id);
    load();
  };

  const clearAll = async () => {
    await userDemoApi.clearAll();
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-xl font-semibold">التنبيهات</h1>
        <button className="btn-ghost text-sm" onClick={clearAll}>
          تفريغ الكل
        </button>
      </div>

      <div className="panel p-4">
        <div className="space-y-2">
          {items.length === 0 && (
            <div className="muted text-sm">لا توجد تنبيهات.</div>
          )}
          {items.map((n) => (
            <div
              key={n.id}
              className="flex items-start justify-between border border-neutral-800 rounded-lg p-3 bg-neutral-950"
            >
              <div>
                <div className="font-semibold text-brand">{n.title}</div>
                <div className="muted text-xs">
                  {new Date(n.ts).toLocaleString()}
                </div>
                <div className="text-sm">{n.body}</div>
              </div>
              {!n.read ? (
                <button
                  className="btn-ghost text-xs"
                  onClick={() => mark(n.id)}
                >
                  تعليم كمقروء
                </button>
              ) : (
                <span className="chip chip-gray text-xs">مقروء</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
