import { BASE_URL } from "@/utils/constants";
import { getSessionStorage } from "@/utils/sessionStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authBaseApi = createApi({
  reducerPath: "authBaseApi",

  // RTK Configurations
  // refetchOnFocus: true,
  refetchOnReconnect: true,

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // const auth = (getState() as RootState).persistedReducers.auth
      const sessionToken = getSessionStorage();
      const token = sessionToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Status",
    "Account",

    "User",
    "MentorMessage",

    "Ticket",
    "Deriv",

    "Admin",
    "Transaction",
    "Signal",
    "Upload",
    "Product",
    "Config",

    "Course",
    "Category",
    "CourseLesson",
    "CourseBatch",
    "Log",

    "Certificate",

    "PromoCode",
  ],

  endpoints: () => ({}),
});
