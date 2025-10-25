import { Link } from "react-router-dom";

type Repo = {
  id: number;
  name: string;
  owner: { login: string };
};

export default function Sidebar({ repos }: { repos: Repo[] }) {
  return (
    <aside className="w-64 border-r border-white/10 bg-white/5 p-4 h-screen overflow-y-auto">
      <div className="font-semibold text-zinc-300 mb-3">Repositories</div>
      {repos.length === 0 ? (
        <div className="text-sm text-zinc-500">Your repo list will appear here.</div>
      ) : (
        <ul className="space-y-2">
          {repos.map((repo) => (
            <li key={repo.id}>
              <Link
                to={`/repo/${repo.owner.login}/${repo.name}`}
                className="block text-sm text-zinc-200 hover:text-blue-400 px-2 py-1 rounded transition truncate"
                title={repo.name}
              >
                {repo.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
