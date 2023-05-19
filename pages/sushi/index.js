import React from "react";
import Products from "../../src/components/Products";
import { useGetSushiQuery } from "../../src/redux/reducers/apiSlice";
import { Loading } from "../../src/components";
import { motion } from "framer-motion";

export default function AllSushi() {
  const { data: products, isLoading } = useGetSushiQuery();

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
        <Products products={products} isLoading={isLoading} />
      </motion.div>
    );
  }
}
