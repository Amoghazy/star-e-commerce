/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRODUCT_URL, UPLOAd_URL } from "../constant";

import { apiSlice } from "./apiSlice";

const productApiSclice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page) => `${PRODUCT_URL}?page=${page}`,
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductsById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: `${PRODUCT_URL}/category/${category}`,
        method: "GET",
      }),
    }),
    getTopRatingProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
        method: "GET",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        method: "GET",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getImage: builder.query({
      query: (path) => ({
        url: `${UPLOAd_URL}/${path}`,
        method: "GET",
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),

    addReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.id}/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsByCategoryQuery,
  useGetTopRatingProductsQuery,
  useGetNewProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetImageQuery,
  useAddReviewMutation,
}: any = productApiSclice;
