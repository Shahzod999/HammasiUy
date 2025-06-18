import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users/createUser",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApiSlice;
