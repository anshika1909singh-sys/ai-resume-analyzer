import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import Navbar from "~/components/Navbar";

type AIResult = {
  overallScore: number;
  atsScore: number;
  contentScore: number;
  structureScore: number;
  skillsScore: number;
  strongPoints: string[];
  weakPoints: string[];
  suggestions: string[];
};

export function meta() {
  return [{ title: "Analysis - AI Resume" }];
}

export default function Analyze() {
  const loc = useLocation();
  const state = (loc.state || {}) as { fileName?: string; jobTitle?: string; jobDescription?: string };
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AIResult | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setResult({
        overallScore: 78,
        atsScore: 82,
        contentScore: 76,
        structureScore: 71,
        skillsScore: 84,
        strongPoints: ["Clear sectioning", "Relevant skills listed", "Professional summary present"],
        weakPoints: ["Missing measurable achievements", "Objective is vague", "No keywords for ATS"],
        suggestions: ["Add metrics to each work bullet", "Tailor skills to the job description", "Use active verbs and quantify results"],
      });
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500 text-slate-900">
      <Navbar />

      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[40px] bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Resume analysis</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Deep insights for your next application</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Review your resume performance with quick charts, strong/weak highlights, and actionable improvement steps.
                </p>
              </div>

              <div className="rounded-[32px] bg-slate-100 p-6 shadow-inner shadow-slate-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Overall score</p>
                    <p className="mt-2 text-5xl font-extrabold text-sky-700">{result ? result.overallScore : "--"}%</p>
                  </div>
                  <div className="relative h-28 w-28 rounded-full bg-slate-200">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: result
                          ? `conic-gradient(#0369a1 0 ${result.overallScore}%, #38bdf8 ${result.overallScore}% 100%)`
                          : "#f1f5f9",
                      }}
                    />
                    <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white text-center">
                      <div>
                        <span className="text-2xl font-bold text-slate-900">{result ? result.overallScore : "--"}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">Analyzed resume file: <span className="font-semibold text-slate-700">{state.fileName ?? "No file selected"}</span></p>
                <p className="mt-2 text-sm text-slate-500">Target role: <span className="font-semibold text-slate-700">{state.jobTitle ?? "Not provided"}</span></p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {result ? [
                { label: "ATS Fit", value: result.atsScore, color: "bg-sky-600" },
                { label: "Content", value: result.contentScore, color: "bg-cyan-500" },
                { label: "Structure", value: result.structureScore, color: "bg-violet-500" },
                { label: "Skills", value: result.skillsScore, color: "bg-indigo-500" },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}%</p>
                  <div className="mt-4 h-3 w-full rounded-full bg-slate-200">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              )) : null}
            </div>

            {loading && (
              <div className="mt-10 rounded-[32px] bg-slate-100 p-8 text-center text-slate-600 shadow-inner">
                Analyzing resume with AI… please wait.
              </div>
            )}

            {result && (
              <div className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <div className="space-y-8">
                  <div className="rounded-[32px] bg-slate-50 p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">Strong points</h2>
                    <ul className="mt-4 space-y-3 text-slate-700">
                      {result.strongPoints.map((point, idx) => (
                        <li key={idx} className="rounded-3xl bg-white p-4 shadow-sm">{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[32px] bg-slate-50 p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">Weak points</h2>
                    <ul className="mt-4 space-y-3 text-slate-700">
                      {result.weakPoints.map((point, idx) => (
                        <li key={idx} className="rounded-3xl bg-white p-4 shadow-sm text-red-600">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[32px] bg-slate-900 p-6 text-white shadow-lg">
                    <h2 className="text-2xl font-semibold">Action plan</h2>
                    <p className="mt-3 text-slate-300">Improve these areas first to boost your resume score and ATS visibility.</p>
                    <ol className="mt-5 space-y-3 text-slate-200">
                      {result.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="rounded-3xl bg-slate-800 p-4">{suggestion}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="rounded-[32px] bg-slate-50 p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-900">Next steps</h2>
                    <ul className="mt-4 space-y-3 text-slate-700">
                      <li className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm">
                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">1</span>
                        Add measurable achievements and quantify results.
                      </li>
                      <li className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm">
                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white">2</span>
                        Match the top skills to the job description.
                      </li>
                      <li className="flex items-start gap-3 rounded-3xl bg-white p-4 shadow-sm">
                        <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white">3</span>
                        Use stronger action verbs throughout your bullets.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
              <Link to="/upload" className="text-slate-700 underline hover:text-slate-900">Upload new resume</Link>
              <span>•</span>
              <Link to="/home" className="text-slate-700 underline hover:text-slate-900">Back to dashboard</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
