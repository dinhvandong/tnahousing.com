import { api } from "../api/api";

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/FileUpload',
          method: 'POST',
          body: formData,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (body) => {

        return {
          url: '/user/updateProfile',
          method: 'POST',
          body: body,
        };
      },
    }),
    updateSocial: builder.mutation({
      query: (body) => {

        return {
          url: '/user/updateSocial',
          method: 'POST',
          body: body,
        };
      },
    }),
    changePassword: builder.mutation({
      query: ({oldPassword, newPassword}) => {

        return {
          url: `/user/changePassWord?oldPassword=${oldPassword}&newPassword=${newPassword}`,
          method: 'POST',
        };
      },
    }),
    getUser: builder.query({
      query: () => {

        return {
          url: '/user/profile',
          method: 'POST',
        };
      },
    }),
    getAdmin: builder.query({
      query: () => {

        return {
          url: '/auth/getAdminInfo',
          method: 'GET',
        };
      },
    }),
  }),


});

export const { useUploadFileMutation, useUpdateProfileMutation, useUpdateSocialMutation, useGetUserQuery,useChangePasswordMutation, useGetAdminQuery  } = uploadApi;
