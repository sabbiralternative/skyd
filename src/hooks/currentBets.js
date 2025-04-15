import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useCurrentBets = (eventId) => {
  return useQuery({
    queryKey: ["currentBets"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(
        `${API.currentBets}/${eventId || "sports"}`
      );

      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
};
