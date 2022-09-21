import React from "react";
import { useRouter } from "next/router";
import SingleItemView from "../../src/components/SingleItemView";

export default function SingleSushiView() {
    const router = useRouter();
    const { id } = router.query;

    return <SingleItemView type="sushi" id={id} />
}
