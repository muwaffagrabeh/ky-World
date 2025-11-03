// path: src/pages/user/Book.jsx
import { useMemo, useState } from "react";
import { createBooking } from "../../store/userBookings";
import { demoCities, demoWindows } from "../../store/demoConfig";
import { useNavigate } from "react-router-dom";

export default function Book() {
  const nav = useNavigate();
  const [siteId, setSiteId] = useState(demoCities[0].id);
  const site = demoCities.find((c) => c.id === siteId);
  const windows = useMemo(
    () => demoWindows.filter((w) => w.siteId === siteId),
    [siteId]
  );

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    windowId: windows[0]?.id || "",
    start: windows[0]?.start || "06:00",
    end: windows[0]?.end || "07:30",
    pax: 1,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createBooking({
      siteId,
      siteName: site.name,
      date: form.date,
      start: form.start,
      end: form.end,
      pax: form.pax,
    });
    nav("/u/tickets", { replace: true });
  };

  return (
    <div className="panel p-4">
      <h1 className="text-lg font-semibold mb-3">حجز تذكرة</h1>
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-3">
        <label className="text-sm">
          الموقع
          <select
            className="input-dark mt-1"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
          >
            {demoCities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          التاريخ
          <input
            type="date"
            className="input-dark mt-1"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </label>

        <label className="text-sm">
          نافذة زمنية
          <select
            className="input-dark mt-1"
            value={form.windowId}
            onChange={(e) => {
              const w = windows.find((x) => x.id === e.target.value);
              setForm({
                ...form,
                windowId: e.target.value,
                start: w?.start || form.start,
                end: w?.end || form.end,
              });
            }}
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
            type="time"
            className="input-dark mt-1"
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
          />
        </label>

        <label className="text-sm">
          إلى
          <input
            type="time"
            className="input-dark mt-1"
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
          />
        </label>

        <label className="text-sm">
          عدد الأفراد
          <input
            type="number"
            min="1"
            className="input-dark mt-1"
            value={form.pax}
            onChange={(e) => setForm({ ...form, pax: e.target.value })}
          />
        </label>

        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
          <a href="/u/tickets" className="btn-ghost">
            رجوع
          </a>
          <button className="btn-dark">تأكيد الحجز</button>
        </div>
      </form>
    </div>
  );
}
