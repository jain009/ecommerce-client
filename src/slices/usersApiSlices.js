import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
      transformResponse: (response) => {
        // Ensure the response is an array of user objects
        if (Array.isArray(response)) {
          return response;
        } else {
          // console.error("Unexpected getUsers response:", response);
          return []; // Or handle the error appropriately
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
     getUserDetails: builder.query({
          query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
          }),
          keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
          query: ({data}) => ({
            url: `${USERS_URL}/${data.userId}`,
            method: 'PUT',
            body: data,
          }),
          invalidatesTags: ['User'],
        }),
  }),
});


export const {
  useLoginMutation,
  useLogoutMutation,
  useProfileMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
