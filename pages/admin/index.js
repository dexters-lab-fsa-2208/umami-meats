import React from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import authService from "../../src/services/auth.service";
import { RemoveSSRFromComponent } from "../../src/utils";
import { Loading } from "../../src/components";

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
    .devTodo {
        margin: 0.5em 0;
        padding-bottom: 0.5em;
        background-color: rgb(230, 230, 230);
        box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.43);
        p { 
            text-align: center;
            padding: 0.3em 0 0;
        }
    }
`

const hoverTransition = "0.2s"

const ToolContainer = styled.div`
    background-color: rgb(230, 230, 230);
    transition: background-color ${hoverTransition};
    box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.3);
    padding: 0.5em;
    margin: 1em 0;

    h3 {
        text-shadow: 1px 1px 3px rgba(150, 150, 150, 0);
        transition:text-shadow ${hoverTransition};
    }

    &:hover {
        background-color: rgb(220, 220, 220);
        h3 {
            text-shadow: 1px 1px 6px rgba(120, 120, 120, 0.15);
        }
    }
`;

function AdminTools() {
    const user = useSelector(state => state.user);

    const [loading, setLoading] = React.useState(true);
    const [userVerified, setUserVerified] = React.useState(false);
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
            <h2>Administrator Tools</h2>

            <ToolContainer>
                <h3>Set homepage items</h3>
            </ToolContainer>

            <ToolContainer>
                <h3>Add/remove products</h3>
            </ToolContainer>

            <ToolContainer>
                <h3>Update existing products</h3>
            </ToolContainer>

            <ToolContainer>
                <h3>Create and manage promo codes</h3>
            </ToolContainer>

            <ToolContainer>
                <h3>Manage users</h3>
            </ToolContainer>
        </AdminToolsContainer>
    )
}

export default RemoveSSRFromComponent(AdminTools);
