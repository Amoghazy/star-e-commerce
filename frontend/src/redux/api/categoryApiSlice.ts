/* eslint-disable @typescript-eslint/no-explicit-any */
import { CATEGORY_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => CATEGORY_URL + "/categories",
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    getCategory: builder.query({
      query: (id) => `${CATEGORY_URL}/${id}`,
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: {
          name: data,
        },
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PUT",
        body: {
          name: data.name,
        },
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
}: any = categoryApiSlice;

export default categoryApiSlice;
