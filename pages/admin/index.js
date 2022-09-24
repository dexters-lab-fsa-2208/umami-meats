import React from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RemoveSSRFromComponent } from "../../src/utils";

const AdminToolsContainer = styled.div`
    margin: 1em;
    text-align: center;
`

function AdminTools() {
    const user = useSelector(state => state.user);
    
    return(
        <AdminToolsContainer>{`admin tools will go here :)`}</AdminToolsContainer>
    )
}

export default RemoveSSRFromComponent(AdminTools);
