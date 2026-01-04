import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Find properties listed by trusted brokers <br />
          <br />
          በታመኑ የንብረት አቅራቢዎች(ደላሎች) የተዘረዘሩ ንብረቶችን ያግኙ
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          የተረጋገጡ የንብረት ዝርዝሮችን ይመልከቱ። አቅራቢዎች ንብረቶቻቸውን በቀላሉ ማስተዳደርና ማቅረብ ይችላሉ።
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/listings"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Browse Listings / ዝርዝሮችን ይመልከቱ{' '}
          </Link>

          {!user && (
            <Link
              to="/register"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Become a Broker / ንብረት አቅራቢ(ደላላ) ይሁኑ{' '}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
