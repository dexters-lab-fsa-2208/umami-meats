import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  addToCart,
  addToUsersCart,
  removeFromCart,
  removeFromUsersCart,
} from "../src/redux/reducers/cart-slice";
import { useDispatch } from "react-redux";
import {
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
} from "../src/redux/reducers/apiSlice";

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
// Remove item from cart

function Cart() {
  const { cart, cartId, usersCart } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);

  const [deleteLineItem] = useDeleteLineItemMutation();
  const [updateLineItem] = useUpdateLineItemMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(usersCart);
    isLoggedIn ? console.log(usersCart) : console.log(cart);
  }, [cart, usersCart, isLoggedIn]);

  const handleRemoveLineItem = async (payload) => {
    dispatch(removeFromUsersCart(payload.productId));
    await deleteLineItem(payload.id);
  };

  const handleUpdateItem = async (payload, num) => {
    let newData = { ...payload };
    let prevQty = payload.qty;
    await updateLineItem({
      id: payload.id,
      data: {
        orderId: cartId,
        productId: payload.productId,
        qty: (prevQty += num),
      },
    });
    dispatch(addToUsersCart({ newData, num }));
  };

  return (
    <Container>
      <CartHeader>Cart 6</CartHeader>
      <Middle>
        <ProductsContainer>
          {(isLoggedIn && usersCart ? usersCart : cart).map((product) => (
            <Products key={product.productId}>
              <Image src={product.product.img} alt="sushi" />
              <DetailsContainer>
                {" "}
                <NameandX>
                  <ProductName>{product.product.name}</ProductName>
                  {isLoggedIn ? (
                    <button onClick={() => handleRemoveLineItem(product)}>
                      X
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch(removeFromCart(product.productId))
                      }
                    >
                      X
                    </button>
                  )}
                </NameandX>
                <IncrementAndPrice>
                  <IncrementContainer>
                    {isLoggedIn ? (
                      // If a user is logged in, access database
                      <QuantityButton
                        onClick={
                          product.qty <= 1
                            ? () => handleRemoveLineItem(product)
                            : () => handleUpdateItem(product, -1)
                        }
                      >
                        -
                      </QuantityButton>
                    ) : (
                      <QuantityButton
                        onClick={
                          product.qty <= 1
                            ? () => dispatch(removeFromCart(product.productId))
                            : () =>
                                dispatch(
                                  addToCart({
                                    orderId: null,
                                    productId: product.product.id,
                                    qty: -1,
                                    product: product.product,
                                  })
                                )
                        }
                      >
                        -
                      </QuantityButton>
                    )}

                    <Quantity>{product.qty}</Quantity>
                    {isLoggedIn ? (
                      <QuantityButton
                        onClick={() => handleUpdateItem(product, 1)}
                      >
                        +
                      </QuantityButton>
                    ) : (
                      <QuantityButton
                        onClick={() =>
                          dispatch(
                            addToCart({
                              orderId: null,
                              product: product.product,
                              productId: product.product.id,
                              qty: 1,
                            })
                          )
                        }
                      >
                        +
                      </QuantityButton>
                    )}
                  </IncrementContainer>

                    <Total>
                      $
                      {Math.round(
                        (product.product.price * product.qty + Number.EPSILON) *
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
                    ((isLoggedIn ? usersCart : cart).reduce(
                      (prev, curr) =>
                        Number(curr.product.price) * Number(curr.qty) +
                        Number(prev),
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
