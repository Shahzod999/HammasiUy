import { setProduct } from "../../store/slices/Product/singleProductSlice";
import { GetPropertiesResponse } from "../../types/home";
import { apiSlice } from "../apiSlice";

export const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<GetPropertiesResponse, string | undefined>({
      query: (category) => `/properties?${category}`,
      providesTags: ["Properties"],
    }),
    getMyProperties: builder.query<GetPropertiesResponse, void>({
      query: () => "/properties/myProperties",
      providesTags: ["Properties"],
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: ["Properties"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.property) {
            dispatch(setProduct(data.property));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    createProperty: builder.mutation({
      query: (property) => ({
        url: "/properties",
        method: "POST",
        body: property,
      }),
      invalidatesTags: ["Properties"],
    }),
    updateProperty: builder.mutation({
      query: ({ id, property }) => ({
        url: `/properties/${id}`,
        method: "PUT",
        body: property,
      }),
      invalidatesTags: ["Properties"],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetMyPropertiesQuery,
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApiSlice;
