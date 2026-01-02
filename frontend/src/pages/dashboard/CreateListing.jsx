import { useState } from 'react';
import DashboardNav from '../../components/DashboardNav';
import { createListing } from '../../services/listing.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const CreateListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('forms subimtted', form);

    try {
      await createListing(form);

      toast.success('Listing created successfully');
      navigate('/dashboard/listings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    const { data } = await API.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // save URLs, NOT files
    setForm((prev) => ({
      ...prev,
      images: data.imageUrls,
    }));
  };

  return (
    <div className="flex">
      <DashboardNav />

      <main className="flex-1 p-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
        <p className="text-gray-600 mb-8">
          Add a new property to your listings
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            placeholder="Title"
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            rows={4}
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price"
              className="border rounded-xl px-4 py-3"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />

            <input
              placeholder="Location"
              className="border rounded-xl px-4 py-3"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          {/* Type */}
          <select
            className="w-full border rounded-xl px-4 py-3 bg-white"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Select property type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
