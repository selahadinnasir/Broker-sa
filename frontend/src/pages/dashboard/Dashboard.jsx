import DashboardNav from '../../components/DashboardNav';

const Dashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DashboardNav />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-600 mt-2">
          Manage your listings and account from here
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-sm text-gray-500">Total Listings</h3>
            <p className="text-3xl font-bold mt-2">—</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-sm text-gray-500">Active Listings</h3>
            <p className="text-3xl font-bold mt-2">—</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
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
