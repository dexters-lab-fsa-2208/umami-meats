import React from "react";
import { useRouter } from "next/router";
import SingleItemView from "../../src/components/SingleItemView";
import { useGetSingleSteakQuery } from "../../src/redux/reducers/apiSlice";
import { motion } from "framer-motion";

export default function SingleSteakView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetSingleSteakQuery(id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SingleItemView data={data} type={"steaks"} />
    </motion.div>
  );
}
