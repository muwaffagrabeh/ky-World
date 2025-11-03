// path: src/ui/SiteStatus.jsx
export default function SiteStatus({ site }) {
  return (
    <div className="panel p-4">
      <div className="font-semibold mb-2">حالة موقع الإقلاع</div>
      <div className="text-sm">
        اتجاه الإقلاع الموصى به: <b>{site.launchHeading}°</b> ± 45°
      </div>
      <div className="text-xs muted mt-1">
        الإحداثيات: {site.lat.toFixed(3)}, {site.lon.toFixed(3)}
      </div>
    </div>
  );
}
