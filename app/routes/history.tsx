import { Link } from "react-router";
import Navbar from "~/components/Navbar";
import { resumes } from "~/constants";

export default function History() {
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
              <Link
                to="/upload"
                className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Upload new resume
              </Link>
            </div>

            <div className="space-y-6">
              {resumes.map((resume) => (
                <div key={resume.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-3">
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Resume upload</p>
                      <h2 className="text-2xl font-semibold text-slate-900">{resume.jobTitle}</h2>
                      <p className="text-sm text-slate-500">Company: {resume.companyName}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="rounded-full bg-white px-4 py-2 text-slate-600 shadow-sm">Overall {resume.feedback.overallScore}%</span>
                      <span className="rounded-full bg-white px-4 py-2 text-slate-600 shadow-sm">ATS {resume.feedback.ATS.score}%</span>
                      <span className="rounded-full bg-white px-4 py-2 text-slate-600 shadow-sm">Tone {resume.feedback.toneAndStyle.score}%</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Content score</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{resume.feedback.content.score}%</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Structure score</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{resume.feedback.structure.score}%</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Skills score</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{resume.feedback.skills.score}%</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-700">Latest analysis</p>
                      <p className="mt-2 text-slate-500">This section shows the latest resume analysis and detailed improvement areas.</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-700">Resume file</p>
                      <Link
                        to={resume.resumePath}
                        className="mt-2 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View PDF
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
