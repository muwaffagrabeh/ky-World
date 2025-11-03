// path: src/pages/user/Tickets.jsx
import { useEffect, useState } from "react";
import {
  listBookings,
  cancelBooking,
  seedIfEmpty,
} from "../../store/userBookings";

export default function Tickets() {
  const [rows, setRows] = useState([]);

  const load = () => setRows(listBookings());
  useEffect(() => {
    seedIfEmpty();
    load();
  }, []);

  const chip = (s) =>
    s === "confirmed"
      ? "chip chip-green"
      : s === "pending"
      ? "chip chip-yellow"
      : s === "cancelled"
      ? "chip chip-red"
      : "chip chip-gray";

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">حجوزاتي</h1>
        <a href="/u/book" className="btn-dark text-sm">
          + حجز تذكرة
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm table-dark">
          <thead>
            <tr className="text-right">
              <th className="py-2">#</th>
              <th>الموقع</th>
              <th>التاريخ</th>
              <th>الوقت</th>
              <th>أفراد</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-neutral-900 last:border-0"
              >
                <td className="py-2">{r.id}</td>
                <td>{r.siteName}</td>
                <td>{r.date}</td>
                <td>
                  {r.start}–{r.end}
                </td>
                <td>{r.pax}</td>
                <td>
                  <span className={chip(r.status)}>{r.status}</span>
                </td>
                <td>
                  {r.status !== "cancelled" && (
                    <button
                      className="btn-ghost text-xs"
                      onClick={() => {
                        cancelBooking(r.id);
                        load();
                      }}
                    >
                      إلغاء
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="py-6 text-center muted" colSpan={7}>
                  لا توجد حجوزات.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
