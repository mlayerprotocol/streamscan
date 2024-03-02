import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_URL, BASE_URL } from "@/utils";
import { AuthModel } from "@/model";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthModel, { password: string; email: string }>({
      query: (body) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    register: builder.mutation<AuthModel, { password: string; email: string }>({
      query: (body) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    verify: builder.mutation<AuthModel, { verificationCode: string; email: string }>({
      query: (body) => ({
        url: `${AUTH_URL}/verify`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    resetPassword: builder.mutation<
      { message: string },
      {
        email: string;
        token: string;
        body: { password: string; password_confirmation: string };
      }
    >({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password/${data.email}/${data.token}`,
        method: "POST",
        body: data.body,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    completeRegistration: builder.mutation<
      { message: string },
      { token: string; email: string }
    >({
      query: ({ token, email }) => ({
        url: `${AUTH_URL}/complete-registration/${email}/${token}`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    regenerateToken: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: `${AUTH_URL}/regenerate-token`,
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCompleteRegistrationMutation,
  useRegenerateTokenMutation,
} = authApi;
