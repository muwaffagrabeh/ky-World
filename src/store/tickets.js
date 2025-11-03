// path: src/store/tickets.js
const KEY = "u_tickets";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
export function listTickets() {
  return load();
}
export function createTicket({ fromCity, toCity, date, pax }) {
  const list = load();
  const id = "T-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const rec = {
    id,
    fromCity,
    toCity,
    date,
    pax: Number(pax || 1),
    status: "booked",
    createdAt: new Date().toISOString(),
  };
  list.unshift(rec);
  save(list);
  return rec;
}
export function cancelTicket(id) {
  const list = load().map((t) =>
    t.id === id ? { ...t, status: "cancelled" } : t
  );
  save(list);
  return list;
}
