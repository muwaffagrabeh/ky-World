// path: src/pages/Flights.jsx
import { useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { demoApi } from "../services/demoApi";
import { demoWindows } from "../store/demoConfig";
const labelFromId = (id, list) => list.find((w) => w.id === id)?.label || id;

export default function Flights() {
  const { siteId } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const windows = useMemo(
    () => demoWindows.filter((w) => w.siteId === siteId),
    [siteId]
  );

  const load = () => demoApi.listFlights({ siteId }).then(setRows);
  useEffect(() => {
    load();
  }, [siteId]);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-xl font-semibold">الرحلات</h1>
        <button
          onClick={() =>
            setEditing({
              siteId,
              windowId: windows[0]?.id || "",
              date: today(),
              start: "06:00",
              end: "07:30",
            })
          }
          className="btn-dark text-sm"
        >
          + إضافة رحلة
        </button>
      </div>

      <div className="panel p-4 overflow-x-auto">
        <table className="w-full text-sm table-dark">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="py-2 px-2 text-right">#</th>
              <th className="py-2 px-2 text-right">التاريخ</th>
              <th className="py-2 px-2 text-right">النافذة</th>
              <th className="py-2 px-2 text-right">الوقت</th>
              <th className="py-2 px-2 text-right">الحالة</th>
              <th className="py-2 px-2 text-right">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-neutral-900 last:border-0"
              >
                <td className="py-2 px-2 text-right font-mono">{r.id}</td>
                <td className="py-2 px-2 text-right">{r.date}</td>
                <td className="py-2 px-2 text-right">
                  {labelFromId(r.windowId, windows)}
                </td>
                <td className="py-2 px-2 text-right">
                  {r.start}–{r.end}
                </td>
                <td className="py-2 px-2 text-right">
                  <StatusChip s={r.status} />
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="btn-ghost text-xs"
                      onClick={() => setEditing(r)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn-ghost text-xs"
                      onClick={() => demoApi.deleteFlight(r.id).then(load)}
                    >
                      حذف
                    </button>
                    <DropActions id={r.id} reload={load} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal
          row={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
          windows={windows}
        />
      )}
    </div>
  );
}

function StatusChip({ s }) {
  const cls =
    s === "scheduled"
      ? "chip chip-green"
      : s === "ready"
      ? "chip chip-gray"
      : s === "launched"
      ? "chip chip-gray"
      : s === "delayed"
      ? "chip chip-yellow"
      : s === "cancelled"
      ? "chip chip-red"
      : "chip chip-gray";
  return <span className={cls}>{s}</span>;
}
function DropActions({ id, reload }) {
  const set = (s) => demoApi.setStatus(id, s).then(reload);
  return (
    <span className="inline-flex gap-1">
      <button className="btn-ghost text-xs" onClick={() => set("ready")}>
        جاهز
      </button>
      <button className="btn-ghost text-xs" onClick={() => set("launched")}>
        إطلاق
      </button>
      <button className="btn-ghost text-xs" onClick={() => set("completed")}>
        إكمال
      </button>
      <button className="btn-ghost text-xs" onClick={() => set("delayed")}>
        تأجيل
      </button>
      <button className="btn-ghost text-xs" onClick={() => set("cancelled")}>
        إلغاء
      </button>
    </span>
  );
}
function EditModal({ row, onClose, onSaved, windows }) {
  const [form, setForm] = useState(row);
  const save = async () => {
    if (row.id) await demoApi.updateFlight(row.id, form);
    else await demoApi.createFlight(form);
    onSaved();
  };
  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="panel p-4 w-full max-w-md space-y-3">
        <div className="font-semibold">تفاصيل الرحلة</div>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm">
            التاريخ
            <input
              className="input-dark"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </label>
          <label className="text-sm">
            النافذة
            <select
              className="input-dark"
              value={form.windowId || ""}
              onChange={(e) => setForm({ ...form, windowId: e.target.value })}
            >
              {windows.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.label} ({w.start}-{w.end})
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            من
            <input
              className="input-dark"
              type="time"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
            />
          </label>
          <label className="text-sm">
            إلى
            <input
              className="input-dark"
              type="time"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
            />
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-ghost">
            إلغاء
          </button>
          <button onClick={save} className="btn-dark">
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
}
function today() {
  return new Date().toISOString().slice(0, 10);
}
