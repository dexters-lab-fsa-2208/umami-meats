import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-inline: 25px;

  color: black;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  /* position: absolute; */
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: rgb(127, 0, 0);
`;

const ConfirmationModal = ({ onClose, success, canceled }) => {
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent>
        {success ? (
          <>
            <ModalTitle>
              <h2>Order Confirmed</h2>
              <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalTitle>
            <p>
              Your order has been successfully placed. You will recieve a
              confirmation email in the email provided at checkout (Please allow
              up to 5 minutes for the email to send.)
            </p>
          </>
        ) : (
          <>
            <div>
              <h2>Order Canceled</h2>
              <CloseButton onClick={onClose}>Close</CloseButton>
            </div>
            <p>
              Your order has been successfully canceled. Feel free to keep
              shopping!
            </p>
          </>
        )}

        {/* <CloseButton onClick={onClose}>Close</CloseButton> */}
      </ModalContent>
    </ModalContainer>
  );
};

export default ConfirmationModal;
