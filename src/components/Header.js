import React, { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";
import { storeUser, removeUser } from "../redux/reducers/user-slice";
import { clearUserCart } from "../redux/reducers/cart-slice";
import { RemoveSSRFromComponent } from "../utils";

// react-icons
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { GiMeatCleaver } from "react-icons/gi";
import { BiLogIn, BiLogOut } from "react-icons/bi";

const HeaderContainer = styled.div`
  color: white;
  height: 7em;
  h1,
  p {
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
  height: 5em;
  background-color: darkred;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartCounter = styled.div`
  position: relative;
`;

//COMPONENT STARTS HERE
function Header() {
  const { cart, usersCart } = useSelector((state) => state.cart);
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let userStatusLink = "/login";
  if (typeof window !== "undefined") {
    if (isLoggedIn) {
      userStatusLink = "/account/view";
    } else if (localStorage.user && !user) {
      // should probably verify user token if they try to go to account info / cart
      dispatch(storeUser(JSON.parse(localStorage.getItem("user"))));
      userStatusLink = "/account/view";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
    // clears the users cart in redux storage only on log out, workaround for removing persistence
    dispatch(clearUserCart());
    Router.push("/");
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        {isLoggedIn ? (
          <>
            {/* account link - displayed as email */}
            <Link href={userStatusLink}>
              <LinkContainer>
                <FaUser />
                <p>{user.email}</p>
              </LinkContainer>
            </Link>
            {/* logout link */}
            <Link href="/">
              <LinkContainer onClick={handleLogout}>
                <BiLogOut />
                <p>Logout</p>
              </LinkContainer>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <LinkContainer>
                <BiLogIn />
                <p>Login</p>
              </LinkContainer>
            </Link>
          </>
        )}
        {isLoggedIn && usersCart ? (
          <Link href="/cart">
            <LinkContainer>
              <FaShoppingCart />
              <p>{`Cart (${usersCart.length})`}</p>
            </LinkContainer>
          </Link>
        ) : (
          <Link href="/cart">
            <LinkContainer>
              <FaShoppingCart />
              <p>{`Cart (${cart.length})`}</p>
            </LinkContainer>
          </Link>
        )}
      </HeaderTop>

      <HeaderMain>
        <Link href="/">
          <LinkContainer>
            <GiMeatCleaver size="2.4em" />
          </LinkContainer>
        </Link>

        <Link href="/steaks">
          <h1>Steaks</h1>
        </Link>

        <Link href="/sushi">
          <h1>Sushi</h1>
        </Link>

        <FaSearch size="1.9em" />
      </HeaderMain>
    </HeaderContainer>
  );
}

// disabling SSR for the header, because its contents depend on the localStorage
export default RemoveSSRFromComponent(Header);
