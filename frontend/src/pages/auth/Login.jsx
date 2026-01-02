import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../../services/auth.service';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(form);
      login(data);

      toast.success('Login successful 🎉');
      console.log('lgogin data', data);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
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
          Welcome back
        </h2>
        <p className="text-gray-500 text-center mb-8">Login to your account</p>

        <div className="space-y-5">
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
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm text-gray-600 hover:text-black"
          >
            Don’t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
