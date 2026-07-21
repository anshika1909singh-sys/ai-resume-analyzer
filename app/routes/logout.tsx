import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("auth");
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      // ignore
    }

    // redirect to login
    navigate("/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold">Logged out</h2>
        <p className="mt-2 text-gray-600">You have been signed out and will be redirected to login.</p>
      </div>
    </div>
  );
}
