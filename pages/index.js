import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  useGetProductsQuery,
  useGetFeaturedProductsQuery,
  // useGetSingleUserQuery,
} from "../src/redux/reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { initializeCart } from "../src/redux/reducers/usersCart-slice";
import { Loading, Error } from "../src/components";
// design
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import ConfirmationModal from "../src/components/Modals/ConfirmationModal";

const customGray = "rgba(120, 120, 120, 0.1)";

const HomePageContainer = styled.div`
  @media screen and (min-width: 800px) {
    .carouselItem > img {
      border-left: 1px solid ${customGray};
      border-right: 1px solid ${customGray};
      border-bottom: 1px solid rgba(120, 120, 120, 0.25);
      box-shadow: 1px 1px 7px rgba(120, 120, 120, 0.5);
      &:hover {
        cursor: pointer;
      }
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
  z-index: 40;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 19em;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
  border: 0;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 1);
    transition: background-color 300ms linear;
    transition: color 200ms linear;
  }

  &#leftBtn {
    border-radius: 0 3px 3px 0;
    left: 0;
    padding: 0;
  }

  &#rightBtn {
    border-radius: 3px 0 0 3px;
    right: 0;
    padding: 0;
  }

  @media screen and (min-width: 950px) {
    &#leftBtn {
      left: calc(50% - 475px);
    }
    &#rightBtn {
      right: calc(50% - 475px);
    }
  }
`;

// PRODUCTS CONTAINER
// product width is 160px + 1.2em
const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: 9px auto;
  ::after {
    content: "";
    flex: auto;
  }

  /* if anyone sees this, i'm sorry */
  @media screen and (min-width: 914px) {
    max-width: calc(calc(160px + 1.2em) * 5);
  }
  @media screen and (max-width: 914px) and (min-width: 717px) {
    max-width: calc(calc(160px + 1.2em) * 4);
  }
  @media screen and (max-width: 717px) and (min-width: 537px) {
    max-width: calc(calc(160px + 1.2em) * 3);
  }
  @media screen and (max-width: 537px) and (min-width: 358px) {
    max-width: calc(calc(160px + 1.2em) * 2);
  }
  @media screen and (max-width: 358px) {
    max-width: calc(calc(160px + 1.2em) * 1);
  }
`;

// SINGLE PRODUCT IN LIST
const ListItemContainer = styled.div`
  width: 160px;
  max-width: 160px;
  min-height: 250px;

  margin: 0.6em;
  padding-bottom: 0.5em;
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 8px rgba(100, 100, 100, 0.35);

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    min-height: 130px;
    max-height: 130px;
    width: 130px;
    margin: 0.4em auto 0;
    object-fit: cover;
    box-shadow: 1px 1px 6px rgba(100, 100, 100, 0.31);
    &:hover {
      cursor: pointer;
    }
  }
  p {
    text-align: center;
    max-width: 80%;
    margin: 0.15em auto;

    &.productName {
      font-size: 1em;
      font-weight: bold;
      margin: auto;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
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
  const { data, isLoading, error } = useGetProductsQuery();
  const {
    data: featured,
    isLoading: featuredLoading,
    error: featuredError,
  } = useGetFeaturedProductsQuery();

  const [carouselIdx, setCarouselIdx] = useState(0);

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
    if (!isLoading && !error) {
      let interval = setInterval(() => carouselScroll(1), 5000);
      return () => clearInterval(interval);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <Error is500={error.status === 500} />;
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
                  <img
                    src={`images/${itm.name}.jpg`}
                    alt={itm.name || "product"}
                  />
                </div>
              </Link>
            ))}
          </CarouselContainer>
          <CarouselButton onClick={() => carouselScroll(-1)} id="leftBtn">
            {"<"}
          </CarouselButton>
          <CarouselButton onClick={() => carouselScroll(1)} id="rightBtn">
            {">"}
          </CarouselButton>

          <ListContainer>
            {featured?.map((itm) => {
              return (
                <Link href={`/${itm.type}/${itm.id}`} key={itm.id}>
                  <ListItemContainer>
                    <img
                      src={`/images/${itm.name}.jpg`}
                      alt={itm.name || "product"}
                    />
                    <p className="productName">{itm.name}</p>
                    <p className="productPrice">${itm.price}/lb</p>
                    <p>{itm.featuredMessage}</p>
                  </ListItemContainer>
                </Link>
              );
            })}
          </ListContainer>
        </HomePageContainer>
      </motion.div>
    );
}
