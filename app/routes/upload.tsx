import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";

export function meta() {
  return [{ title: "Upload Resume - AI Resume" }];
}

type Status = {
  type: "success" | "error";
  message: string;
};

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    setFile(f ?? null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setStatus({ type: "error", message: "Please select a resume file." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus({ type: "error", message: "You need to log in first." });
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.message || "Upload failed." });
        setLoading(false);
        return;
      }

      navigate("/analyze", {
        state: {
          resumeId: data.resume._id,
        },
      });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Unable to upload resume." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500">
      <Navbar />
      <main className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Upload your resume</h2>

          {status && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-700"
              } mb-4`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <label className="block text-sm mb-1">Resume file</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFile}
                className="w-full border rounded p-2"
                disabled={loading}
              />
              {file && <p className="text-sm mt-2">Selected: {file.name}</p>}
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">Job title</label>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full border rounded p-2"
                required
                disabled={loading}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm mb-1">Job description (optional)</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="w-full border rounded p-2"
                disabled={loading}
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-full px-6 py-2 text-white transition ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Submitting for analysis..." : "Submit for analysis"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg
                className="h-10 w-10 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                <path d="M22 12a10 10 0 0 1-10 10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Resume under analysis</h3>
            <p className="mt-3 text-sm text-slate-600">
              We are analyzing your resume and creating a personalized report. This may take a moment, so please do not refresh or click again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
