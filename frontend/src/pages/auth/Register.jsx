import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      toast.success('Account created successfully 🎉');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Register as a broker or user
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-gray-600 hover:text-black">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
