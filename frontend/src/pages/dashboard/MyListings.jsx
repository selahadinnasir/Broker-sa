import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pencil, Trash2, CheckCircle, Building2 } from 'lucide-react';

import DashboardNav from '../../components/DashboardNav';
import {
  getMyListings,
  deleteListing,
  markListingSold,
} from '../../services/listing.service';

const MyListings = () => {
  const [listings, setListings] = useState([]);

  const loadListings = async () => {
    try {
      const data = await getMyListings();
      setListings(data);
    } catch {
      toast.error('Failed to load listings');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadListings();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium">Delete this listing?</p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm rounded-md border"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteListing(id);
                  toast.success('Listing deleted');
                  loadListings();
                } catch {
                  toast.error('Failed to delete listing');
                }
              }}
              className="px-3 py-1 text-sm rounded-md bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };

  const handleMarkSold = async (id) => {
    try {
      await markListingSold(id);
      toast.success('Marked as Sold / ተሽጧል');
      loadListings();
    } catch {
      toast.error('Failed to mark as sold');
    }
  };

  return (
    <div className="lg:flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <DashboardNav />

      {/* Main content */}
      <main className="flex-1 px-4 py-6 lg:p-10 pt-20 lg:pt-10">
        {/* pt-20 is IMPORTANT for mobile top bar */}

        <h1 className="text-2xl font-bold mb-8">My Listings</h1>

        <div className="space-y-5 max-w-4xl">
          {listings.map((l) => (
            <div key={l._id} className="bg-white border rounded-2xl p-5">
              {/* Row 1: Image + Title */}
              <Link
                to={`/listings/${l._id}`}
                className="flex gap-4 items-start hover:opacity-90"
              >
                <div className="w-28 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {l.images?.length > 0 ? (
                    <img
                      src={l.images[0]}
                      alt={l.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Building2 size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                    {l.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{l.price} ETB</p>
                </div>
              </Link>

              {/* Row 2: Status + Actions */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                {/* Status */}
                {l.status === 'sold' ? (
                  <span className="flex items-center gap-1 text-sm font-semibold text-red-600">
                    <CheckCircle size={16} />
                    Sold / ተሽጧል
                  </span>
                ) : (
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  {l.status !== 'sold' && (
                    <button
                      onClick={() => handleMarkSold(l._id)}
                      className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                      ተሽጧል?
                    </button>
                  )}

                  <Link
                    to={`/dashboard/listings/${l._id}/edit`}
                    className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(l._id)}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {listings.length === 0 && (
            <p className="text-gray-500">No listings yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyListings;
