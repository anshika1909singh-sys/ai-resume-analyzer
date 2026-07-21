import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const check = () => setIsAuth(localStorage.getItem("auth") === "true");
    check();

    window.addEventListener("authChange", check);
    window.addEventListener("storage", check);

    return () => {
      window.removeEventListener("authChange", check);
      window.removeEventListener("storage", check);
    };
  }, []);

  return (
    <nav className="w-full rounded-3xl bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link to="/home">
          <p className="text-2xl font-bold">AI-RESUME ANALYZER</p>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/upload" className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Upload File
          </Link>
          <Link to="/history" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">History</Link>

          {!isAuth && (
            <>
              <Link to="/" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">Signup</Link>
            </>
          )}

          {isAuth && (
            <>
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600"
              >
                Logout
              </button>

              {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />

                  <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                    <h3 className="text-lg font-semibold">Confirm Sign Out</h3>
                    <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out? You will be returned to the login page.</p>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => {
                          setShowConfirm(false);
                          navigate("/logout");
                        }}
                        className="rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700"
                      >
                        Yes, sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <Link to="/analyze" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">Analyze</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;