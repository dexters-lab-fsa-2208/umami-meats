import React, { useState } from "react";
import styled from "styled-components";
import {
  useGetProductsQuery,
  useUpdateSteakMutation,
  useUpdateSushiMutation,
} from "../../redux/reducers/apiSlice";
import Link from "next/link";
import ToggleSwitch from "../tools/ToggleSwitch";
import EditModal from "../Modals/EditModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
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
  align-items: center;

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
  input {
    max-width: 100%;
    margin-block: 5px;
    text-overflow: ellipsis;
  }

  .editContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default function UpdateFeatured() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [updateSteak] = useUpdateSteakMutation();
  const [updateSushi] = useUpdateSushiMutation();
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleUpdate = async (item, updated) => {
    item.type === "sushi"
      ? await updateSushi({
          id: item.id,
          data: updated,
        })
      : await updateSteak({
          id: item.id,
          data: updated,
        });
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <button className="mainButton" onClick={() => handleSave()}>
        Save Changes
      </button>
      {isModalOpen && (
        <EditModal
          onClose={handleCloseModal}
          item={selectedItem}
          onSave={handleUpdate}
        />
      )}
      <ListContainer>
        {[...data]
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

                <ToggleSwitch
                  item={itm}
                  handleUpdate={handleUpdate}
                  isSaved={isSaved}
                  setIsSaved={setIsSaved}
                />

                <p className="productPrice">${itm.price}/lb</p>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedItem(itm);
                  }}
                >
                  Edit
                </button>
              </ListItemContainer>
            );
          })}
      </ListContainer>
    </Container>
  );
}
