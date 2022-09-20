import React from "react";
import {
  useGetUsersQuery,
  useGetProductsQuery,
} from "../src/redux/reducers/apiSlice";

export default function Home() {
  // const { data } = useGetProductsQuery;
  const { data } = useGetUsersQuery;
  console.log(data);
  return <div>Home</div>;
}
