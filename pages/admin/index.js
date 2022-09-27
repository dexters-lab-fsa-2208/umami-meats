import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import authService from "../../src/services/auth.service";
// import { RemoveSSRFromComponent } from "../../src/utils";
import { Loading } from "../../src/components";
import {
    ManageProducts,
    ManagePromos,
    ManageUsers,
    ToolList,
    UpdateFeatured,
  } from "../../src/components/admin";

const grayContainer = styled.div`
    background-color: rgb(230, 230, 230);
    box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.43);
    padding: 0.5em;
`

const AdminToolsContainer = styled.div`
    &#noAccess {
        margin: 2em 4.2em;
        p {
            margin-bottom: 1.5em;
            &:last-child {
                font-style: italic;
            }
        }
    }

    margin: 1em;

    h2 {
        text-align: center;
        margin-bottom: 0.5em;
    }
    .return {
        font-style: italic;
        text-decoration: underline;
        margin: 0 0.5em 0.5em;
    }
`

function AdminTools() {
    const user = useSelector(state => state.user);

    // ADMIN VERIFICATION
    const [loading, setLoading] = useState(true);
    const [userVerified, setUserVerified] = useState(false);
    // checks token in redux state to ensure that the user is admin
    React.useEffect(() => {
        const verify = async (token) => {
            const { verifyToken } = authService;
            return await verifyToken(token);
        }
        if (user?.user?.admin) {
            let token = JSON.parse(localStorage.user).token;
            if (verify(token)) {
                setUserVerified(true);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [])

    // TOOL SELECTION
        // ManageProducts,
        // ManagePromos,
        // ManageUsers,
        // ToolList,
        // UpdateFeatured,
    const [selectedTool, setSelectedTool] = useState("");
    // useEffect(() => {

    // })

    const renderSelectedTool = () => {
        // cases: featured, products, promos, users
        switch (selectedTool) {
            case ("featured"):
                return <UpdateFeatured />
            case ("productsAdd"):
                return <ManageProducts req={"add"} />
            case ("productsEdit"):
                return <ManageProducts req={"edit"} />
            case ("promos"):
                return <ManagePromos />
            case ("users"):
                return <ManageUsers />
            default:
                return <ToolList select={setSelectedTool} />
        }
    }
    
    if (loading) {
        return <Loading message={"Verifying admin..."} />
    } else if (!loading && !userVerified) {
        return (
            <AdminToolsContainer id="noAccess">
              <p>You do not have the credentials to access this page</p>
              <Link href="/">
                <p>Return to <u>home page</u></p>
              </Link>
            </AdminToolsContainer>
        )
    } else
    return(
        <AdminToolsContainer>
            {selectedTool ? <>
            <p onClick={() => setSelectedTool("")} className="return">Return to all tools</p>
            </> : <h2>Administrator Tools</h2>
            }
            {renderSelectedTool()}
        </AdminToolsContainer>
    )
}

export default AdminTools;
