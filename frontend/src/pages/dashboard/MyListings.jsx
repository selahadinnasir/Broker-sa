import { useEffect, useState } from 'react';
import DashboardNav from '../../components/DashboardNav';
import { getMyListings, deleteListing } from '../../services/listing.service';
import toast from 'react-hot-toast';

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
              {/* Left: Image + info */}
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-24 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  {l.images && l.images.length > 0 ? (
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
              </div>

              {/* Right: Actions */}
              <button
                onClick={() => handleDelete(l._id)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyListings;
