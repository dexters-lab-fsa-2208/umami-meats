// this is the component to render before the page content has loaded
import React from "react";
import styled from "styled-components";
// react-icons
import { BiLoaderAlt } from "react-icons/bi";

const LoadingContainer = styled.div`
    margin: 2em auto;
    text-align: center;
    p {
        margin-top: 0.5em;
        font-style: italic;
    }
`;

export default function Loading({ content }) {
    const [rotation, rotate] = React.useState(0);

    React.useEffect(() => {
        setTimeout(() => rotate(rotation + 7), 16.7);
    });

    return(
        <LoadingContainer>
            <BiLoaderAlt style={{transform: `rotate(${rotation}deg)`}} />
            <p>Loading{content ? ` ${content}...` : "..." }</p>
        </LoadingContainer>
    )
}
