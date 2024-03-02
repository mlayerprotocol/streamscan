import { BASE_URL } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unAuthBaseApi = createApi({
  reducerPath: "unAuthBaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Roles", "Certificate"],
  endpoints: () => ({}),
});
