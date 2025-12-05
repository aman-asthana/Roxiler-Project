import api from "./axios";

export const getOwnerDashboard = () => api.get("/owner/dashboard");
