import React from "react";
import { useRouter } from "next/router";
import SingleItemView from "../../src/components/SingleItemView";
import { useGetSingleSushiQuery } from "../../src/redux/reducers/apiSlice";

export default function SingleSushiView() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetSingleSushiQuery(id);

  return <SingleItemView data={data} type={"sushi"} />;
}
