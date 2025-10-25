type PR = { id: number; title: string; html_url: string; user: { login: string }; updated_at: string };

import { useState } from "react";
import { getPRReviewSuggestion } from "../api/openaiReview";

type PRListProps = {
  prs: PR[];
};

export default function PRList({ prs }: PRListProps) {
  const [reviewedPR, setReviewedPR] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [loadingReview, setLoadingReview] = useState(false);

  const handleReview = async (pr: PR) => {
    setReviewedPR(pr.id);
    setLoadingReview(true);
    setReviewText("");
    try {
      const text = await getPRReviewSuggestion(pr.title);
      setReviewText(text);
    } catch {
      setReviewText("Error generating review. Please check your OpenAI API key.",);
    } finally {
      setLoadingReview(false);
    }
  };

  return (
    <ul className="space-y-3">
      {prs.map((p: PR) => (
        <li key={p.id} className="border border-white/10 rounded-xl p-4 bg-white/5">
          <div className="font-semibold">{p.title}</div>
          <div className="text-sm text-zinc-400">
            #{p.id} by {p.user.login} · {new Date(p.updated_at).toLocaleString()}
          </div>
          <a href={p.html_url} target="_blank" className="text-blue-400 text-sm hover:underline">
            View on GitHub
          </a>
          <button
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
            onClick={() => handleReview(p)}
            disabled={loadingReview && reviewedPR === p.id}
          >
            {loadingReview && reviewedPR === p.id ? "Generating..." : "AI Review Suggestion"}
          </button>
          {reviewedPR === p.id && (
            <div className="mt-3 p-3 bg-zinc-800 rounded text-zinc-200 text-sm whitespace-pre-line">
              {loadingReview ? "Generating review..." : reviewText}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
