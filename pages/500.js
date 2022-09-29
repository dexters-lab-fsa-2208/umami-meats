import React from "react";
import { Error } from "../src/components";

export default function ServerError () {
  return <Error is500={true} />;
}
