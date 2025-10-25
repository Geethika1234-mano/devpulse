import RepoCard from "../components/RepoCard";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchUserRepos } from "../api/github";

type User = {
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
};

type Repo = {
  id: number;
  name: string;
  owner: { login: string };
  stargazers_count: number;
  forks_count: number;
};

export default function Dashboard() {
  const { token } = useAuth();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      fetchUserRepos(token),
      fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([repoData, userData]) => {
        setRepos(repoData);
        setUser(userData);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  // Repo stats
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {user && (
        <div className="flex items-center gap-6 mb-8 bg-zinc-900 rounded-xl p-6 shadow-lg">
          <img src={user.avatar_url} alt="avatar" className="w-20 h-20 rounded-full border-2 border-blue-500" />
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name || user.login}</h2>
            <div className="text-zinc-400">{user.bio}</div>
            <div className="flex gap-4 mt-2 text-sm text-zinc-300">
              <span>Repos: {user.public_repos}</span>
              <span>Followers: {user.followers}</span>
              <span>Following: {user.following}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-8 mb-8">
        <div className="bg-zinc-800 rounded-lg p-4 flex-1 text-center">
          <div className="text-lg text-blue-400 font-bold">{totalStars}</div>
          <div className="text-zinc-400">Total Stars</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4 flex-1 text-center">
          <div className="text-lg text-blue-400 font-bold">{totalForks}</div>
          <div className="text-zinc-400">Total Forks</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-4 flex-1 text-center">
          <div className="text-lg text-blue-400 font-bold">{repos.length}</div>
          <div className="text-zinc-400">Repositories</div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Repositories</h2>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search repos..."
          className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-blue-500 w-64"
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos
          .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
          .map((r) => (
            <RepoCard key={r.id} owner={r.owner.login} name={r.name} stars={r.stargazers_count} forks={r.forks_count} />
          ))}
      </div>
    </div>
  );
}
