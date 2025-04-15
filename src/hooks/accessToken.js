import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useAccessToken = (payload, hasVideo) => {
  return useQuery({
    queryKey: ["accessToken"],
    enabled: hasVideo ? true : false,
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.accessToken, payload);

      if (data?.success) {
        return data?.result;
      }
    },
  });
};
