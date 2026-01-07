// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from '../../services/listing.service';
import { useQuery } from '@tanstack/react-query';

const ListingDetails = () => {
  const { id } = useParams();
  // const [listing, setListing] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   getListingById(id)
  //     .then(setListing)
  //     .finally(() => setLoading(false));
  // }, [id]);

  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing-details', id],
    queryFn: () => getListingById(id),
    staleTime: 1000 * 60 * 10, // 10 minute
  });

  console.log('list detail', listing);
  // listing.map((lis) => console.log('lis price', lis.price));
  // console.log('list detail', listing.price);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading listing...</div>
    );
  }

  if (!listing || listing.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">Listing not found</div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div
          className={`grid gap-4 bg-gray-100 p-4 ${
            listing.images?.length > 1
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {listing.images?.length > 0 ? (
            listing.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${listing.title}-${index}`}
                className="w-full h-80 object-cover rounded-xl"
              />
            ))
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-400">
              No images
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
