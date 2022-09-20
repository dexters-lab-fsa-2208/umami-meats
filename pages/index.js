import React from "react";
import styled from "styled-components";
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

export default function HomePage() {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data);

  const [carouselIdx, setCarouselIdx] = React.useState(1);

  const carouselScroll = (direction) => {
    if (direction === "back") {
      if (carouselIdx === 1) {
        setCarouselIdx(5);
      } else {
        setCarouselIdx(carouselIdx - 1)
      }
    } else {
      if (carouselIdx === 5) {
        setCarouselIdx(1);
      } else {
        setCarouselIdx(carouselIdx + 1);
      }
    }
  };

  React.useEffect(() => {
    let interval = setInterval(carouselScroll, 5000);
    return () => clearInterval(interval);
  })

  const moveCarousel = (direction) => {
    carouselScroll(direction);
  };

  return (
    <>
      <CarouselContainer>
        {data ? (
          data.map((itm, idx) => (
            <CarouselItem
              key={idx}
              style={{ transform: `translate(${carouselIdx * -100}%` }}
            >
              {/* <>{itm.name}</> */}
              <img src={itm.img} />
            </CarouselItem>
          ))
        ) : (
          <p>Loading content</p>
        )}
      </CarouselContainer>
      <button onClick={() => moveCarousel("back")}>prev carousel item</button>
      <button onClick={() => moveCarousel()}>next carousel item</button>
    </>
  );
}
