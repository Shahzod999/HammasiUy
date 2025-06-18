import { apiSlice } from "../apiSlice";

export const uploadImgApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImg: builder.mutation({
      query: ({ formData, multiple }) => ({
        url: "/uploads",
        method: "POST",
        params: { multiple },
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImgMutation } = uploadImgApiSlice;
