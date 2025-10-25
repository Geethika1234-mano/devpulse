export async function getPRReviewSuggestion(prTitle: string, prBody?: string) {
  const res = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prTitle, prBody }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to get review");
  }
  const data = await res.json();
  return data.review || "No review generated.";
}
