import { useEffect, useState } from 'react';
import { getListings } from '../../services/listing.service';
import ListingCard from '../../components/ListingCard';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListings()
      .then(setListings)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading listings...</div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No listings available
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Listings</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default Listings;
