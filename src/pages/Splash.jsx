// path: src/pages/Splash.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthedAdmin, isAuthedUser, lastRole } from "../store/session";

export default function Splash() {
  const nav = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      if (lastRole() === "admin" && isAuthedAdmin()) {
        nav("/app", { replace: true });
      } else if (lastRole() === "user" && isAuthedUser()) {
        nav("/u", { replace: true });
      } else {
        nav("/login", { replace: true }); // الافتراضي: الأدمن
      }
    }, 900);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="min-h-screen bg-black text-white grid place-items-center">
      <div className="text-center fade-in">
        {/* الشعار بحجمه الطبيعي مع حدود أمان للشاشة */}
        <img
          src="/sp.png"
          alt="logo"
          className="mx-auto w-auto h-auto max-w-[85vw] max-h-[60vh]"
        />
        <div className="mt-3 text-brand text-2xl md:text-3xl font-semibold">
          Medinah Sky-World Avenue
        </div>
      </div>
    </div>
  );
}
