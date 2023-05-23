import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

// Styled component for the modal overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

// Styled component for the modal content
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  padding-inline: 3%;
  width: 100%;
  max-width: 85vw;

  img {
    width: auto !important;
  }
`;

// Styled component for the form inputs
const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

// Styled component for the save button
const SaveButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditModal = ({ item, onSave, onClose }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  const handleSave = () => {
    const updatedObject = { name, price };
    onSave(item, updatedObject);
    onClose();
  };

  console.log(name);

  return (
    <Overlay>
      <ModalContent>
        <h2>Edit Object</h2>
        <Image
          src={`/images/${item.name}.jpg`}
          height="200px"
          width="200px"
          alt="Product Image"
        />
        <input type="file" name="myImage" />
        <FormInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div>
          <SaveButton onClick={handleSave}>Save</SaveButton>
          <button onClick={onClose}>Cancel</button>
        </div>
      </ModalContent>
    </Overlay>
  );
};

export default EditModal;
