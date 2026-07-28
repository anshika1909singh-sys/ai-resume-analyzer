import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";

type AnalysisData = {
  overallScore: number;
  scores: {
    ats: number;
    content: number;
    structure: number;
    skills: number;
  };
  failed?: boolean;
  message?: string;
};

type Status = {
  type: "success" | "error";
  message: string;
};

type HistoryItem = {
  _id: string;
  originalName: string;
  jobTitle: string;
  jobDescription: string;
  analysis?: AnalysisData;
  createdAt: string;
};

const DEFAULT_ANALYSIS: AnalysisData = {
  overallScore: 0,
  scores: {
    ats: 0,
    content: 0,
    structure: 0,
    skills: 0,
  },
};

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingPdfId, setViewingPdfId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  async function loadHistory() {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your upload history.");
        return;
      }

      const response = await fetch("/api/resume/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Unable to load history.");
        return;
      }

      setHistory(data.history);
    } catch (error) {
      console.error(error);
      setError("Unable to load history.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function viewPdf(id: string) {
    setViewingPdfId(id);
    setError(null);
    setStatus(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to continue.");
        return;
      }

      const response = await fetch(`/api/resume/${id}/file`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unable to load PDF." }));
        setError(errorData.message || "Unable to load PDF.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
      setError("Unable to load PDF.");
    } finally {
      setViewingPdfId(null);
    }
  }

  async function deleteHistoryItem(id: string) {
    setDeletingId(id);
    setError(null);
    setStatus(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to continue.");
        return;
      }

      const response = await fetch(`/api/resume/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Unable to delete history item.");
        return;
      }

      setHistory((prev) => prev.filter((item) => item._id !== id));
      setStatus({ type: "success", message: "History item deleted." });
    } catch (error) {
      console.error(error);
      setError("Unable to delete history item.");
    } finally {
      setDeletingId(null);
      setOpenMenuId(null);
    }
  }

  async function deleteAllHistory() {
    setDeletingAll(true);
    setError(null);
    setStatus(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to continue.");
        return;
      }

      const response = await fetch("/api/resume/history", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Unable to clear history.");
        return;
      }

      setHistory([]);
      setStatus({ type: "success", message: "All history cleared." });
    } catch (error) {
      console.error(error);
      setError("Unable to clear history.");
    } finally {
      setDeletingAll(false);
      setConfirmClearAll(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500">
      <Navbar />

      <section className="w-full bg-sky-100/70 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-4xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900">Upload history</h1>
                <p className="mt-3 text-slate-600">Review all resumes you uploaded and the analysis results for each one.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmClearAll(true)}
                  disabled={deletingAll}
                  className="inline-flex rounded-full border border-red-300 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingAll ? "Clearing history..." : "Delete all history"}
                </button>
                <Link
                  to="/upload"
                  className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Upload new resume
                </Link>
              </div>
            </div>

            {status && (
              <div
                className={`mb-6 rounded-3xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {status.message}
              </div>
            )}

            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 shadow-sm">
                Loading history...
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 shadow-sm">
                {error}
              </div>
            ) : history.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 shadow-sm">
                No resume history yet. Upload your first resume to see the analysis here.
              </div>
            ) : (
              <div className="space-y-6">
                {history.map((resume) => {
                  const analysis = resume.analysis as AnalysisData | undefined;
                  const analysisFailed = analysis?.failed === true;
                  const displayedScores = analysisFailed ? DEFAULT_ANALYSIS.scores : analysis?.scores ?? DEFAULT_ANALYSIS.scores;
                  const displayedOverall = analysisFailed ? undefined : analysis?.overallScore;

                  return (
                    <div key={resume._id} className="relative rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setOpenMenuId(openMenuId === resume._id ? null : resume._id)}
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xl text-slate-700 shadow-sm transition hover:bg-slate-100"
                        aria-label="Open history actions"
                      >
                        ⋮
                      </button>

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between pr-12">
                        <div className="flex flex-col gap-3">
                          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Resume upload</p>
                          <h2 className="text-2xl font-semibold text-slate-900">{resume.jobTitle}</h2>
                          <p className="text-sm text-slate-500">Uploaded: {new Date(resume.createdAt).toLocaleString()}</p>
                          {analysisFailed && (
                            <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                              {analysis?.message ?? "Analysis unavailable"}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="rounded-full bg-white px-4 py-2 text-slate-600 shadow-sm">Overall {displayedOverall !== undefined ? `${displayedOverall}%` : "--"}</span>
                          <span className="rounded-full bg-white px-4 py-2 text-slate-600 shadow-sm">ATS {analysisFailed ? "--" : `${displayedScores.ats}%`}</span>
                          <span className="rounded-full bg-white px-4 py-2 text-slate-600 shadow-sm">Skills {analysisFailed ? "--" : `${displayedScores.skills}%`}</span>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm text-slate-500">Content score</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">
                            {analysisFailed ? "--" : `${displayedScores.content}%`}
                          </p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm text-slate-500">Structure score</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">
                            {analysisFailed ? "--" : `${displayedScores.structure}%`}
                          </p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm text-slate-500">Job description</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">{resume.jobDescription ? "Provided" : "Not provided"}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-700">Resume</p>
                              <p className="mt-2 text-slate-500">{resume.originalName}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => viewPdf(resume._id)}
                              disabled={viewingPdfId === resume._id}
                              className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {viewingPdfId === resume._id ? "Opening..." : "View PDF"}
                            </button>
                          </div>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-700">Analysis</p>
                              <p className="mt-2 text-sm text-slate-500">Open your resume analysis report.</p>
                            </div>
                            <Link
                              to={`/analyze?id=${resume._id}`}
                              className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Open analysis
                            </Link>
                          </div>
                        </div>
                      </div>

                      {openMenuId === resume._id && (
                        <div className="absolute right-4 top-16 z-10 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                          <button
                            type="button"
                            onClick={() => deleteHistoryItem(resume._id)}
                            disabled={deletingId === resume._id}
                            className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === resume._id ? "Deleting..." : "Delete history"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {confirmClearAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-900">Clear all history?</h2>
            <p className="mt-3 text-slate-600">This will permanently remove every upload and analysis record.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmClearAll(false)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteAllHistory}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {deletingAll ? "Clearing..." : "Clear all"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
