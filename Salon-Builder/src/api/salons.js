import api from "./axios";

// 🔥 GET ALL (with params)
export const getSalons = async (params) => {
  const res = await api.get("/salons/", { params });
  return res.data;
};

// 🔥 GET ONE
export const getSalon = async (id) => {
  const res = await api.get(`/salons/${id}/`);
  return res.data;
};

// 🔥 ACTIONS
export const activateSalon = (id) =>
  api.post(`/salons/${id}/activate/`);

export const suspendSalon = (id) =>
  api.post(`/salons/${id}/suspend/`);

export const deactivateSalon = (id) =>
  api.post(`/salons/${id}/deactivate/`);

export const deleteSalon = (id) =>
  api.post(`/salons/${id}/soft_delete/`);

export const renewSalon = (id, plan) =>
  api.post(`/salons/${id}/renew/`, { plan });