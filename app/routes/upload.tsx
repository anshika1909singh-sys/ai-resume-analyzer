import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";

export function meta() {
  return [{ title: "Upload Resume - AI Resume" }];
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    setFile(f ?? null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Navigate to analysis page and pass data via state
    navigate("/analyze", {
      state: {
        fileName: file?.name ?? "",
        jobTitle,
        jobDescription,
      },
    });
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500">
      <Navbar />
      <main className="container mx-auto p-6">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-center">Upload your resume</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <label className="block text-sm mb-1">Resume file</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="w-full border rounded p-2"
                />
                {file && <p className="text-sm mt-2">Selected: {file.name}</p>}
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1">Job title</label>
                <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full border rounded p-2" required />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1">Job description (optional)</label>
                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={6} className="w-full border rounded p-2" />
              </div>
              <div className="flex justify-center w-full">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Submit for analysis</button>
              </div>
            </form>
          </div>
        </main>
      </div>
  );
}
