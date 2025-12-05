import { api } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useTestQuery = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await api.get("/health");
      return res.data;
    },
  });
};
