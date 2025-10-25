import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchUserRepos } from "./api/github";

type Repo = {
  id: number;
  name: string;
  owner: { login: string };
  stargazers_count: number;
  forks_count: number;
};

export default function App() {
  const { token } = useAuth();
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    if (!token) return;
    fetchUserRepos(token)
      .then((data: Repo[]) => setRepos(data))
      .catch(() => setRepos([]));
  }, [token]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex">
      <Sidebar repos={repos} />
      <div className="flex-1 flex flex-col h-screen">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
