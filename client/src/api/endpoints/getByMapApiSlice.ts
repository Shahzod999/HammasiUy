import { apiSlice } from "../apiSlice";

export const getByMapApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getByMap: builder.query({
      query: (bounds) => ({
        url: "/map",
        params: {
          bounds: JSON.stringify(bounds),
        },
      }),
      providesTags: ["Properties"],
    }),
  }),
});

export const { useGetByMapQuery } = getByMapApiSlice;
