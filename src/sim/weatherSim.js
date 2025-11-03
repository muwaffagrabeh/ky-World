// path: src/sim/weatherSim.js
export function simulateWeather({ minuteTick = 0 }) {
  const rnd = (a, b) => Math.round((a + Math.random() * (b - a)) * 10) / 10;
  const t = new Date().toLocaleTimeString();
  const wind = rnd(5, 18),
    gust = wind + rnd(0, 10);
  const wx = {
    time: t,
    temperature: rnd(18, 32),
    windspeed: wind,
    windgusts: gust,
    winddirection: Math.floor(rnd(0, 360)),
    cloudcover: Math.floor(rnd(0, 100)),
    precipitation: Math.random() < 0.2 ? rnd(0, 2) : 0,
    alerts: [],
  };
  if (wx.windgusts > 25)
    wx.alerts.push({
      level: "danger",
      msg: "هبات الرياح > 25 عقدة. يُنصح بالتأجيل.",
    });
  else if (wx.windspeed > 15)
    wx.alerts.push({
      level: "warning",
      msg: "سرعة الرياح > 15 عقدة. راجع المسار.",
    });
  if (wx.precipitation > 1)
    wx.alerts.push({ level: "warning", msg: "هطول يتجاوز 1mm/h." });
  return wx;
}
