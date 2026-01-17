import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/" className="group flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
        <div className="size-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">R</span>
        </div>
        <p className="text-xl font-bold text-gradient tracking-tight">RESUMIND</p>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/auth"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-brand-700 hover:bg-gray-100 transition-all active:scale-95"
        >
          {auth.isAuthenticated ? (
            <>
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <span>Sign Out</span>
            </>
          ) : (
            <>
              <img src="/icons/info.svg" alt="login" className="size-4 opacity-70" />
              <span>Login</span>
            </>
          )}
        </Link>
        <Link to="/upload" className="primary-button w-fit text-sm px-6 py-2.5 shadow-md">
          Upload Resume
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;