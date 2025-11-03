// path: src/store/userBookings.js
const KEY = "u_bookings_v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
function save(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function listBookings() {
  return load();
}

export function createBooking(payload) {
  const arr = load();
  const id = "T-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const row = {
    id,
    siteId: payload.siteId,
    siteName: payload.siteName,
    date: payload.date,
    start: payload.start,
    end: payload.end,
    pax: Number(payload.pax || 1),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  arr.unshift(row);
  save(arr);
  return row;
}

export function cancelBooking(id) {
  const arr = load().map((r) =>
    r.id === id ? { ...r, status: "cancelled" } : r
  );
  save(arr);
}

export function seedIfEmpty() {
  const arr = load();
  if (arr.length) return;
  save([
    {
      id: "T-DEMO1",
      siteId: "med-1",
      siteName: "مدينة1",
      date: new Date().toISOString().slice(0, 10),
      start: "06:30",
      end: "07:30",
      pax: 2,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    },
  ]);
}
