import React from "react";
import Products from "../../src/components/Products";
import { useGetSteaksQuery } from "../../src/redux/reducers/apiSlice";
import { Loading } from "../../src/components";
import { motion } from "framer-motion";

export default function AllSteak() {
  const { data: products, isLoading, isSuccess } = useGetSteaksQuery();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Loading />
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Products
          products={products}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </motion.div>
    );
  }
}
