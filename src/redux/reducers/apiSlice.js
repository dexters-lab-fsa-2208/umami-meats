import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: [
    "users",
    "user",
    "sushis",
    "sushi",
    "steaks",
    "steak",
    "orders",
    "order",
    "products",
    "product",
  ],
  endpoints: (builder) => ({
    // users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (payload) => {
        return {
          url: `/users/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["user"],
    }),

    // products
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products", "steaks", "sushis"],
    }),

    // orders query
    getOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["order"],
    }),
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),

    // sushi query
    getSushi: builder.query({
      query: () => "/sushis",
      providesTags: ["sushis"],
    }),
    getSingleSushi: builder.query({
      query: (id) => `/sushi/${id}`,
      providesTags: ["sushi"],
    }),
    updateSushi: builder.mutation({
      query: (payload) => {
        return {
          url: `/sushi/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["sushi"],
    }),
    deleteSushi: builder.mutation({
      query: (id) => ({
        url: `/sushi/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["sushis"],
    }),

    //  steaks query
    getSteaks: builder.query({
      query: () => "/steaks",
      providesTags: ["steaks"],
    }),
    getSingleSteak: builder.query({
      query: (id) => `/steaks/${id}`,
      providesTags: ["steak"],
    }),
    updateSteak: builder.mutation({
      query: (payload) => {
        return {
          url: `/steaks/${payload.id}`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["steak"],
    }),
    deleteSteak: builder.mutation({
      query: (id) => ({
        url: `/steaks/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["steaks"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  useGetSteaksQuery,
  useGetSingleSteakQuery,
  useUpdateSteakMutation,
  useDeleteSteakMutation,
  useGetSushiQuery,
  useGetSingleSushiQuery,
  useUpdateSushiMutation,
  useDeleteSushiMutation,
} = apiSlice;