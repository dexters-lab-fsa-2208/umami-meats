import React from "react";
import styled from "styled-components";
import {
  useGetProductsQuery,
  useUpdateSteakMutation,
  useUpdateSushiMutation,
} from "../../redux/reducers/apiSlice";
import Link from "next/link";
import ToggleSwitch from "../tools/ToggleSwitch";

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

export default function UpdateFeatured() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [updateSteak] = useUpdateSteakMutation();
  const [updateSushi] = useUpdateSushiMutation();

  const handleSave = async (item) => {
    item.type === "sushi"
      ? await updateSushi({
          id: item.id,
          data: { featuredStatus: !item.featuredStatus },
        })
      : await updateSteak({
          id: item.id,
          data: { featuredStatus: !item.featuredStatus },
        });
  };

  // await updateParlay({
  //   id: parlay.id,
  //   payload: {
  //     isActive: false,
  //     status: "completed",
  //     result: "lost",
  //   },
  // });

  return (
    <>
      <ul>
        <li>Edit main featured items</li>
        <ListContainer>
          {data
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((itm) => {
              console.log(itm);
              return (
                <ListItemContainer key={itm.id}>
                  <img
                    src={`/images/${itm.name}.jpg`}
                    alt={itm.name || "product"}
                  />
                  <Link href={`/${itm.type}/${itm.id}`}>
                    <p className="productName">{itm.name}</p>
                  </Link>
                  <ToggleSwitch item={itm} />
                  <p className="productPrice">${itm.price}/lb</p>
                  <button onClick={() => handleSave(itm)}>Save</button>
                </ListItemContainer>
              );
            })}
        </ListContainer>
        <li>Edit secondary featured items</li>
      </ul>
    </>
  );
}
