import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pencil, Trash2, CheckCircle, Building2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import DashboardNav from '../../components/DashboardNav';
import {
  getMyListings,
  deleteListing,
  markListingSold,
} from '../../services/listing.service';

const MyListings = () => {
  const queryClient = useQueryClient();

  // Fetch listings with React Query
  const {
    data: listings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['myListings'],
    queryFn: getMyListings,
    staleTime: 1000 * 60 * 10, // 1 minute
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteListing,
    onSuccess: () => {
      toast.success('Listing deleted');
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
    },
    onError: () => toast.error('Failed to delete listing'),
  });

  // Mark as sold mutation
  const soldMutation = useMutation({
    mutationFn: markListingSold,
    onSuccess: () => {
      toast.success('Marked as Sold / ተሽጧል');
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
    },
    onError: () => toast.error('Failed to mark as sold'),
  });

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
              onClick={() => {
                toast.dismiss(t.id);
                deleteMutation.mutate(id);
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

  const handleMarkSold = (id) => {
    soldMutation.mutate(id);
  };

  return (
    <div className="lg:flex bg-gray-50 min-h-screen">
      <DashboardNav />

      <main className="flex-1 px-4 py-6 lg:p-10 pt-20 lg:pt-10">
        <h1 className="text-2xl font-bold mb-8">My Listings</h1>

        {isLoading && (
          <div className="space-y-5 max-w-4xl">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl p-5 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-28 h-20 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="mt-4 h-6 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {isError && <p className="text-red-500">Failed to load listings.</p>}

        {!isLoading && listings.length === 0 && (
          <p className="text-gray-500">No listings yet.</p>
        )}

        {!isLoading && listings.length > 0 && (
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
                        loading="lazy"
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
          </div>
        )}
      </main>
    </div>
  );
};

export default MyListings;
