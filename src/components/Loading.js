// this is the component to render before the page content has loaded
import React from "react";
import styled from "styled-components";
// react-icons
import { BiLoaderAlt } from "react-icons/bi";

const LoadingContainer = styled.div`
  padding-top: 2em;
  text-align: center;
  p {
    margin-top: 0.5em;
    font-style: italic;
  }
`;

export default function Loading({ content, message }) {
  const [rotation, rotate] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      if (rotation >= 2520 /* rotation * 360 */) rotate(0);
      else rotate(rotation + 7);
    }, 16.7);
  });

  return (
    <LoadingContainer>
      <BiLoaderAlt style={{ transform: `rotate(${rotation}deg)` }} />
      {message ? (
        <p>{message}</p>
      ) : (
        <p>Loading{content ? ` ${content}...` : "..."}</p>
      )}
    </LoadingContainer>
  );
}
