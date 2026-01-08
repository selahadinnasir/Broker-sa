import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import InstallAppButton from './InstallAppButton';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleShareApp = async () => {
    const url = window.location.href; // share whole app

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ደላላhub',
          text: 'ደላላhub',
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied');
    }
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold tracking-tight"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-black text-white text-lg">
            ደ
          </span>
          <span className="text-xl">
            ደላላ<span className="text-gray-400 font-semibold">hub</span>
          </span>
        </Link>

        {/* RIGHT: Share + Desktop Nav + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Share (always visible, just left of hamburger) */}
          <button
            onClick={handleShareApp}
            className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            🔗 Share
          </button>
          <InstallAppButton />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-black">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  Hi, <strong>{user.name}</strong>
                </span>

                {(user.role === 'broker' || user.role === 'admin') && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block bg-black text-white text-center py-2 rounded-lg"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Hi, <strong>{user.name}</strong>
              </p>

              {(user.role === 'broker' || user.role === 'admin') && (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
