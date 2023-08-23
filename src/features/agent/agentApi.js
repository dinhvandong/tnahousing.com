import { api } from "../api/api";

export const agentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAgents: builder.query({
            query: () => ({
                url: "/agents",
                methode: "POST",
            }),
        }),
    }),
});

export const { useGetAgentsQuery } = agentApi;
