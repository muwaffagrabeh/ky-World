// path: src/pages/Sites.jsx
import { useOutletContext } from "react-router-dom";
import { useMemo, useState } from "react";
import { demoCitiesInitial } from "../store/demoConfig";

function uid() {
  return "city-" + Math.random().toString(36).slice(2, 7);
}

export default function Sites() {
  const {
    /* siteId, seasonId, */
  } = useOutletContext();
  const [sites, setSites] = useState(demoCitiesInitial());
  const [q, setQ] = useState("");
  const [form, setForm] = useState(null);

  const filtered = useMemo(() => {
    const x = q.trim().toLowerCase();
    return x
      ? sites.filter((s) => [s.name, s.id].join(" ").toLowerCase().includes(x))
      : sites;
  }, [sites, q]);

  const openCreate = () =>
    setForm({
      mode: "create",
      data: {
        id: uid(),
        name: "مدينة جديدة",
        lat: 24.5,
        lon: 39.6,
        launchHeading: 110,
      },
    });
  const openEdit = (s) => setForm({ mode: "edit", data: { ...s } });
  const closeForm = () => setForm(null);

  const save = (e) => {
    e.preventDefault();
    const d = form.data;
    if (
      !d.name ||
      Number.isNaN(+d.lat) ||
      Number.isNaN(+d.lon) ||
      Number.isNaN(+d.launchHeading)
    ) {
      alert("تحقق من الحقول");
      return;
    }
    if (form.mode === "create")
      setSites((prev) => [
        ...prev,
        { ...d, lat: +d.lat, lon: +d.lon, launchHeading: +d.launchHeading },
      ]);
    else
      setSites((prev) =>
        prev.map((s) =>
          s.id === d.id
            ? {
                ...d,
                lat: +d.lat,
                lon: +d.lon,
                launchHeading: +d.launchHeading,
              }
            : s
        )
      );
    closeForm();
  };
  const remove = (id) => {
    if (!confirm("حذف نهائي؟")) return;
    setSites((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <h1 className="text-xl font-semibold">إدارة المواقع (المدينة)</h1>
        <div className="flex gap-2 w-full md:w-auto md:min-w-[520px]">
          <input
            className="input-dark text-sm flex-1 min-w-0"
            placeholder="بحث..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            onClick={openCreate}
            className="btn-dark text-sm px-4 shrink-0"
          >
            + إضافة موقع
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="py-2 px-2 text-right">#</th>
                <th className="py-2 px-2 text-right">الاسم</th>
                <th className="py-2 px-2 text-right">Latitude</th>
                <th className="py-2 px-2 text-right">Longitude</th>
                <th className="py-2 px-2 text-right">اتجاه الإقلاع°</th>
                <th className="py-2 px-2 text-right">إجراءات</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-neutral-900 last:border-0"
                >
                  <td className="py-2 px-2 text-right font-mono">{s.id}</td>
                  <td className="py-2 px-2 text-right">{s.name}</td>
                  <td className="py-2 px-2 text-right">{s.lat}</td>
                  <td className="py-2 px-2 text-right">{s.lon}</td>
                  <td className="py-2 px-2 text-right">
                    {s.jumpHeading ?? s.launchHeading}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="px-2 py-1 border border-neutral-700 rounded text-white hover:bg-neutral-800"
                        onClick={() => openEdit(s)}
                      >
                        تعديل
                      </button>
                      <button
                        className="px-2 py-1 border border-neutral-700 rounded text-white hover:bg-neutral-800"
                        onClick={() => remove(s.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="py-4 text-center text-neutral-400" colSpan={6}>
                    لا توجد مواقع.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {form && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center">
          <form onSubmit={save} className="panel p-4 w-full max-w-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                {form.mode === "create" ? "إضافة موقع" : "تعديل موقع"}
              </div>
              <button
                type="button"
                className="text-sm btn-ghost"
                onClick={closeForm}
              >
                إغلاق
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs muted">المعرّف (للربط)</label>
                <input
                  className="input-dark"
                  value={form.data.id}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      data: { ...f.data, id: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs muted">الاسم</label>
                <input
                  className="input-dark"
                  value={form.data.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      data: { ...f.data, name: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-xs muted">Latitude</label>
                <input
                  className="input-dark"
                  value={form.data.lat}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      data: { ...f.data, lat: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-xs muted">Longitude</label>
                <input
                  className="input-dark"
                  value={form.data.lon}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      data: { ...f.data, lon: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs muted">اتجاه الإقلاع (0–360)</label>
                <input
                  className="input-dark"
                  value={form.data.launchHeading}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      data: { ...f.data, launchHeading: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={closeForm}>
                إلغاء
              </button>
              <button className="btn-dark">
                {form.mode === "create" ? "إضافة" : "حفظ"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
