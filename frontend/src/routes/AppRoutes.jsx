import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Listings from '../pages/listings/Listings';
import ListingDetails from '../pages/listings/ListingDetails';
import Dashboard from '../pages/dashboard/Dashboard';
import MyListings from '../pages/dashboard/MyListings';
import CreateListing from '../pages/dashboard/CreateListing';

const BrokerDashboard = () => (
  <div className="p-10 text-xl font-semibold">Broker Dashboard (Protected)</div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/listings"
        element={
          <PublicLayout>
            <Listings />
          </PublicLayout>
        }
      />

      <Route
        path="/listings/:id"
        element={
          <PublicLayout>
            <ListingDetails />
          </PublicLayout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="broker">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/listings"
        element={
          <ProtectedRoute role="broker">
            <MyListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/create"
        element={
          <ProtectedRoute role="broker">
            <CreateListing />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
