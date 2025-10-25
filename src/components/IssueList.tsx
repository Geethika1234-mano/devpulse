type Issue = { id: number; title: string; html_url: string; user: { login: string } };

export default function IssueList({ issues }: { issues: Issue[] }) {
  return (
    <ul className="space-y-3">
      {issues.map((i) => (
        <li key={i.id} className="border border-white/10 rounded-xl p-4 bg-white/5">
          <div className="font-semibold">{i.title}</div>
          <div className="text-sm text-zinc-400">by {i.user.login}</div>
          <a href={i.html_url} target="_blank" className="text-blue-400 text-sm hover:underline">
            View on GitHub
          </a>
        </li>
      ))}
    </ul>
  );
}
