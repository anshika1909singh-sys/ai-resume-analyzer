import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    try {
      localStorage.removeItem("auth");
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      // ignore
    }

    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    const timeout = setTimeout(() => navigate("/"), 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-xl font-bold">Logged out</h2>
        <p className="mt-2 text-gray-600">You have been signed out.</p>
        <p className="mt-4 text-sm text-gray-500">Redirecting to login in {seconds} second{seconds !== 1 ? "s" : ""}…</p>
      </div>
    </div>
  );
}
