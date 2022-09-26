import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.DATABASE_URL + "/api",
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
    "tags",
    "lineItems",
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
      query: () => "/sushi",
      providesTags: ["sushis"],
    }),
    getSingleSushi: builder.query({
      query: (id) => `/sushi/${id}`,
      providesTags: ["sushi"],
    }),
    updateSushi: builder.mutation({
      query: (payload) => ({
        url: `/sushi/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
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
      query: (payload) => ({
        url: `/steaks/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["steak"],
    }),
    deleteSteak: builder.mutation({
      query: (id) => ({
        url: `/steaks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["steaks"],
    }),
    getTags: builder.query({
      query: () => "/tags",
      providesTags: ["tags"],
    }),
    //lINE ITEMS
    getLineItems: builder.query({
      query: () => "/lineitems",
      providesTags: ["lineItems"],
    }),
    createLineItem: builder.mutation({
      query: (payload) => ({
        url: "/lineitems",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["lineItems"],
    }),
    updateLineItem: builder.mutation({
      query: (payload) => ({
        url: `/lineItems/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["lineItems"],
    }),
    deleteLineItem: builder.mutation({
      query: (payload) => ({
        url: `/lineItems/${payload}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lineItems"],
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
  useGetTagsQuery,
  useGetLineItemsQuery,
  useCreateLineItemMutation,
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
} = apiSlice;
