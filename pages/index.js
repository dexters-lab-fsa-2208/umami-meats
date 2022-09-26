import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  useCreateOrderMutation,
  useGetProductsQuery,
  useGetSingleUserQuery,
} from "../src/redux/reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { initializeCart } from "../src/redux/reducers/cart-slice";
import { Loading } from "../src/components";
import { motion } from "framer-motion";

const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;
const CarouselItem = styled.div`
  min-width: 100%;
  width: 100%;
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
    -webkit-transition: background-color 500ms linear;
    -webkit-transition: color 500ms linear;
    -ms-transition: background-color 500ms linear;
    -ms-transition: color 500ms linear;
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

const ListContainer = styled.div`
  margin: 1em auto;
  display: flex;
  flex-flow: row wrap;
  max-width: fit-content;
  justify-content: space-around;
`;
const ListItemContainer = styled.div`
  width: 10em;
  height: 15em;
  margin: 10px;

  img {
    border: 1px solid black;
    width: 100%;
    height: 66%;
    object-fit: cover;
  }
`;

export default function HomePage() {
  const { data, isLoading } = useGetProductsQuery();

  const { user, isLoggedIn } = useSelector((state) => state.user);
  // skipToken is a parameter provided by RTK to conditionally query data based on condition passed
  // in our case, it will be if a user is Logged in (skip if false)
  const { data: userInstance } = useGetSingleUserQuery(
    isLoggedIn ? user.id : skipToken
  );
  const [createNewOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // check users orders after sign in,
    const checkForCart = async (userInstance) => {
      userInstance &&
        console.log(
          userInstance.orders[userInstance.orders.length - 1].lineItems
        );
      if (
        userInstance &&
        // if a user has 0 orders, create new order
        (userInstance.orders.length < 1 ||
          // or if last order in orders is false (checked out already)
          // last item in user orders shud always be the working order,
          // previous orders should all have isCart === false
          !userInstance.orders[userInstance.orders.length - 1].isCart)
      ) {
        await createNewOrder({
          userId: userInstance.id,
          isCart: true,
          address: "address of user",
        });
        // initialize the new order id and line items to redux store
        // maybe somehow use apislice only depending on which has better preformance
        dispatch(
          initializeCart({
            id: userInstance.orders[userInstance.orders.length - 1].id,
            order:
              userInstance.orders[userInstance.orders.length - 1].lineItems,
          })
        );
      }
      // If the last order in the cart is still a cart, initialize the cartId into redux store
      // for useage all around the app
      if (
        userInstance &&
        userInstance.orders[userInstance.orders.length - 1].isCart
      ) {
        // initialize the new order id and line items to redux store
        // maybe somehow use apislice only depending on which has better preformance
        dispatch(
          initializeCart({
            id: userInstance.orders[userInstance.orders.length - 1].id,
            order: userInstance.orders[userInstance.orders.length - 1],
          })
        );
      }
    };
    checkForCart(userInstance);
  }, [createNewOrder, userInstance, dispatch]);

  const formatName = (string) => {
    if (string.length > 18) {
      return string.slice(0, 16) + "...";
    } else {
      return string;
    }
  };

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

  React.useEffect(() => {
    let interval = setInterval(() => carouselScroll(1), 5000);
    return () => clearInterval(interval);
  });

  if (!data) {
    return (
      // <motion.div
      //   initial={{opacity: 0}}
      //   animate={{opacity: 1}}
      //   // exit={{opacity: 0}}
      // >
      <Loading />
      // </motion.div>
    );
  } else
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <CarouselContainer>
          {data.map((itm, idx) => (
            <Link href={`/${itm.type}/${itm.id}`} key={itm.id}>
              <CarouselItem
                key={idx}
                style={{
                  transform: `translate(${carouselIdx * -100}%`,
                  transition: "0.4s",
                }}
              >
                {/* <>{itm.name}</> */}
                <img src={itm.img} />
              </CarouselItem>
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
                  <img src={itm.img} />
                  <p>
                    <b>{formatName(itm.name)}</b>
                  </p>
                  <p>
                    <i>${itm.price}</i>
                  </p>
                </ListItemContainer>
              </Link>
            );
          })}
        </ListContainer>
      </motion.div>
    );
}
