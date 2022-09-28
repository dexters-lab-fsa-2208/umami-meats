import React, { useEffect } from "react";
//next
import Link from "next/link";
// can maybe use <picture></picture> to remove 'img' error from next.js
// redux
import {
  useCreateOrderMutation,
  useGetProductsQuery,
  useGetSingleUserQuery,
} from "../src/redux/reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { initializeCart } from "../src/redux/reducers/usersCart-slice";
import { Loading } from "../src/components";
// design
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

// need to clean up this CSS/styled-components
const customGray = "rgba(120, 120, 120, 0.1)";

const HomePageContainer = styled.div`

  @media screen and (min-width: 1000px) {
    .carouselItem > img {
      border-left: 1px solid ${customGray};
      border-right: 1px solid ${customGray};
      border-bottom: 1px solid rgba(120, 120, 120, 0.25);
      box-shadow: 1px 1px 7px rgba(120, 120, 120, 1);
    }
  }

  .carouselItem {
    min-width: 100%;
    width: 100%;
    height: 15rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;
const CarouselButton = styled.button`
  z-index: 99;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 16em;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
  border: 0;

  :hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 1);
    /* these transitions work for now, but should be centralized later */
    /* i think the easiest method would be to set all buttons/links to transition colors this way */
    /* -webkit-transition: background-color 500ms linear;
    -webkit-transition: color 500ms linear;
    -ms-transition: background-color 500ms linear;
    -ms-transition: color 500ms linear; */
    transition: background-color 500ms linear;
    transition: color 500ms linear;
  }

  &.left {
    border-radius: 0 3px 3px 0;
    left: 0;
    padding: 0;
  }

  &.right {
    border-radius: 3px 0 0 3px;
    right: 0;
  }
`;

// PRODUCTS CONTAINER
const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

  margin: 0.5em;
`;

// SINGLE PRODUCT IN LIST
const ListItemContainer = styled.div`
  max-width: 160px;
  min-height: 250px;

  margin: 0.6em;
  padding-bottom: 0.5em;
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 7px rgba(100, 100, 100, 0.43);

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    min-height: 130px;
    max-height: 130px;
    width: 130px;

    object-fit: cover;
    box-shadow: 1px 1px 6px rgba(100, 100, 100, 0.31);

    margin: 0.4em auto 0;
  }
  p {
    text-align: center;
    max-width: 80%;
    margin: 0.15em auto;

    &.productName {
      font-size: 1em;
      font-weight: bold;
      margin: auto;
    }
    &.productPrice {
      font-size: 0.85em;
      font-style: italic;
      /* color: red; */
      margin: 0 auto 0.2em;
    }
  }

  button {
    margin: 0.15em auto 0.7em;
  }
`;

export default function HomePage() {
  const { data, isLoading } = useGetProductsQuery();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  // skipToken is a parameter provided by RTK to conditionally query data based on condition passed
  // in our case, it will be if a user is Logged in (skip if false)

  const [createNewOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // check users orders after sign in,

    const checkForCart = async () => {
      const { data: blah } = await axios.get(`/api/users/${user.id}`);
      const lastOrder = blah.orders[blah.orders.length - 1];
      // if a user has 0 orders, create new order
      // or if last order in orders is false (checked out already)
      // last item in user orders shud always be the working order,
      // previous orders should all have isCart === false
      if (blah && (blah.orders.length === 0 || !lastOrder.isCart)) {
        let { data } = await createNewOrder({
          userId: user.id,

          isCart: true,
          address: "address of user",
        });
        // initialize the new order id and line items to redux store
        // maybe somehow use apislice only depending on which has better preformance
        dispatch(initializeCart({ ...data, lineItems: [] }));
      }

      // If the last order in the cart is still a cart, initialize the cartId into redux store
      // for useage all around the app
      if (user && blah.orders[0]?.isCart) {
        // initialize the new order id and line items to redux store
        // maybe somehow use apislice only depending on which has better preformance
        console.log("DB to redux", blah);
        dispatch(initializeCart(blah.orders[blah.orders.length - 1]));
      }
    };

    user?.id ? checkForCart() : console.log("sign in stoopid");
  }, []);


  const [carouselIdx, setCarouselIdx] = React.useState(0);

  const carouselScroll = (idx) => {
    if (carouselIdx <= 0 && idx < 0) {
      setCarouselIdx(data.length - 1);
    } else if (carouselIdx >= data.length - 1 && idx > 0) {
      setCarouselIdx(0);
    } else {
      setCarouselIdx(carouselIdx + idx);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => carouselScroll(1), 5000);
    return () => clearInterval(interval);
  });

  if (!data) {
    return <Loading />;
  } else
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <HomePageContainer>
          <CarouselContainer>
            {data.map((itm, idx) => (
              <Link href={`/${itm.type}/${itm.id}`} key={itm.id}>
                <div
                  className="carouselItem"
                  key={idx}
                  style={{
                    transform: `translate(${carouselIdx * -100}%`,
                    transition: "0.4s",
                  }}
                >
                  {/* <>{itm.name}</> */}
                  <img src={itm.img} alt={itm.name || "product"}/>
                </div>
              </Link>
            ))}
          </CarouselContainer>
          <CarouselButton onClick={() => carouselScroll(-1)} className="left">
            {"<"}
          </CarouselButton>
          <CarouselButton onClick={() => carouselScroll(1)} className="right">
            {">"}
          </CarouselButton>

          <ListContainer>
            {data?.map((itm) => {
              return (
                <Link href={`/${itm.type}/${itm.id}`} key={itm.id}>
                  <ListItemContainer>
                    <img src={itm.img} alt={itm.name}/>
                    <p className="productName">{itm.name}</p>
                    <p className="productPrice">${itm.price}</p>
                  </ListItemContainer>
                </Link>
              );
            })}
          </ListContainer>
        </HomePageContainer>
      </motion.div>
    );
}
