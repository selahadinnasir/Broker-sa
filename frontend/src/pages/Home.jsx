import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Find properties listed by trusted brokers
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Browse verified real estate listings. Brokers can manage and publish
          their own listings with ease.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/listings"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Browse Listings
          </Link>

          {!user && (
            <Link
              to="/register"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Become a Broker
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
