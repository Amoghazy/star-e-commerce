import { apiSlice } from "./apiSlice";
import { USER_URL } from "../contsant";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { useLoginMutation }: any = userApiSlice;
