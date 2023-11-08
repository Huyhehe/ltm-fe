import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../../utils/constants";

export const problemStatusApi = createApi({
  reducerPath: "problemStatusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ENDPOINT}/code/`,
  }),
  endpoints: (builder) => ({
    getProblemStatus: builder.query({
      query: (id) => `status/${id}`,
    }),
  }),
});

export const { useGetProblemStatusQuery } = problemStatusApi;
