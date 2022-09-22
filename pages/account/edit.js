import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useUpdateUserMutation } from "../../src/redux/reducers/apiSlice";
import { RemoveSSRFromComponent } from "../../src/utils";

function EditAccount() {
    return(
        <div>Edit account page</div>
    )
}

// disabling server-side-rendering, since data is acquired from localStorage
export default RemoveSSRFromComponent(EditAccount);
