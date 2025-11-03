// path: src/services/weather.js
const BASE = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: [
      "windspeed_10m",
      "windgusts_10m",
      "winddirection_10m",
      "cloudcover",
      "precipitation",
    ].join(","),
    current_weather: "true",
    timezone: "auto",
  });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error("weather fetch failed");
  const data = await res.json();
  return {
    raw: data,
    current: {
      temperature: data?.current_weather?.temperature ?? null,
      windspeed: data?.current_weather?.windspeed ?? null,
      windgusts: data?.hourly?.windgusts_10m?.[0] ?? null,
      winddirection: data?.current_weather?.winddirection ?? null,
      cloudcover: data?.hourly?.cloudcover?.[0] ?? null,
      precipitation: data?.hourly?.precipitation?.[0] ?? null,
      time: data?.current_weather?.time ?? null,
    },
  };
}

export function evaluateAlerts(c) {
  const alerts = [];
  if (c.windgusts && c.windgusts > 25)
    alerts.push({
      level: "danger",
      msg: "هبات الرياح > 25 عقدة. يُنصح بالتأجيل.",
    });
  if (c.windspeed && c.windspeed > 15)
    alerts.push({
      level: "warning",
      msg: "سرعة الرياح > 15 عقدة. راجع المسار.",
    });
  if (c.precipitation && c.precipitation > 1)
    alerts.push({ level: "warning", msg: "هطول يتجاوز 1mm/h." });
  return alerts;
}
