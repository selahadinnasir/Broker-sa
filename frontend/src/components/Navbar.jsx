import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          RealEstate
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
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
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
