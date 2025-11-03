// path: src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import AppShell from "./shell/AppShell.jsx";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Flights from "./pages/Flights.jsx";
import Sites from "./pages/Sites.jsx";
import { isAuthed } from "./store/session.js";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/splash" replace /> },
  { path: "/splash", element: <Splash /> },
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "flights", element: <Flights /> },
      { path: "sites", element: <Sites /> },
    ],
  },
  {
    path: "*",
    element: isAuthed() ? <Navigate to="/app" /> : <Navigate to="/login" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
