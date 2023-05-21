import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateOrderMutation } from "../src/redux/reducers/apiSlice";
import { initializeCart } from "../src/redux/reducers/usersCartSlice";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmationModal from "../src/components/ConfirmationModal";
import { useRouter } from "next/router";

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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { cart: usersCart, cartId } = useSelector((state) => state.usersCart);
  const [updateOrder] = useUpdateOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { success, canceled } = router.query;

  const checkout = async (id) => {
    console.log(id);
    updateOrder({ data: { isCart: false }, id });
    // let { data } = await createNewOrder({
    // 	userId: user.id,
    // 	isCart: true,
    // 	address: 'some address',
    // });
    // dispatch(initializeCart({ ...data, lineItems: [] }));
    //maybe redirect to home page
  };

  const handleOrderConfirmation = async () => {
    // Perform actions for order confirmation, then open the modal
    setIsModalOpen(true);
    await checkout(usersCart.id);
  };

  const handleOrderCanceled = () => {
    // Perform actions for order confirmation, then open the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (success === "true") {
      handleOrderConfirmation();
    } else if (canceled === "true") {
      handleOrderCanceled();
    }
  }, [success, canceled, usersCart]);

  return (
    <CheckoutContainer>
      {isModalOpen && (
        <ConfirmationModal onClose={handleCloseModal} success canceled />
      )}
      <h2>Checkout</h2>
      <br></br>
      <ProductsContainer>
        {(usersCart ? usersCart : cart)?.lineItems?.map((product) => (
          <>
            <div className="product">
              <p>
                {product.product.name} ({product.qty})
              </p>
              <p>
                {Math.round(
                  (product.product.price * product.qty + Number.EPSILON) * 100
                ) / 100}
              </p>
              {/* {setTotal(total + (product.price * product.quantity))} */}
            </div>
            <br></br>
          </>
        ))}
      </ProductsContainer>
      <TotalContainer>
        <h2>Total:</h2>
        {Math.round(
          ((usersCart ? usersCart : cart)?.lineItems?.reduce(
            (prev, curr) => curr.product.price * curr.qty + prev,
            0
          ) +
            Number.EPSILON) *
            100
        ) / 100}
      </TotalContainer>
      {/* <ConfirmOrder>
        <button onClick={() => checkout(usersCart.id)} className="mainButton">
          Confirm Order
        </button>
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <input
              type="hidden"
              name="data"
              value={JSON.stringify(usersCart.lineItems)}
              readOnly
            ></input>
            <button type="submit" role="link" className="mainButton">
              Checkout
            </button>
          </section>
        </form>
      </ConfirmOrder> */}
    </CheckoutContainer>
  );
};

export default Checkout;
