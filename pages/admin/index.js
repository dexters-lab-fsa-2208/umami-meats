import React from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import authService from "../../src/services/auth.service";
import { RemoveSSRFromComponent } from "../../src/utils";
import { Loading } from "../../src/components";


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
    text-align: center;
`

function AdminTools() {
    const user = useSelector(state => state.user);
    console.log('user in redux: ', user)

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
        <AdminToolsContainer>{`admin tools will go here :)`}</AdminToolsContainer>
    )
}

export default RemoveSSRFromComponent(AdminTools);
