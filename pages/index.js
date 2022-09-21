import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useGetProductsQuery } from "../src/redux/reducers/apiSlice";

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
  console.log(data);

  const formatName = (string) => {
    if (string.length > 18) {
      return string.slice(0, 16) + "...";
    } else {
      return string;
    }
  };

  const [carouselIdx, setCarouselIdx] = React.useState(1);

  const carouselScroll = (idx) => {
    if (carouselIdx <= 1 && idx < 0) {
      setCarouselIdx(5);
    } else if (carouselIdx >= 5 && idx > 0) {
      setCarouselIdx(1);
    } else {
      setCarouselIdx(carouselIdx + idx);
    }
  };

  React.useEffect(() => {
    let interval = setInterval(() => carouselScroll(1), 5000);
    return () => clearInterval(interval);
  });

  return (
    <>
      {data ? (
        <>
          <Link href={`/${data[carouselIdx].type}/${carouselIdx}`}>
            <CarouselContainer>
              {data.map((itm, idx) => (
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
              ))}
            </CarouselContainer>
          </Link>
          <CarouselButton onClick={() => carouselScroll(-1)} className="left">
            {"<"}
          </CarouselButton>
          <CarouselButton onClick={() => carouselScroll(1)} className="right">
            {">"}
          </CarouselButton>

          <ListContainer>
            {data?.map((itm) => {
              return (
                <ListItemContainer id={itm.id}>
                  <img src={itm.img} />
                  <p>
                    <b>{formatName(itm.name)}</b>
                  </p>
                  <p>
                    <i>${itm.price}</i>
                  </p>
                </ListItemContainer>
              );
            })}
          </ListContainer>
        </>
      ) : (
        <p>Loading content</p>
      )}
    </>
  );
}
