// path: src/services/demoApi.js
let flights = [
  {
    id: "F-001",
    siteId: "med-1",
    windowId: "w1",
    date: new Date().toISOString().slice(0, 10),
    start: "06:00",
    end: "07:30",
    status: "scheduled",
  },
  {
    id: "F-002",
    siteId: "med-2",
    windowId: "w2",
    date: new Date().toISOString().slice(0, 10),
    start: "15:30",
    end: "18:00",
    status: "scheduled",
  },
];
const uid = () => "F-" + Math.random().toString(36).slice(2, 6).toUpperCase();

export const demoApi = {
  async listFlights({ siteId }) {
    return flights.filter((f) => f.siteId === siteId);
  },
  async createFlight(data) {
    const row = { id: uid(), status: "scheduled", ...data };
    flights = [...flights, row];
    return row;
  },
  async updateFlight(id, data) {
    flights = flights.map((f) => (f.id === id ? { ...f, ...data } : f));
    return true;
  },
  async deleteFlight(id) {
    flights = flights.filter((f) => f.id !== id);
    return true;
  },
  async setStatus(id, status) {
    flights = flights.map((f) => (f.id === id ? { ...f, status } : f));
    return true;
  },
};
