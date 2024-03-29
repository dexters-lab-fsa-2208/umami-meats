import React, { useState, useEffect, useRef } from "react";
import {
  useUpdateSteakMutation,
  useUpdateSushiMutation,
} from "../../redux/reducers/apiSlice";
import styled from "styled-components";

const SwitchContainer = styled.label`
  right: 0;
  display: inline-block;
  width: 40px;
  height: 24px;
  position: relative;
`;

const Track = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isChecked }) =>
    isChecked ? "green" : "rgb(139,0,0)"};
  border-radius: 24px;
  transition: background-color 0.3s;
`;

const Thumb = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  transform: ${({ isChecked }) =>
    isChecked ? "translateX(16px)" : "translateX(0)"};
`;

const HiddenInput = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
`;

const ToggleSwitch = ({ item, handleUpdate, isSaved, setIsSaved }) => {
  const [isChecked, setIsChecked] = useState(item.featuredStatus);
  // console.log(item.featuredMessage);
  const messageRef = useRef(item.featuredMessage);

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (isSaved) {
      handleUpdate(item, isChecked, messageRef.current.value);
      setIsSaved(false);
    }
  }, [isSaved]);

  return (
    <>
      <SwitchContainer>
        <HiddenInput checked={isChecked} onChange={() => handleToggle()} />
        <Track isChecked={isChecked} />
        <Thumb isChecked={isChecked} />
      </SwitchContainer>
      <input
        hidden={!isChecked}
        type="textarea"
        ref={messageRef}
        placeholder={item.featuredMessage}
        // defaultValue={messageRef.current.value}
      />
    </>
  );
};

export default ToggleSwitch;
