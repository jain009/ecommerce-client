import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        credentials: "include",
        body: order,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
     
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        credentials: "include",
      }),

      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,

        credentials: "include",
      }),

      keepUnusedDataFor: 5,
    }),
   // ordersApiSlice.js
payOrder: builder.mutation({
  query: ({ orderId, details }) => ({ 
    url: `${ORDERS_URL}/${orderId}/pay`,
    method: 'PUT',
    credentials: 'include',
    body: details,
  })
}),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        credentials: "include",
        method: "PUT",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  usePayOrderMutation,
} = ordersApiSlice;
