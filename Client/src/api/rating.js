import api from "./axios";

export const submitRatingAPI = (storeId, rating) =>
  api.post(`/ratings/${storeId}`, { 
    rating_value: Number(rating) 
  });

export const updateRatingAPI = (storeId, rating) =>
  api.put(`/ratings/${storeId}`, { 
    rating_value: Number(rating) 
  });
