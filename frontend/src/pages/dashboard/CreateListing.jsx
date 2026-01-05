import { useState } from 'react';
import DashboardNav from '../../components/DashboardNav';
import { createListing } from '../../services/listing.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const CreateListing = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

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
    setUploading(true);

    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    const { data } = await API.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('image Url', data.imageUrls);
    // save URLs, NOT files
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...data.imageUrls],
    }));

    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="lg:flex bg-gray-50 min-h-screen">
      <DashboardNav />

      <main className="flex-1 px-4 py-6 lg:p-10 pt-20 lg:pt-10">
        <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
        <p className="text-gray-600 mb-8">አዲስ ንብረት ወደ ዝርዝሮችዎ ያስገቡ</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            placeholder="የንብረት ርዕስ"
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          {/* Description */}
          <textarea
            placeholder="ዝርዝር ማብራሪያ"
            rows={4}
            className="w-full border rounded-xl px-4 py-3"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="ዋጋ"
              className="border rounded-xl px-4 py-3"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />

            <input
              placeholder="ቦታ"
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
            <option value="">የንብረት አይነት ይምረጡ</option>
            <option value="rent">ኪራይ</option>
            <option value="sale">የሚሽጥ</option>
          </select>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">
              image/ፎቶ ያስገቡ
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full"
              onChange={(e) => handleImageUpload(e)}
            />
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {form.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-24 rounded-xl overflow-hidden border"
                  >
                    <img
                      src={img}
                      alt={`uploaded-${index}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {uploading ? 'ፎቶውን እየጫነ ነው...' : 'Create Listing / ንብረቱን መዝግብ'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
