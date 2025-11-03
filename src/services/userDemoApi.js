// path: src/services/userDemoApi.js
const KEY = "user_notifications";

function readAll() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
function writeAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export const userDemoApi = {
  seedOnce() {
    if (readAll().length) return;
    writeAll([
      {
        id: "n1",
        title: "تم تأكيد حجزك",
        body: "رحلة 06:30 صباحًا يوم الجمعة.",
        ts: new Date().toISOString(),
        read: false,
      },
      {
        id: "n2",
        title: "تحديث حالة الطقس",
        body: "الرياح متوسطة مساء اليوم.",
        ts: new Date().toISOString(),
        read: true,
      },
    ]);
  },
  list() {
    return Promise.resolve(readAll());
  },
  markRead(id) {
    const list = readAll().map((n) => (n.id === id ? { ...n, read: true } : n));
    writeAll(list);
    return Promise.resolve();
  },
  clearAll() {
    writeAll([]);
    return Promise.resolve();
  },
};
