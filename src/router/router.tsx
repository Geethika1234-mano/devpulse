import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import RepoView from "../pages/RepoView";
import Analytics from "../pages/Analytics";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  { path: "/", element: <App /> , children: [
      { index: true, element: <Dashboard /> },
      { path: "repo/:owner/:name", element: <RepoView /> },
      { path: "analytics", element: <Analytics /> },
    { path: "profile", element: <Profile /> },
    ]
  },
  { path: "/login", element: <Login /> },
]);
