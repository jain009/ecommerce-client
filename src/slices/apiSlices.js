import { BASE_URL } from '../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', //  Important for sending cookies (session data)
    // You can add a prepareHeaders function here for common headers
    prepareHeaders: (headers, { getState }) => {
       
        headers.set('Content-Type', 'application/json'); //Set content type
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}), 
   
});
