import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div``;

const Middle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 3em 1.5em 3em 0em
    ${
      "" /* margin-left: 3em;
  margin-right: 3em; */
    };
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Products = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductImage = styled.div``;

const NameandX = styled.div``;

const ProductName = styled.div``;

const IncrementAndPrice = styled.div``;

const QuantityButton = styled.div``;

const Quantity = styled.div``;

const Checkout = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutHeaders = styled.div``;

const Total = styled.div``;

const CheckoutButton = styled.div``;

const TotalContainer = styled.div``;

const PaymentMethodContainer = styled.div``;

// COMPONENT STARTS HERE

function Cart() {
  return (
    <Container>
      <CartHeader>Cart 6</CartHeader>
      <Middle>
        <ProductsContainer>
          <Products>
            <ProductImage src="/public/sushi.webp" alt="sushi" />
            <NameandX>
              <ProductName>SUSHI</ProductName>
              <button>X</button>
            </NameandX>
            <IncrementAndPrice>
              <QuantityButton>-</QuantityButton>
              <Quantity>4</Quantity>
              <QuantityButton>+</QuantityButton>
            </IncrementAndPrice>
          </Products>
        </ProductsContainer>
        <Checkout>
          Checkout
          <TotalContainer>
            <CheckoutHeaders>
              Subtotal<Total>$99.99</Total>
            </CheckoutHeaders>
            <CheckoutHeaders>
              Shipping<Total>$99.99</Total>
            </CheckoutHeaders>
            <CheckoutHeaders>
              Tax<Total>$99.99</Total>
            </CheckoutHeaders>
          </TotalContainer>
          <PaymentMethodContainer>
            <CheckoutHeaders>
              Total<Total>$99.99</Total>
            </CheckoutHeaders>
            <CheckoutButton>Paypal</CheckoutButton>
            <CheckoutButton>Credit Card</CheckoutButton>
          </PaymentMethodContainer>
        </Checkout>
      </Middle>
    </Container>
  );
}

export default Cart;
