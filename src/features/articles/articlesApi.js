import { api } from "../api/api";

export const articlesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getArticlesAll: builder.query({
            query: () => ({
                url: "/article/findAll",
                method: "POST",
            }),
        }),
        getArticleById: builder.query({
            query: ({id}) => ({
                url: `/article/findByID?id=${id}`,
                method: "POST",
            }),
        }),
        createArticle: builder.mutation({
            query: (body) => ({
                url: `/article/insert`,
                method: "POST",
                body: body,
            })
        }),
        getTopicAll: builder.query({
            query: () => ({
                url: "/topic/findAll",
                method: "POST",
            }),
        }),
    }),
});

export const { useGetArticlesAllQuery, useGetArticleByIdQuery, useCreateArticleMutation, useGetTopicAllQuery } = articlesApi;
