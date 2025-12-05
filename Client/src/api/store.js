import api from "./axios";
export const getStores = () => api.get("/stores");
export const rateStore = (id, val) => api.post(`/ratings/${id}`, { rating_value: val });
export const updateRating = (id, val) => api.put(`/ratings/${id}`, { rating_value: val });

export const getAllStores = (query = {}) => api.get("/stores", { params: query });

