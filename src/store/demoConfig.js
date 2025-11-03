// path: src/store/demoConfig.js
export const demoCities = [
  { id: "med-1", name: "مدينة١", lat: 24.47, lon: 39.61, launchHeading: 110 },
  { id: "med-2", name: "مدينة٢", lat: 24.52, lon: 39.7, launchHeading: 95 },
];
export function demoCitiesInitial() {
  return JSON.parse(JSON.stringify(demoCities));
}

export const demoSeasons = [
  { id: "winter-2025", name: "شتاء 2025" },
  { id: "winter-2026", name: "شتاء 2026" },
];

export const demoWindows = [
  {
    id: "w1",
    siteId: "city-1",
    label: "صباحي",
    start: "06:00",
    end: "10:00",
    days: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "w2",
    siteId: "city-2",
    label: "مسائي",
    start: "15:30",
    end: "18:30",
    days: [5, 6, 7],
  },
];
