import Link from "next/link";
import styled from "styled-components";
import { FaShoppingCart, FaUser, FaSearch, FaWrench } from "react-icons/fa";

const HeaderContainer = styled.div`
  color: white;
  height: 10%;

  h1, p {
    :hover {
        color: lightgray;    
    }
  }
`;
const HeaderTop = styled.div`
  height: 2em;
  background-color: black;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  * {
    margin: auto 0;
  }
  p {
    padding: 0 0.4em 0.15em;
  }
`;
const HeaderMain = styled.div`
  height: 4em;
  background-color: darkred;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTop>
        <FaUser />
        <Link href="/account">
          <p>Account</p>
        </Link>
        <FaShoppingCart />
        <Link href="/cart">
          <p>Cart</p>
        </Link>
      </HeaderTop>

      <HeaderMain>
        <Link href="/">
          <h1>Logo</h1>
        </Link>

        <Link href="/steaks">
          <h1>Steaks</h1>
        </Link>

        <Link href="/sushi">
          <h1>Sushi</h1>
        </Link>

        <FaSearch />
      </HeaderMain>
    </HeaderContainer>
  );
}
