/* eslint-disable @typescript-eslint/no-explicit-any */
import { storeImage } from "../../cashImage";
import { PRODUCT_URL, UPLOAd_URL } from "../constant";

import { apiSlice } from "./apiSlice";

const productApiSclice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page) => `${PRODUCT_URL}?page=${page}`,
      providesTags: ["Product"],
      keepUnusedDataFor: 60 * 60,
      transformResponse: (response: any) => {
        response.data.forEach((product: any) => {
          fetch(product.image)
            .then((res) => res.blob())
            .then((blob) => storeImage(product.image, blob));
        });
        return response;
      },
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

// ----this is for caching image but not effective because of size of image and small storage limit (typically around 5MB) ----
// const cacheImage = (imageUrl: any) => {
//   const cachedImage = localStorage.getItem(imageUrl);
//   if (!cachedImage) {
//     fetch(imageUrl)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (reader.result) {
//             localStorage.setItem(imageUrl, reader.result as string);
//           }
//         };
//         reader.readAsDataURL(blob);
//       });
//   }
// };
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
