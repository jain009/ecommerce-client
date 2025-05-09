 
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({pageNumber,keyword}) => ({
        url: PRODUCTS_URL,
      params: {
        keyword,
        pageNumber,
      }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response) => {
        console.log("Raw upload response:", response);
        try {
          return {
            status: response.status,
            message: response.message || 'Upload failed',
            image: response.imageUrl
          };
        } catch (e) {
          return {
            status: 500,
            message: 'Server returned invalid response format',
            originalStatus: response.status
          };
        }
      }
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`, 
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Product"]
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      method: "GET",
    }),
    keepUnusedDataFor: 5,
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productApiSlice;