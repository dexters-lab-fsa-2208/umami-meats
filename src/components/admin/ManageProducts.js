import React, { useState } from "react";
import styled from "styled-components";
import {
  useGetProductsQuery,
  useUpdateSteakMutation,
  useUpdateSushiMutation,
} from "../../redux/reducers/apiSlice";
import Link from "next/link";

export default function ManageProducts() {
  return (
    <>
      <ul>
        <li>Add new products</li>
        <li>Edit products</li>
        <li>Delete products</li>
      </ul>
    </>
  );
}
