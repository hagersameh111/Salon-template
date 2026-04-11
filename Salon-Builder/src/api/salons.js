import api from "./axios";

export const getSalons = async () => {
  const res = await api.get("/salons");
  return res.data;
};