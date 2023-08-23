import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.apiUrl}`,
        prepareHeaders: (headers, { getState }) => {
            // getState() giúp lấy ra toàn bộ state trong store
            // getState().user lấy ra state trong userSlice
            const token = getState().persistedReducer.user.currentUser?.accessToken;
            // Nếu có token thì thêm vào headers
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    

    endpoints: (builder) => ({

    }),
});