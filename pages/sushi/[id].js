import React from "react";
import { useRouter } from "next/router";
import SingleItemView from "../../src/components/SingleItemView";
import { useGetSingleSushiQuery } from "../../src/redux/reducers/apiSlice";
import { motion } from "framer-motion";
import { Loading } from "../../src/components";

export default function SingleSushiView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetSingleSushiQuery(id);

  if (!data) {
    return <Loading />;
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <SingleItemView data={data} type={"sushi"} />
      </motion.div>
    );
  }
}
