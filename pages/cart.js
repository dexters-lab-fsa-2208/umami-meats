import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";
import { addToCart, removeFromCart } from "../src/redux/reducers/cart-slice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

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

// Increment/decrement in the cart, while updating price
// Increment quantity from products page if it already exists
// Remove item from cart

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(cart, isLoggedIn);
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
                      <button onClick={() => dispatch(removeFromCart(product))}>
                        X
                      </button>
                    </NameandX>
                    <IncrementAndPrice>
                      <IncrementContainer>
                        <QuantityButton
                          onClick={
                            product.quantity <= 1
                              ? () => dispatch(removeFromCart(product))
                              : () =>
                                  dispatch(
                                    addToCart({
                                      name: product.name,
                                      image: product.img,
                                      price: product.price,
                                      quantity: -1,
                                    })
                                  )
                          }
                        >
                          -
                        </QuantityButton>
                        <Quantity>{product.quantity}</Quantity>
                        <QuantityButton
                          onClick={() =>
                            dispatch(
                              addToCart({
                                name: product.name,
                                image: product.img,
                                price: product.price,
                                quantity: 1,
                              })
                            )
                          }
                        >
                          +
                        </QuantityButton>
                      </IncrementContainer>

                      <Total>
                        $
                        {Math.round(
                          (product.price * product.quantity + Number.EPSILON) *
                            100
                        ) / 100}
                      </Total>
                      {/* {(product.quantity <= 0) && dispatch(removeFromCart(product))} */}
                    </IncrementAndPrice>
                  </DetailsContainer>
                </Products>
              ))}
          </ProductsContainer>
          <Checkout>
            Checkout
            <TotalContainer>
              <CheckoutHeaders>
                Subtotal
                <Total>
                  $
                  {Math.round(
                    (cart.reduce(
                      (prev, curr) => curr.price * curr.quantity + prev,
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100}
                </Total>
              </CheckoutHeaders>
              <CheckoutHeaders>Shipping Calculated at Checkout</CheckoutHeaders>
              {/* <CheckoutHeaders>
              Tax<Total>$99.99</Total>
            </CheckoutHeaders> */}
            </TotalContainer>
            {/* <PaymentMethodContainer>
            <CheckoutHeaders>
              Total<Total>$99.99</Total>
            </CheckoutHeaders>
            <CheckoutButton>Paypal</CheckoutButton>
            <CheckoutButton>Credit Card</CheckoutButton>
          </PaymentMethodContainer> */}
        </Checkout>
      </Middle>
      {isLoggedIn ? (
        <Link href={"/checkout"}>
          <button>Temp Checkout Button</button>
        </Link>
      ) : (
        <Link href="/login">
          <button>Log In to Checkout!</button>
        </Link>
      )}
    </Container>
  );
}

export default Cart;
