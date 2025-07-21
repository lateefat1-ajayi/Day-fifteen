import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md font-semibold transition-colors ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-indigo-700 hover:bg-indigo-100"
    }`;

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">Queez⭐</h1>
        <div className="flex space-x-3">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/history" className={navLinkClass("/history")}>
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
