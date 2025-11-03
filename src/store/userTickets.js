// src/store/userTickets.js

let mem = JSON.parse(localStorage.getItem("u_tickets") || "[]");

function save() {
  localStorage.setItem("u_tickets", JSON.stringify(mem));
}

export const userTickets = {
  list() {
    return Promise.resolve(
      [...mem].sort((a, b) => b.created_at.localeCompare(a.created_at))
    );
  },
  create({ cityId, date, window, pax }) {
    const id = "T-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const row = {
      id,
      cityId,
      date,
      window,
      pax,
      status: "pending_payment",
      created_at: new Date().toISOString(),
    };
    mem.push(row);
    save();
    return Promise.resolve(row);
  },
  cancel(id) {
    mem = mem.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t));
    save();
    return Promise.resolve(true);
  },
  pay(id) {
    mem = mem.map((t) => (t.id === id ? { ...t, status: "confirmed" } : t));
    save();
    return Promise.resolve(true);
  },
};
