import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cart-slice";

const MainProductContainer = styled.div`
  max-width: 100%;
  margin: 0 1em;

  > p {
    text-align: center;
    font-style: italic;
    margin: 0.4em;
  }
  .desc {
    margin-top: 0.5em;
  }
`;
const ProductContainerTop = styled.div`
  img {
    width: 55%;
  }

  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;
const ProductInfoRight = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const BuyProductContainer = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  .qty {
    display: flex;
    button {
      height: 1.8em;
      width: 1.8em;

      border: 0.1em solid gray;
      border-radius: 50%;
    }
    p {
      width: 1.5em;
      margin: 0 0.4em;
    }
  }
  .cartBtn {
    max-width: 80%;
    margin-top: 0.5em;
  }
`;

// COMPONENT STARTS HERE
function SingleItemView({ type, data }) {
  const [currentQty, setCurrentQty] = React.useState(1);

  const dispatch = useDispatch();

  const incrementAmt = (num) => {
    setCurrentQty(currentQty + num);
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
              <i>{"availability: " + printAvailability()}</i>
            </p>
            <ProductContainerTop>
              <img src={data.img} />

              <ProductInfoRight>
                <div>
                  <h1>{data.name}</h1>
                  <p>
                    <i>{`${data.price} / lb`}</i>
                  </p>
                </div>

                <BuyProductContainer>
                  <div className="qty">
                    <button onClick={() => incrementAmt(-1)}>-</button>
                    <p>{currentQty}</p>
                    <button onClick={() => incrementAmt(1)}>+</button>
                  </div>

                  <button
                    className="cartBtn"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          name: data.name,
                          image: data.img,
                          price: data.price,
                          quantity: currentQty,
                        })
                      );
                    }}
                  >
                    Add To Cart
                  </button>
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
