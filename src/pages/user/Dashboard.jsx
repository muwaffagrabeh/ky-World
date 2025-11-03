// path: src/pages/user/Dashboard.jsx
import { useUserStore } from "../../store/userStore";

export default function UserDashboard() {
  const alerts = useUserStore((s) => s.alerts);

  const color = (lvl) =>
    lvl === "danger"
      ? "bg-red-900/30 text-red-300 border-red-700"
      : lvl === "warning"
      ? "bg-yellow-900/30 text-yellow-300 border-yellow-700"
      : "bg-blue-900/30 text-blue-300 border-blue-700";

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">لوحة المستخدم</h1>

      <div className="panel p-4">
        <div className="font-semibold mb-2">تنبيهاتك</div>
        <div className="space-y-2">
          {alerts.length === 0 && (
            <div className="text-sm muted">لا توجد تنبيهات حالياً.</div>
          )}
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`text-sm px-3 py-2 rounded-lg border ${color(
                a.level
              )}`}
            >
              <b className="mr-2">{new Date(a.at).toLocaleString()}</b>
              {a.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
