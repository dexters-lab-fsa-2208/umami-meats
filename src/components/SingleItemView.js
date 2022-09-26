import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cart-slice";
import { useCreateLineItemMutation } from "../redux/reducers/apiSlice";

const MainProductContainer = styled.div`
  max-width: 100%;
  margin: 0 1em;
  overflow-wrap: break-word;

  > p {
    text-align: center;
    font-style: italic;
    margin: 0.4em;
  }
  .desc {
    text-align: justify;
    margin-top: 0.8em;
  }
`;
const ProductContainerTop = styled.div`
  img {
    width: 55%;
  }
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const ProductInfoRight = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 0.1em;
`;
const BuyProductContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  > .incrementContainer {
    margin: 0.5em 0;
  }
`;

// COMPONENT STARTS HERE
function SingleItemView({ type, data }) {
  const [currentQty, setCurrentQty] = React.useState(1);
  const { cart, cartId } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [createLineItem] = useCreateLineItemMutation();
  console.log(cart.length);

  const dispatch = useDispatch();

  const incrementAmt = (num) => {
    if (currentQty > 1) {
      setCurrentQty(currentQty + num);
    } else if (currentQty === 1 && num > 0) {
      setCurrentQty(currentQty + num);
    }
  };

  const printAvailability = () => {
    // this number can be changed
    if (data.qty > 10) {
      return "in stock!";
    } else if (data.qty <= 0) {
      return "out of stock!";
    } else {
      return `${data.qty} left in stock!`;
    }
  };

  return (
    <>
      {data ? (
        <>
          <MainProductContainer>
            <p>
              <i>{"Availability: " + printAvailability()}</i>
            </p>
            <ProductContainerTop>
              <img src={data.img} />

              <ProductInfoRight>
                <div>
                  <h2>{data.name}</h2>
                  <p>
                    <i>{`${data.price} / lb`}</i>
                  </p>
                </div>

                <BuyProductContainer>
                  <div className="incrementContainer">
                    <button onClick={() => incrementAmt(-1)} className="incrementButton">-</button>
                    <p>{currentQty}</p>
                    <button onClick={() => incrementAmt(1)} className="incrementButton">+</button>
                  </div>

                  {/* if a user is logged in, onClick will post new line items
              if user is not logged in, dispatch to redux store */}
                  {isLoggedIn ? (
                    <button
                      className="mainButton"
                      onClick={() =>
                        createLineItem({
                          orderId: cartId,
                          productId: product.id,
                          qty: 1,
                        })
                      }
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      className="mainButton"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: cart.length - 1,
                            name: product.name,
                            image: product.img,
                            price: product.price,
                            quantity: 1,
                          })
                        )
                      }
                    >
                      Add To Cart
                    </button>
                  )}
                </BuyProductContainer>
              </ProductInfoRight>
            </ProductContainerTop>

            <p className="desc">{data.desc}</p>
          </MainProductContainer>

          {/* Recommended Products can go down here if we have time */}
        </>
      ) : (
        <p>Loading content</p>
      )}
    </>
  );
}

export default SingleItemView;
