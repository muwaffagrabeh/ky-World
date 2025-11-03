// path: src/app/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Splash from "../pages/Splash.jsx";

// Admin
import AppShell from "../shell/AppShell.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Flights from "../pages/Flights.jsx";
import Sites from "../pages/Sites.jsx";
import AdminLogin from "../pages/Login.jsx";

// User
import UserShell from "../shell/UserShell.jsx";
import UserHome from "../pages/user/Home.jsx";
import UserAlerts from "../pages/user/Alerts.jsx";
import UserLogin from "../pages/user/Login.jsx";
import Tickets from "../pages/user/Tickets.jsx";
import Book from "../pages/user/Book.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Splash /> },

  // Admin auth
  { path: "/login", element: <AdminLogin /> },

  // User auth
  { path: "/u/login", element: <UserLogin /> },

  // Admin app
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "flights", element: <Flights /> },
      { path: "sites", element: <Sites /> },
    ],
  },

  // User app
  {
    path: "/u",
    element: <UserShell />,
    children: [
      { index: true, element: <UserHome /> },
      { path: "alerts", element: <UserAlerts /> },
      { path: "tickets", element: <Tickets /> }, // ✅ إدارة الحجوزات
      { path: "book", element: <Book /> }, // ✅ إنشاء/حجز
    ],
  },
]);
