import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, PlusSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';

const DashboardNav = () => {
  const [open, setOpen] = useState(false);

  const base =
    'flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm';

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b bg-white sticky top-0 z-40">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
        <span className="font-semibold">Broker Dashboard</span>
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-64 bg-gray-50 border-r min-h-screen p-6 transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-bold leading-snug">
            Broker Panel <br />
            <span className="text-sm text-gray-500">የአቅራቢ(ደላላ) መቆጣጠሪያ</span>
          </h2>

          {/* Close (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-2">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={`${base} text-gray-600 hover:bg-gray-200`}
          >
            <Home size={18} />
            Home / ወደ ዋና ገፅ
          </NavLink>

          <NavLink
            to="/dashboard"
            end
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${base} ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`
            }
          >
            <Home size={18} />
            My Listings / የኔ ንብረቶች
          </NavLink>

          <NavLink
            to="/dashboard/create"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${base} ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`
            }
          >
            <PlusSquare size={18} />
            Create Listing / ንብረት ጨምር
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default DashboardNav;
