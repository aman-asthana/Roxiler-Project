import api from "./axios";

export const updatePasswordAPI = (oldPassword, newPassword) =>
  api.put("/users/update-password", {
    oldPassword,
    newPassword,
  });
