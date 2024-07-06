/* eslint-disable @typescript-eslint/no-explicit-any */
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

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "put",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/`,
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
}: any = userApiSlice;
