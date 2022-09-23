import React from "react";
import { useRouter } from "next/router";
import SingleItemView from "../../src/components/SingleItemView";
import { useGetSingleSteakQuery } from "../../src/redux/reducers/apiSlice";

export default function SingleSteakView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetSingleSteakQuery(id);

  return <SingleItemView data={data} type={"steak"} />;
}
