// path: src/store/userStore.js
import { create } from "zustand";

const persistKey = "user_store_v1";

// حالات التذكرة: open | confirmed | cancelled | closed
const initial = {
  alerts: [
    {
      id: "al-1",
      level: "info",
      msg: "تم تفعيل حسابك بنجاح.",
      at: new Date().toISOString(),
    },
    {
      id: "al-2",
      level: "warning",
      msg: "الطقس متقلب غداً صباحاً.",
      at: new Date().toISOString(),
    },
  ],
  tickets: [
    {
      id: "tk-1001",
      route: "المدينة → العلا",
      date: "2025-11-08",
      passengers: 2,
      notes: "مقعدين متجاورين",
      status: "open",
    },
  ],
};

export const useUserStore = create((set, get) => {
  // تحميل من localStorage (بساطة)
  let seed = initial;
  try {
    const raw = localStorage.getItem(persistKey);
    if (raw) seed = JSON.parse(raw);
  } catch {}

  const persist = () => {
    const { alerts, tickets } = get();
    localStorage.setItem(persistKey, JSON.stringify({ alerts, tickets }));
  };

  return {
    alerts: seed.alerts,
    tickets: seed.tickets,

    addAlert: (a) =>
      set((s) => {
        const alerts = [
          {
            ...a,
            id: a.id || crypto.randomUUID(),
            at: a.at || new Date().toISOString(),
          },
          ...s.alerts,
        ].slice(0, 50);
        const next = { ...s, alerts };
        localStorage.setItem(
          persistKey,
          JSON.stringify({ alerts, tickets: s.tickets })
        );
        return next;
      }),

    addTicket: (t) =>
      set((s) => {
        const ticket = { id: crypto.randomUUID(), status: "open", ...t };
        const tickets = [ticket, ...s.tickets];
        const next = { ...s, tickets };
        localStorage.setItem(
          persistKey,
          JSON.stringify({ alerts: s.alerts, tickets })
        );
        return next;
      }),

    updateTicket: (id, patch) =>
      set((s) => {
        const tickets = s.tickets.map((x) =>
          x.id === id ? { ...x, ...patch } : x
        );
        const next = { ...s, tickets };
        localStorage.setItem(
          persistKey,
          JSON.stringify({ alerts: s.alerts, tickets })
        );
        return next;
      }),

    setStatus: (id, status) =>
      set((s) => {
        const tickets = s.tickets.map((x) =>
          x.id === id ? { ...x, status } : x
        );
        const next = { ...s, tickets };
        localStorage.setItem(
          persistKey,
          JSON.stringify({ alerts: s.alerts, tickets })
        );
        return next;
      }),

    cancelTicket: (id) => get().setStatus(id, "cancelled"),
    closeTicket: (id) => get().setStatus(id, "closed"),
  };
});
