import React from "react";
import { useRouter } from "next/router";
import SingleItemView from "../../src/components/SingleItemView";

export default function SingleSteakView() {
    const router = useRouter();
    const { id } = router.query;

    return <SingleItemView type="steaks" id={id} />
}
