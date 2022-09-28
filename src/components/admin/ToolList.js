import React from "react";
import styled from "styled-components";

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

export default function ToolList({ select }) {
  // selection options: featured, products, promos, users
  const selectTool = (name) => {
    select(name);
  }
  
  return (
    <>
      <ToolContainer onClick={() => selectTool("featured")}>
        <h3>Set homepage items</h3>
      </ToolContainer>

      <ToolContainer onClick={() => selectTool("products")}>
        <h3>Manage products</h3>
      </ToolContainer>

      <ToolContainer onClick={() => selectTool("promos")}>
        <h3>Create and manage promo codes</h3>
      </ToolContainer>

      <ToolContainer onClick={() => selectTool("users")}>
        <h3>Manage users</h3>
      </ToolContainer>
    </>
  );
}
