import Link from "next/link";
import styled from "styled-components";
import { FaPhone } from "react-icons/fa";

const FooterContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 2em;
  bottom: -1px;

  background-color: darkred;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  * {
    margin: auto 0;
  }
  p {
    padding: 0 0.4em 0.15em;
    :hover {
        color: lightgray;    
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FaPhone />
      <Link href="/contact">
        <p>Contact</p>
      </Link>
    </FooterContainer>
  );
}
