import { BASE_URL } from '../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', //  Important for sending cookies (session data)
    // You can add a prepareHeaders function here for common headers
    prepareHeaders: (headers, { getState }) => {
        // Example: Add an authorization header if the user is logged in
        // const token = getState().auth.token;
        // if (token) {
        //   headers.set('Authorization', `Bearer ${token}`);
        // }//Set content type
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'], // Define your tag types
    endpoints: (builder) => ({}), //  Start with an empty endpoints object
   
});