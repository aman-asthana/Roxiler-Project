import api from "./axios";

export const signupAPI = (data) => api.post("/auth/signup", data);
