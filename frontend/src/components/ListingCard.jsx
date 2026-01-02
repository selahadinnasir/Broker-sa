import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  // console.log(listing.title, listing.images);
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition"
    >
      <div className="h-48 bg-gray-100 overflow-hidden">
        {listing.images && listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:underline">
          {listing.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {listing.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-black">${listing.price}</span>
          <span className="text-xs text-gray-500">{listing.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
