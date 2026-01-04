import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold">RealEstate</h3>
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

      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RealEstate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
