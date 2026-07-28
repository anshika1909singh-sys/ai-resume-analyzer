import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

type Status = {
  type: "success" | "error";
  message: string;
};

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<Status | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setStatus({ type: "error", message: "Passwords do not match!" });
    return;
  }

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: data.message || "Signup failed." });
      return;
    }

    // Store authentication data immediately after signup
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("auth", "true");
      window.dispatchEvent(new Event("authChange"));
    }

    setStatus({ type: "success", message: data.message || "Account created successfully." });

    setTimeout(() => {
      navigate("/home");
    }, 400);
  } catch (error) {
    console.error(error);
    setStatus({ type: "error", message: "Unable to connect to server." });
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-sky-200 via-sky-300 to-sky-500">
      {/* LEFT SIDE */}
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
            Create your professional account.
          </h1>

          <p className="mt-6 text-lg text-black leading-8">
            Join thousands of job seekers using AI to improve their resumes,
            increase ATS scores, and land better interviews.
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

      {/* RIGHT SIDE */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-10">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 mx-auto">

          {/* LOGIN / SIGNUP SWITCH */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-8">
            <Link
              to="/"
              className="flex-1 text-center py-3 rounded-full text-gray-500 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="flex-1 text-center py-3 rounded-full bg-white shadow font-semibold text-blue-600"
            >
              Signup
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold text-black">
                Create Account
              </h2>

              <p className="text-black mt-2 mb-8">
                Sign up to start analyzing your resumes.
              </p>
            </div>
          </div>

          {status ? (
            <div
              className={`rounded-3xl p-4 mb-6 text-sm border ${
                status.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 items-stretch"
          >
            <div className="w-full">
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="********"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-xl py-3 font-semibold text-lg"
            >
              Create Account →
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="text-center mt-4 text-sm text-gray-400">
            By signing up, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}