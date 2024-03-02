import { ACCOUNT_LOGOUT, USER_URL } from "@/utils";
import { authBaseApi } from ".";
import { AuthModel, AuthModelData } from "@/model";

export const accountApi = authBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountDetail: builder.query<AuthModel, void>({
      query: () => `${USER_URL}/me`,
      providesTags: ["Account"],
    }),
    updateAccountDetail: builder.mutation<AuthModel, any>({
      // updateAccountDetail: builder.mutation<AuthModel, { body: FormData }>({
      query: (body) => ({
        body,
        url: `${USER_URL}/me`,
        method: "PATCH",
      }),
      invalidatesTags: ["Account"],
    }),
    logout: builder.query<{ user: any }, void>({
      query: () => `${ACCOUNT_LOGOUT}`,
      providesTags: ["Account"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAccountDetailQuery,
  useGetAccountDetailQuery,
  useUpdateAccountDetailMutation,
  useLazyLogoutQuery,
} = accountApi;
