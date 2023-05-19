import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";
import { addToCart, removeFromCart } from "../src/redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import {
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
  useGetSingleOrderQuery,
} from "../src/redux/reducers/apiSlice";
import {
  addToUsersCart,
  removeFromUsersCart,
} from "../src/redux/reducers/usersCartSlice";
// import { skipToken } from "@reduxjs/toolkit/dist/query";

const MainContainer = styled.div`
  margin: 0.9em;
  h2,
  h3 {
    margin: 0.5em 0.5em 0.6em;
  }
  #cartEmpty {
    padding: 0 0.8em;
    text-align: center;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 1em; */
  padding: 0 1em;
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.34);
  .singleProduct {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0.6em auto;
  }
`;

const Image = styled.img`
  min-width: 3.25em;
  max-width: 3.25em;
  height: 3.25em;
  object-fit: cover;
  box-shadow: 1px 1px 7px rgba(90, 90, 90, 0.22);
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
  p {
    margin-left: 0.7em;
    /* font-size: 0.95em; */
  }
`;

const IncrementAndPrice = styled.div`
  width: 100%;
  margin-top: 0.35em;
  padding-left: 0.7em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .cartPrice {
    font-weight: bold;
    margin-top: 0.15em;
  }
`;

const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5em 0;
  padding: 0 1em;
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 6px rgba(100, 100, 100, 0.3);
  h3 {
    text-align: center;
  }
  .checkoutLine {
    display: flex;
    justify-content: space-between;
    margin: 0.2em 0;
  }
  button {
    height: 2.3em;
    margin: 0.6em auto;
    box-shadow: 1px 1px 6px rgb(50, 50, 50, 0.3);
    display: flex;
    align-items: center;
  }
`;

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { cart: usersCart, isLoading } = useSelector(
    (state) => state.usersCart
  );
  const { isLoggedIn } = useSelector((state) => state.user);
  // const { data } = useGetSingleOrderQuery(
  //   isLoggedIn ? usersCart.id : skipToken
  // );

  const [deleteLineItem] = useDeleteLineItemMutation();
  const [updateLineItem] = useUpdateLineItemMutation();
  const dispatch = useDispatch();

  const removeLineItem = async (payload) => {
    if (
      !confirm(
        `Are you sure you want to remove ${payload.qty} pound${
          payload.qty > 1 ? "s" : ""
        } of ${payload.product.name} from your cart?`
      )
    ) {
      return;
    }

    if (isLoggedIn) {
      dispatch(removeFromUsersCart(payload.productId));
      await deleteLineItem(payload.id);
    } else {
      dispatch(removeFromCart(payload.productId));
    }
  };

  const handleUpdateItem = async (payload, num) => {
    let newData = { ...payload };
    let prevQty = payload.qty;
    await updateLineItem({
      data: {
        id: payload.id,
        orderId: usersCart.id,
        productId: payload.productId,
        qty: (prevQty += num),
      },
    });
    dispatch(addToUsersCart({ newData, num }));
  };

  return (
    <MainContainer>
      <h2>Your Cart</h2>
      {(isLoggedIn ? usersCart.lineItems : cart).length === 0 ? (
        <p id="cartEmpty">Your cart is empty!</p>
      ) : (
        <>
          <ProductsContainer>
            {(isLoggedIn ? usersCart.lineItems : cart)?.map((product, idx) => (
              <div key={idx}>
                <div className="singleProduct">
                  <Image
                    src={`/images/${product.product.name}.jpg`}
                    alt={product.product.name}
                  />
                  <DetailsContainer>
                    {" "}
                    <NameandX>
                      <p>{product.product.name}</p>
                      <button
                        className="secondaryButton xBtn"
                        onClick={() => removeLineItem(product)}
                      >
                        X
                      </button>
                    </NameandX>
                    <IncrementAndPrice>
                      <div className="incrementContainer incrementCart">
                        {isLoggedIn ? (
                          // If a user is logged in, access database
                          <button
                            className="incrementButton"
                            onClick={
                              product.qty <= 1
                                ? () => removeLineItem(product)
                                : () => handleUpdateItem(product, -1)
                            }
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="incrementButton"
                            onClick={
                              product.qty <= 1
                                ? () => removeLineItem(product)
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
                          </button>
                        )}

                        <p>{product.qty}</p>
                        {isLoggedIn ? (
                          <button
                            className="incrementButton"
                            onClick={() => handleUpdateItem(product, 1)}
                          >
                            +
                          </button>
                        ) : (
                          <button
                            className="incrementButton"
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
                          </button>
                        )}
                      </div>
                      <p className="cartPrice">
                        {`$${(product.product.price * product.qty).toFixed(2)}`}
                      </p>
                      {/* {(product.quantity <= 0) && dispatch(removeFromCart(product))} */}
                    </IncrementAndPrice>
                  </DetailsContainer>
                </div>

                {/* places a line below each item unless it is the last in the cart */}
                {idx + 1 !==
                  (isLoggedIn ? usersCart.lineItems : cart).length && <hr />}
              </div>
            ))}
          </ProductsContainer>

          <Checkout>
            <h3>Checkout</h3>
            <div>
              <div className="checkoutLine">
                <p>Subtotal</p>
                <p>{`$${(isLoggedIn ? usersCart.lineItems : cart)
                  .reduce(
                    (total, itm) => itm.qty * itm.product.price + total,
                    0
                  )
                  .toFixed(2)}`}</p>
              </div>
              <div className="checkoutLine">
                <p>Shipping</p> <p>Calculated at Checkout</p>
              </div>
            </div>

            {/* checkout button */}
            {isLoggedIn ? (
              <Link href={"/checkout"}>
                <button className="mainButton">Checkout</button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="secondaryButton">Log In to Checkout!</button>
              </Link>
            )}
          </Checkout>
        </>
      )}
    </MainContainer>
  );
}

export default Cart;
