import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full rounded-3xl bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link to="/home">
          <p className="text-2xl font-bold">
            AI-RESUME ANALYZER
          </p>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/upload" className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Upload File
          </Link>
          <Link to="/history" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">History</Link>
          <Link to="/" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">Login</Link>
          <Link to="/signup" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">Signup</Link>
          <Link to="/analyze" className="text-sm text-gray-700 px-3 py-2 hover:text-blue-600">Analyze</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;