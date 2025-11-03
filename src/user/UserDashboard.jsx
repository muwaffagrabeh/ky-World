// path: src/user/UserDashboard.jsx
import { useEffect, useState } from "react";
import { userDemoApi } from "../services/userDemoApi";

export default function UserDashboard() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    userDemoApi.list().then((x) => setNotifs(x.slice(0, 3)));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">مرحبًا بك 👋</h1>

      <div className="panel p-4">
        <div className="font-semibold mb-2">أحدث التنبيهات</div>
        <div className="space-y-2">
          {notifs.length === 0 && (
            <div className="muted text-sm">لا توجد تنبيهات.</div>
          )}
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`text-sm px-3 py-2 rounded-lg border bg-neutral-950 border-neutral-800 ${
                n.read ? "text-neutral-300" : "text-white"
              }`}
            >
              <b className="text-brand">{n.title}</b>
              <div className="muted text-xs">
                {new Date(n.ts).toLocaleString()}
              </div>
              <div>{n.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
