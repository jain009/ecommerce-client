// apiSlices.js
import { BASE_URL } from '../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // Get token from either Redux state or localStorage
        const token = getState().auth?.userInfo?.token || 
                     JSON.parse(localStorage.getItem('userInfo'))?.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: () => ({}),
});
