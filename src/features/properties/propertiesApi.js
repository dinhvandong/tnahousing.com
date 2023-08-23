import { api } from "../api/api";

export const propertiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: () => ({
                url: "/property/findAll",
                method: "POST",
            }),
        }),
        createProperty: builder.mutation({
            query: (body) => ({
                url: "/property/insert",
                method: "POST",
                body: body
            }),
        }),
        getPropertyTypes: builder.query({
            query: () => ({
                url: "/propertyType/findAll",
                method: "POST",
            }),
        }),
        getState: builder.query({
            query: () => ({
                url: "/stateUs/findAll",
                method: "POST",
            }),
        }),
        findAllByCity: builder.query({
            query: ({name}) => ({
                url: `/property/findAllByCity/find?city=${name}`,
                method: "POST",
            })
        }),
        getFeaturesbyCity: builder.query({
            query: () => ({
                url: `/property/findAllByCity/getFeatures`,
                method: "POST",
            }),
        }),
        updateProperty: builder.mutation({
            query: (body) => ({
                url: "/property/update",
                method: "POST",
                body: body
            }),
        }),
        findByIdProperty: builder.query({
            query: ({id}) => ({
                url: `/property/findByID?id=${id}`,
                method: "POST",
            }),
        }),
        deleteByIdProperty: builder.mutation({
            query: (id) => ({
                url: `/property/delete?id=${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {useDeleteByIdPropertyMutation,useFindByIdPropertyQuery,useUpdatePropertyMutation, useGetPropertiesQuery, useCreatePropertyMutation , useGetPropertyTypesQuery, useGetStateQuery, useFindAllByCityQuery, useGetFeaturesbyCityQuery } = propertiesApi;
