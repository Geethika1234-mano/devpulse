import { useEffect, useState } from "react";

export function useAuth() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		// Try to get token from localStorage (set after login)
		const t = localStorage.getItem("github_token");
		if (t) setToken(t);
	}, []);

	return { token };
}
