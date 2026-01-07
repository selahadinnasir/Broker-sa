import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold tracking-tight"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-black text-white text-lg">
              ደ
            </span>

            <span className="text-xl">
              ደላላ<span className="text-gray-400 font-semibold">hub</span>
            </span>
          </Link>{' '}
          <p className="text-sm text-gray-600 mt-2">
            A modern platform to list and discover properties with ease.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-black">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-black">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-black">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-black">
                Brokers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-black">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-black">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
              ደ
            </span>

            <span className="text-lg font-semibold text-gray-900">
              ደላላ<span className="text-gray-400">hub</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ደላላhub. All rights reserved.
          </p>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
