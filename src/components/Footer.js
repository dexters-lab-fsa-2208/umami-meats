import Link from "next/link";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaPhone, FaWrench } from "react-icons/fa";

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

// this should probably be in a separate folder (because header is also using it)
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function Footer() {
  const user = useSelector(state => state.user);

  if (user.user?.isAdmin) {
    // console.log('user is admin')
    // should verify their token here before giving access to admin tools
  }

  return (
    <FooterContainer>
      {user.user?.isAdmin ?
        <Link href="/admin">
          <LinkContainer>
            <FaWrench />
            <p>Administrator Tools</p>
          </LinkContainer>
        </Link>
      : <></>
      }

      <Link href="/contact">
        <LinkContainer>
          <FaPhone />
          <p>Contact</p>
        </LinkContainer>
      </Link>
    </FooterContainer>
  );
}
