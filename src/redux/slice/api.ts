import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DateRangeRTKArgs, FetchQueryRTKArgs, UserRTKArgs } from "../types/queryTypes";
import * as Cookies from 'js-cookie';
import { ENP_ME, ENP_TRIP } from "../endpoints";

export const apiSlice = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_PATH,
    prepareHeaders: (headers) => {
      const access_token = Cookies.default.get('access_token');
      if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<any, {id? : string} >({
      query: () => {
        return {
          url: `/${ENP_ME}`, 
          method: 'GET', 
        }; 
      },
      serializeQueryArgs: ({  endpointName }) => {
        let key = `${endpointName}`;
        return key;
      },       
      forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
      },
    }),

    updateUserById: builder.mutation({
      query: (data: any) => ({
        url: `/${ENP_ME}`, 
        method: 'PUT', 
        body: data,
      }),
    }),



    /* Trip */
    getTrips: builder.query<any, {id? : string} >({
      query: () => {
        return {
          url: `/${ENP_TRIP}`, 
          method: 'GET', 
        }; 
      },
      serializeQueryArgs: ({  endpointName }) => {
        let key = `${endpointName}`;
        return key;
      },       
      forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
      },
    }),
    createTrip: builder.mutation({
      query: (data : any) => ({
        url: `/${ENP_TRIP}`, 
        method: 'POST' , 
        body: data,
      }),
    }),
    updateTrip: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${ENP_TRIP}/${id}`, 
        method: 'PUT' , 
        body: data,
      }),
    }),
    deleteTrip: builder.mutation({
      query: (id: string) => ({
        url: `/${ENP_TRIP}/${id}`, 
        method: 'DELETE'
      }),
    }),
  }),
});

export const { 
    useGetMeQuery,
    useUpdateUserByIdMutation,

    // Trips
    useGetTripsQuery,
    useCreateTripMutation,
    useUpdateTripMutation,
    useDeleteTripMutation,
} = apiSlice;