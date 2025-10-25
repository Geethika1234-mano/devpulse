import PRList from "../components/PRList";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

export default function RepoView() {
  const { owner, name } = useParams();
  const { token } = useAuth();
  const [prs, setPRs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !owner || !name) return;
    setLoading(true);
    fetch(`https://api.github.com/repos/${owner}/${name}/pulls`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPRs(data);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, owner, name]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Repository: <span className="font-mono text-base text-zinc-400">{owner}/{name}</span></h2>
      <h3 className="text-lg font-semibold mb-2">Pull Requests</h3>
      {loading && <div className="text-zinc-300">Loading PRs...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <PRList prs={prs} />
    </div>
  );
}
