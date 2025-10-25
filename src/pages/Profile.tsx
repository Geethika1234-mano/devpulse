import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface GithubUser {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  email?: string;
  blog?: string;
  twitter_username?: string;
}

interface GithubRepo {
  id: number;
  full_name: string;
  html_url: string;
  description?: string;
}

interface GithubOrg {
  id: number;
  login: string;
  avatar_url: string;
}

interface GithubEvent {
  type: string;
  repo?: { name: string };
  created_at: string;
}

export default function Profile() {
  const { token } = useAuth();
  const [user, setUser] = useState<GithubUser | null>(null);
  const [starred, setStarred] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orgs, setOrgs] = useState<GithubOrg[]>([]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      }).then((res) => res.json()),
      fetch("https://api.github.com/user/starred", {
        headers: { Authorization: `token ${token}` },
      }).then((res) => res.json()),
      fetch("https://api.github.com/user/orgs", {
        headers: { Authorization: `token ${token}` },
      }).then((res) => res.json()),
      fetch("https://api.github.com/users/me/events/public", {
        headers: { Authorization: `token ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([userData, starredData, orgsData, eventsData]) => {
        setUser(userData);
        setStarred(Array.isArray(starredData) ? starredData : []);
        setOrgs(Array.isArray(orgsData) ? orgsData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="text-zinc-300">Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center mb-8">
        <img src={user.avatar_url} alt="avatar" className="w-28 h-28 rounded-full border-4 border-blue-500 mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">{user.name || user.login}</h1>
        <div className="text-zinc-300 mb-6 text-center">{user.bio}</div>
        <div className="flex gap-8 text-center mb-4">
          <div>
            <div className="text-lg text-blue-400 font-bold">{user.public_repos}</div>
            <div className="text-zinc-400">Repos</div>
          </div>
          <div>
            <div className="text-lg text-blue-400 font-bold">{user.followers}</div>
            <div className="text-zinc-400">Followers</div>
          </div>
          <div>
            <div className="text-lg text-blue-400 font-bold">{user.following}</div>
            <div className="text-zinc-400">Following</div>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          {user.email && <a href={`mailto:${user.email}`} className="text-blue-400 hover:underline">Email</a>}
          {user.blog && <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blog</a>}
          {user.twitter_username && <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>}
        </div>
        <div className="text-zinc-500 text-xs mt-2">Joined: {new Date(user.created_at).toLocaleDateString()}</div>
      </div>
      {/* Organizations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Organizations</h2>
        {orgs.length === 0 ? (
          <div className="text-zinc-500">No organizations found.</div>
        ) : (
          <ul className="flex gap-4 flex-wrap">
            {orgs.map((org) => (
              <li key={org.id} className="flex items-center gap-2 bg-zinc-800 rounded-lg px-4 py-2">
                <img src={org.avatar_url} alt={org.login} className="w-8 h-8 rounded-full" />
                <span className="text-zinc-200 font-semibold">{org.login}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">Pinned Repositories</h2>
        {starred.length === 0 ? (
          <div className="text-zinc-500">No starred repos found.</div>
        ) : (
          <ul className="space-y-2">
            {starred.slice(0, 5).map((repo) => (
              <li key={repo.id} className="bg-zinc-800 rounded-lg p-4">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:underline">
                  {repo.full_name}
                </a>
                <div className="text-zinc-400 text-sm">{repo.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white mb-3">Recent Activity</h2>
        {events.length === 0 ? (
          <div className="text-zinc-500">No recent activity found.</div>
        ) : (
          <ul className="space-y-2">
            {events.slice(0, 5).map((event, idx) => (
              <li key={idx} className="bg-zinc-800 rounded-lg p-4">
                <div className="text-blue-400 font-semibold">{event.type}</div>
                <div className="text-zinc-400 text-sm">{event.repo?.name}</div>
                <div className="text-zinc-500 text-xs">{new Date(event.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

  );

}