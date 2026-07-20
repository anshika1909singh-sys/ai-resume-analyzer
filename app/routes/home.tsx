import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume" },
    { name: "description", content: "Welcome to AI Resume!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500">
      <Navbar />

      <section className="w-full bg-sky-100/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">Elevate your career with surgical precision.</h1>
            <p className="mx-auto mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              Our high-tech engine dissects your resume to reveal hidden opportunities and match you with your dream role.
            </p>
            <Link
              to="/upload"
              className="mt-8 inline-flex rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Upload your resume
            </Link>
          </div>

          <div className="mx-auto w-full max-w-7xl">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-8">Resume samples</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}