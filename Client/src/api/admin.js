import api from "./axios";

//POST
export const addUserAPI = (data) => api.post("/admin/add-user", data);
export const addStoreAPI = (data) => api.post("/stores/add", data);

//GET
export const getAdminDashboard = () => api.get("/admin/dashboard");
export const getUsersList = (query = {}) => api.get("/admin/users", { params: query });
export const getUserDetails = (id) => api.get(`/admin/users/${id}`);

