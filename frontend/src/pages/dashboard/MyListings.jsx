import { useEffect, useState } from 'react';
import DashboardNav from '../../components/DashboardNav';
import { getMyListings, deleteListing } from '../../services/listing.service';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

const MyListings = () => {
  const [listings, setListings] = useState([]);

  const loadListings = async () => {
    const data = await getMyListings();
    setListings(data);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadListings();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await deleteListing(id);
    toast.success('Listing deleted');
    loadListings();
  };

  return (
    <div className="flex">
      <DashboardNav />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">My Listings</h1>

        <div className="space-y-4">
          {listings.map((l) => (
            <div
              key={l._id}
              className="bg-white border rounded-xl p-5 flex items-center justify-between gap-4"
            >
              {/* Left: clickable */}
              <Link
                to={`/listings/${l._id}`}
                className="flex items-center gap-4 flex-1 hover:opacity-90"
              >
                {/* Image */}
                <div className="w-24 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  {l.images?.length > 0 ? (
                    <img
                      src={l.images[0]}
                      alt={l.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold">{l.title}</h3>
                  <p className="text-sm text-gray-500">${l.price}</p>
                </div>
              </Link>

              {/* Right: Delete */}
              <div className="flex items-center gap-2">
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyListings;
