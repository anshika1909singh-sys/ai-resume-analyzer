import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend authentication will be added later
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex lg:w-1/2 text-black items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-blue-700 flex items-center justify-center text-2xl text-white shadow-sm">
              📄
            </div>

            <div>
              <h2 className="text-xl font-bold text-black">
                AI Resume Analyzer
              </h2>

              <p className="text-sm text-black">
                Smart Resume Analysis
              </p>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-black leading-tight">
            Elevate your career with AI.
          </h1>

          <p className="mt-6 text-lg text-black leading-8">
            Upload your resume, compare it with the job description,
            receive ATS scores, AI suggestions, missing keywords,
            strengths, weaknesses and improve your chances of getting
            hired.
          </p>

          <div className="mt-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/public/images/resume-scan-2.gif"
              alt="Resume Preview"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-10">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 mx-auto">

          {/* LOGIN / SIGNUP */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-8">
            <Link
              to="/login"
              className="flex-1 text-center py-3 rounded-full bg-white shadow font-semibold text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="flex-1 text-center py-3 rounded-full text-gray-500 hover:text-black transition"
            >
              Signup
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-black">
            Welcome Back
          </h2>

          <p className="text-black mt-2 mb-8">
            Login to continue using AI Resume Analyzer.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 items-stretch"
          >
            <div className="w-full">
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="example@gmail.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="w-full">
              <div className="flex justify-between mb-2">
                <label className="font-medium">
                  Password
                </label>

                <button
                  type="button"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="********"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-xl py-3 font-semibold text-lg"
            >
              Login →
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t"></div>

            <span className="px-4 text-gray-400 text-sm">
              OR CONTINUE WITH
            </span>

            <div className="flex-grow border-t"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              className="border rounded-xl py-3 hover:bg-gray-100 transition font-medium bg-blue-600 text-white"
            >
              Google
            </button>

            <button
              className="border rounded-xl py-3 hover:bg-gray-100 transition font-medium bg-blue-600 text-white"
            >
              GitHub
            </button>

          </div>

          <p className="text-center mt-8 text-gray-500 text-sm">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

          <p className="text-center mt-4 text-sm text-gray-400">
            Need technical assistance?{" "}

            <a
              href="mailto:support@airesume.com"
              className="text-blue-600 hover:underline"
            >
              Contact Support
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}