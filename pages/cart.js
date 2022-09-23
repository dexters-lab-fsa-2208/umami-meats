import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div``;

const Middle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-top: 1.5em;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 11.5em;
  margin-right: 1.5em;
`;

const Products = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 1em;
`;

const Image = styled.img`
  width: 3.25em;
  height: 3.25em;
  padding-right: 0.35em;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NameandX = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProductName = styled.div``;

const IncrementAndPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const IncrementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const QuantityButton = styled.div`
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
`;

const Quantity = styled.div``;

const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  width: 10.5em;
`;

const CheckoutHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Total = styled.div``;

const CheckoutButton = styled.div``;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentMethodContainer = styled.div`
  padding-top: 2.5em;
`;

// COMPONENT STARTS HERE

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <Container>
      <CartHeader>Cart 6</CartHeader>
      <Middle>
        <ProductsContainer>
          {cart &&
            cart.map((product) => (
              <Products key={cart.indexOf(product) - 1}>
                <Image src={product.image} alt="sushi" />
                <DetailsContainer>
                  {" "}
                  <NameandX>
                    <ProductName>{product.name}</ProductName>
                    <button>X</button>
                  </NameandX>
                  <IncrementAndPrice>
                    <IncrementContainer>
                      <QuantityButton>-</QuantityButton>
                      <Quantity>{product.quantity}</Quantity>
                      <QuantityButton>+</QuantityButton>
                    </IncrementContainer>

                    <Total>${product.price * product.quantity}</Total>
                  </IncrementAndPrice>
                </DetailsContainer>
              </Products>
            ))}
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
      <Link href={'/checkout'}><button>Temp Checkout Button</button></Link>
    </Container>
  );
}

export default Cart;
