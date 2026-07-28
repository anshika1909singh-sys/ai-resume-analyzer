import { Link, NavLink, useNavigate } from "react-router";
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
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "text-sm rounded-full bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800"
                : "text-sm rounded-full text-slate-700 px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "inline-flex rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-200 hover:scale-[1.02] hover:shadow-sky-500/40"
                : "inline-flex rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900"
            }
          >
            Upload File
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "text-sm rounded-full bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800"
                : "text-sm rounded-full text-slate-700 px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
            }
          >
            History
          </NavLink>

          <NavLink
            to="/analyze"
            className={({ isActive }) =>
              isActive
                ? "text-sm rounded-full bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                : "text-sm text-gray-700 px-3 py-2 transition hover:text-blue-600"
            }
          >
            Analyze
          </NavLink>

          {!isAuth && (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-sm rounded-full bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                    : "text-sm text-gray-700 px-3 py-2 transition hover:text-blue-600"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm rounded-full bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                    : "text-sm text-gray-700 px-3 py-2 transition hover:text-blue-600"
                }
              >
                Signup
              </NavLink>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;