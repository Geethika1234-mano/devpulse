import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import RepoView from "../pages/RepoView";
import Analytics from "../pages/Analytics";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

// Simple auth check (replace with your real auth logic)
const isAuthenticated = () => !!localStorage.getItem("token");

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: isAuthenticated() ? <App /> : <Navigate to="/login" replace />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "repo/:owner/:name", element: <RepoView /> },
      { path: "analytics", element: <Analytics /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
