import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchRepoPRs } from "../api/github";

type PR = {
  id: number;
  html_url: string;
  number: number;
  title: string;
  user: {
    login: string;
  };
};

export default function RepoCard({ owner, name, stars, forks }: { owner: string; name: string; stars: number; forks: number }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [prs, setPRs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchRepoPRs(token, owner, name)
      .then((data) => {
        setPRs(data);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, owner, name]);

  return (
    <div
      className="border border-zinc-700 rounded-xl p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/repo/${owner}/${name}`)}
    >
      <h2 className="font-semibold text-lg text-white mb-2 truncate">{name}</h2>
      <div className="flex items-center gap-4 text-zinc-400 text-sm mb-2">
        <span className="flex items-center gap-1"><span role="img" aria-label="stars">⭐</span> {stars}</span>
        <span className="flex items-center gap-1"><span role="img" aria-label="forks">🍴</span> {forks}</span>
      </div>
      <div className="mt-2">
        <div className="text-xs text-zinc-400 font-semibold mb-1">Pull Requests:</div>
        {loading && <div className="text-zinc-300">Loading PRs...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {prs.length === 0 && !loading && <div className="text-zinc-500">No open PRs</div>}
        <ul className="space-y-1">
          {prs.slice(0, 3).map((pr: PR) => (
            <li key={pr.id}>
              <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs">
                #{pr.number} {pr.title} <span className="text-zinc-400">by {pr.user.login}</span>
              </a>
            </li>
          ))}
        </ul>
        {prs.length > 3 && <div className="text-xs text-blue-400">...and {prs.length - 3} more</div>}
      </div>
    </div>
  );
}
