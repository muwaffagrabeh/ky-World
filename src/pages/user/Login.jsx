// path: src/pages/user/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/session";

export default function UserLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("user@demo");
  const [password, setPassword] = useState("user123");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!email.trim() || !password.trim()) {
      setErr("الرجاء إدخال البريد وكلمة المرور.");
      return;
    }
    if (email !== "user@demo" || password !== "user123") {
      setErr("بيانات الدخول غير صحيحة (جرّب user@demo / user123).");
      return;
    }

    loginUser();
    nav("/u", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-black text-white">
      <form onSubmit={onSubmit} className="panel p-6 w-full max-w-sm space-y-5">
        <div className="text-center">
          <img src="/logo.png" alt="Medinah" className="h-24 w-auto mx-auto" />
          <h1 className="mt-2 text-lg font-semibold">تسجيل دخول المستخدم</h1>
          <p className="text-xs text-neutral-400 mt-1">
            أدخل بياناتك ثم اضغط دخول.
          </p>
        </div>

        {err && (
          <div className="text-sm px-3 py-2 rounded-lg border border-red-700 bg-red-900/30 text-red-300">
            {err}
          </div>
        )}

        <label className="block text-sm">
          <span className="text-neutral-300">البريد الإلكتروني</span>
          <input
            className="input-dark mt-1"
            type="email"
            dir="ltr"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </label>

        <label className="block text-sm">
          <span className="text-neutral-300">كلمة المرور</span>
          <div className="mt-1 flex items-stretch gap-2">
            <input
              className="input-dark flex-1"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn-ghost text-xs px-3"
              onClick={() => setShowPwd((v) => !v)}
              aria-label="إظهار/إخفاء كلمة المرور"
            >
              {showPwd ? "إخفاء" : "إظهار"}
            </button>
          </div>
        </label>

        <div className="flex items-center justify-between text-xs text-neutral-400">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="accent-brand" />
            تذكرني
          </label>
          <span className="opacity-70">نسخة تجريبية</span>
        </div>

        <button className="btn-dark w-full">دخول</button>

        <div className="text-xs text-neutral-500 text-center">
          جرّب: user@demo / user123
        </div>
      </form>
    </div>
  );
}
