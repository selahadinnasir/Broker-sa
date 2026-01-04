import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const CallToAction = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="bg-black py-20 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to list your properties?
        </h2>
        <p className="text-gray-300 mb-8">
          Join as a broker and start managing your listings today.
        </p>

        <Link
          to="/register"
          className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
