import DashboardNav from '../../components/DashboardNav';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Sidebar - hidden on mobile & tablet */}
      <DashboardNav />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back 👋 / እንኳን ደህና መጡ
        </h1>

        <p className="text-gray-600 mt-2">ንብረቶችዎን እዚህ ገጽ ላይ ይቆጣጠሩ</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="text-sm text-gray-500">
              Total Listings / ጠቅላላ ንብረቶች
            </h3>
            <p className="text-3xl font-bold mt-2">—</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="text-sm text-gray-500">
              Active Listings / አሁን ያሉ ንብረቶች
            </h3>
            <p className="text-3xl font-bold mt-2">—</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="text-sm text-gray-500">Profile Status</h3>
            <p className="text-lg font-semibold mt-2 text-green-600">
              Verified
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
