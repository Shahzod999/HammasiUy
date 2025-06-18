import { apiSlice } from "../apiSlice";
import { CompanyType, GetAllCompaniesResponse } from "../../types/companyType";
export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation({
      query: (companyData) => ({
        url: "/companies",
        method: "POST",
        body: companyData,
      }),
      invalidatesTags: ["Company"],
    }),
    getMyCompany: builder.query<CompanyType, void>({
      query: () => ({
        url: "/companies/my",
      }),
      providesTags: (result) =>
        result ? [{ type: "Company", id: result._id }] : ["Company"],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Company", id }],
    }),
    getAllCompanies: builder.query<GetAllCompaniesResponse, void>({
      query: () => ({
        url: "/companies",
      }),
      providesTags: ["Company"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetMyCompanyQuery,
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
} = companyApiSlice;
