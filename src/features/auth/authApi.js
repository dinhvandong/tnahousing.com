import { api } from "../api/api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `auth/signin`,
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: `auth/signup`,
                method: 'POST',
                body: body,


            }),
            transformErrorResponse: (response) => {
                if (response.status == 400 || response.status == 401) {
                  // Xử lý các lỗi có mã 400 và 401
                  return { error: response.data.status }
                }
            }
           
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
