import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from '../../services/listing.service';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListingById(id)
      .then(setListing)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading listing...</div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-20 text-gray-500">Listing not found</div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="h-80 bg-gray-100">
          {listing.images?.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>

          <p className="mt-4 text-gray-600">{listing.description}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-gray-500">Price</span>
              <p className="font-semibold">${listing.price}</p>
            </div>

            <div>
              <span className="text-gray-500">Location</span>
              <p className="font-semibold">{listing.location}</p>
            </div>

            {console.log('BROKER IN RENDER:', listing.broker)}

            <div>
              <span className="text-gray-500">Broker</span>
              <p className="font-semibold">{listing.broker?.name}</p>
              <p className="text-sm text-gray-600">
                📞 {listing.broker?.phone || 'Phone not available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingDetails;
