// apiSlices.js
import { BASE_URL } from '../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // Try both state and localStorage access patterns
        const authState = getState().auth;
        let token = authState?.userInfo?.token || authState?.token;

        if (!token) {
            try {
                const storedData = localStorage.getItem('userInfo');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    token = parsedData?.token || parsedData?.user?.token;
                }
            } catch (error) {
                console.error('LocalStorage token parse error:', error);
                localStorage.removeItem('userInfo');
            }
        }

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        } else {
            console.warn('No auth token available');
        }

        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: () => ({}),
});
