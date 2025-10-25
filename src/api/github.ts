
export async function fetchUserRepos(token: string) {
	const res = await fetch("https://api.github.com/user/repos", {
		headers: {
			Authorization: `token ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch repos");
	return await res.json();
}

export async function fetchRepoPRs(token: string, owner: string, repo: string) {
	const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
		headers: {
			Authorization: `token ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch PRs");
	return await res.json();
}
