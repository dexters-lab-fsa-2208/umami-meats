import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from "../src/redux/reducers/apiSlice";
import { initializeCart } from "../src/redux/reducers/usersCart-slice";

const CheckoutContainer = styled.div`
  max-width: 675px;
  margin: 2em auto;

  display: flex column;
  justify-content: center;
  text-align: center;
`;

const ProductsContainer = styled.div`
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.2);
  font-size: 1.05em;

  .product {
    margin: 0.4em 0 0.1em;
    padding: 0.5em 0.8em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .lineItemPrice {
        font-size: 1.12em;
        /* font-weight: bold; */
    }
  }
  hr {
    width: 97%;
    margin: auto;
  }
`;

const TotalContainer = styled.div`
  margin: 1.1em 0 0.5em;
`;

const ConfirmOrder = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { cart: usersCart, cartId } = useSelector((state) => state.usersCart);
  const { user } = useSelector((state) => state.user);
  const [updateOrder] = useUpdateOrderMutation();
  const [createNewOrder] = useCreateOrderMutation();
  console.log(usersCart);

  const dispatch = useDispatch();

  const checkout = async (id) => {
    console.log(id);
    await updateOrder({ data: { isCart: false }, id });
    let { data } = await createNewOrder({
      userId: user.id,
      isCart: true,
      address: "some address",
    });
    //maybe redirect to home page
    dispatch(initializeCart({ ...data, lineItems: [] }));
  };

  // const [total, setTotal] = useState(0)

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      <br></br>
      <ProductsContainer>
        {(usersCart ? usersCart : cart).map((product, idx) => (
          <>
            <div className="product">
              <p>
                {product.product.name} ({product.qty})
              </p>
              <p>
                {"$" + Math.round(
                  (product.product.price * product.qty + Number.EPSILON) * 100
                ) / 100}
              </p>
              {/* {setTotal(total + (product.price * product.quantity))} */}
            </div>
            {!(idx + 1 === (usersCart ? usersCart : cart).length) && <hr />}
          </>
        ))}
      </ProductsContainer>
      <TotalContainer>
        <h2>{"Total: $" +
        
          Math.round(
            ((usersCart ? usersCart : cart).reduce(
              (prev, curr) => curr.product.price * curr.qty + prev,
              0
            ) +
              Number.EPSILON) *
              100
          ) / 100}
        </h2>
      </TotalContainer>
      <ConfirmOrder>
        <button onClick={() => checkout(usersCart[0].orderId)} className="mainButton">Checkout</button>
      </ConfirmOrder>
    </CheckoutContainer>
  );
};

export default Checkout;
