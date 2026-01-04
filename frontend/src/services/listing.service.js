import API from './api';

export const getListings = async () => {
  const res = await API.get('/listings');
  return res.data;
};

export const getListingById = async (id) => {
  const res = await API.get(`/listings/${id}`);
  return res.data;
};

// Broker only
export const getMyListings = async () => {
  const res = await API.get('/listings/my');
  return res.data;
};

export const createListing = async (listingData) => {
  const res = await API.post('/listings', listingData);

  return res.data;
};

// export const createListing = async (formData) => {
//   const res = await API.post('http://localhost:5000/api/listings', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });

//   return res.data;
// };

export const updateListing = async (id, data) => {
  const res = await API.put(`/listings/${id}`, data);
  return res.data;
};

export const deleteListing = async (id) => {
  const res = await API.delete(`/listings/${id}`);
  return res.data;
};
