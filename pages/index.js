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

const ListContainer = styled.div`
  margin: 1em 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;
const ListItemContainer = styled.div`
  width: 10em;
  height: 15em;
  
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
      return (string.slice(0,16) + "...");
    } else {
      return string;
    }
  }

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
  })

  return (
    <>
      <CarouselContainer>
        {data ? (
          data.map((itm, idx) => (
            <CarouselItem
              key={idx}
              style={{transform: `translate(${carouselIdx * -100}%`, transition: "0.25s"}}
            >
              {/* <>{itm.name}</> */}
              <img src={itm.img} />
            </CarouselItem>
          ))
        ) : (
          <p>Loading content</p>
        )}
      </CarouselContainer>
      {/* tmp buttons */}
      <button onClick={() => carouselScroll(-1)}>prev carousel item</button>
      <button onClick={() => carouselScroll(1)}>next carousel item</button>

      <ListContainer>
          {data?.map((itm) => {
            return (<ListItemContainer id={itm.id}>
              <img src={itm.img} />
              <p><b>{formatName(itm.name)}</b></p>
              <p><i>${itm.price}</i></p>
            </ListItemContainer>)
          })}
      </ListContainer>
    </>
  );
}
