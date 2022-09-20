import React from "react";
import styled from "styled-components";
import { useGetProductsQuery } from "../src/redux/reducers/apiSlice";
import Nav from "../src/components/Nav";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const ProductImgContainer = styled.img`
  height: 30em;
  width: 30em;
`;

const ProductContainer = styled.div`
  display: flex;
`;
// Component starts here!!!

export default function Home() {
  const { data, isLoading } = useGetProductsQuery();

  console.log(data);
  return (
    <Container>
      <Nav />
      <HeroContainer>
        {isLoading ? (
          <div>products are loading</div>
        ) : (
          data.map((ele) => (
            <ProductContainer key={ele.id}>
              <div>{ele.name}</div>
              <ProductImgContainer src={ele.img} />
            </ProductContainer>
          ))
        )}
      </HeroContainer>
    </Container>
  );
}
