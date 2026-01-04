import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNav from '../../components/DashboardNav';
import { getListingById, updateListing } from '../../services/listing.service';
import API from '../../services/api';
import toast from 'react-hot-toast';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    images: [],
  });

  // Load existing listing
  useEffect(() => {
    const loadListing = async () => {
      try {
        const data = await getListingById(id);
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          type: data.type,
          images: data.images || [],
        });
      } catch {
        toast.error('Failed to load listing');
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [id]);

  // Upload images (append)
  const handleImageUpload = async (e) => {
    setUploading(true);

    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const { data } = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.imageUrls],
      }));
    } catch {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Update listing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateListing(id, form);
      toast.success('Listing updated');
      navigate('/dashboard/listings');
    } catch {
      toast.error('Failed to update listing');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-10">Loading...</main>
      </div>
    );
  }

  return (
    <div className="flex">
      <DashboardNav />

      <main className="flex-1 p-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Edit Listing</h1>
        <p className="text-gray-600 mb-8">Update your property information</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Title"
            required
          />

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Description"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border rounded-xl px-4 py-3"
              placeholder="Price"
              required
            />

            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="border rounded-xl px-4 py-3"
              placeholder="Location"
              required
            />
          </div>

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 bg-white"
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
              onChange={handleImageUpload}
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
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Listing'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditListing;
