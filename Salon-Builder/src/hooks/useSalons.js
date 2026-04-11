// src/hooks/useSalons.js
import { useQuery } from "@tanstack/react-query";
import { getSalons } from "../api/salons";

export const useSalons = () => {
  return useQuery({
    queryKey: ["salons"],
    queryFn: getSalons,
  });
};