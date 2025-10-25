import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

interface GithubUser {
  login: string;
  name?: string;
  avatar_url: string;
}

export default function Navbar() {
  const { token } = useAuth();
  const [user, setUser] = useState<GithubUser | null>(null);
  const logout = useLogout();

  useEffect(() => {
    if (!token) return;
    fetch("https://api.github.com/user", {
      headers: { Authorization: `token ${token}` },
    })
      .then((res) => res.json())
      .then(setUser);
  }, [token]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-semibold text-white">DevPulse</h1>
        <Link to="/" className="text-sm text-zinc-300 hover:text-blue-400 transition">Dashboard</Link>
        <Link to="/analytics" className="text-sm text-zinc-300 hover:text-blue-400 transition">Analytics</Link>
        <Link to="/profile" className="text-sm text-zinc-300 hover:text-blue-400 transition">Profile</Link>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2">
            <img src={user.avatar_url} alt="avatar" className="w-8 h-8 rounded-full border border-blue-500" />
            <span className="text-sm text-white font-semibold">{user.name || user.login}</span>
          </div>
        )}
        <button onClick={logout} className="text-sm text-zinc-300 hover:text-red-400 transition">Logout</button>
      </div>
    </nav>
  );
}
