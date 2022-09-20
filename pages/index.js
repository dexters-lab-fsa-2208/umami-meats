import React from "react";
import { useGetProductsQuery } from "../src/redux/reducers/apiSlice";

export default function Home() {
  const { data, isLoading } = useGetProductsQuery();

  console.log(data);
  return (<>test</>
  );
}
