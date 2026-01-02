import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, PlusSquare } from 'lucide-react';

const DashboardNav = () => {
  const base = 'flex items-center gap-3 px-4 py-3 rounded-xl transition';

  return (
    <aside className="w-64 bg-gray-50 border-r min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">Broker Panel</h2>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/listings"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <Home size={18} />
          My Listings
        </NavLink>

        <NavLink
          to="/dashboard/create"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`
          }
        >
          <PlusSquare size={18} />
          Create Listing
        </NavLink>
      </nav>
    </aside>
  );
};

export default DashboardNav;
