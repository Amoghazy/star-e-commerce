/* eslint-disable @typescript-eslint/no-explicit-any */
import { ORDER_URL, PAYPAL_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
      providesTags: ["Order"],
    }),
    getPaypalConfig: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
      }),
      providesTags: ["Order"],
    }),
    getTotalSalesDated: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales-dated`,
      }),

      providesTags: ["Order"],
    }),
    getSpecificOrder: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),

      providesTags: ["Order"],
    }),
    makeOrderDelivered: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/delivered`,
        method: "PUT",
      }),

      invalidatesTags: ["Order"],
    }),
    makeOrderPaid: builder.mutation({
      query: ({ id, details }) => ({
        url: `${ORDER_URL}/${id}/paid`,
        method: "PUT",
        body: details,
      }),

      invalidatesTags: ["Order"],
    }),
    getOrdersCurrentUser: builder.query({
      query: () => ({
        url: `${ORDER_URL}/my-orders`,
      }),

      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetPaypalConfigQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesDatedQuery,
  useGetSpecificOrderQuery,
  useMakeOrderDeliveredMutation,
  useMakeOrderPaidMutation,
  useGetOrdersCurrentUserQuery,
}: any = orderApiSlice;

export default orderApiSlice;
