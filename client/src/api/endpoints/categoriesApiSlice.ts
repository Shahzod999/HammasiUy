import { GetCategoriesResponse } from "../../types/catgoryTypes";
import { apiSlice } from "../apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
