import React from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";
import { storeUser, removeUser } from "../redux/reducers/user-slice";
// import { clearCart } from "../redux/reducers/cart-slice";
import { RemoveSSRFromComponent } from "../utils";
// react-icons
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { GiMeatCleaver } from "react-icons/gi";
import { BiLogIn, BiLogOut } from "react-icons/bi";

const headerMainHeight = "4em";
const headerTopHeight = "2em";

const HeaderContainer = styled.div`
  color: white;
  height: ${headerMainHeight + headerTopHeight};
  h1,
  p {
    :hover {
      color: lightgray;
    }
  }
`;
const HeaderTop = styled.div`
  height: ${headerTopHeight};
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
  height: ${headerMainHeight};
  background-color: #8b0000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .headerIconButton {
    background-color: #7B0000;
    width: ${headerMainHeight};
    height: ${headerMainHeight};

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headerIconButton:active {
    background-color: #660000;
  }
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
  const { cart } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let userStatusLink = "/login";
  if (typeof window !== "undefined") {
    if (user.isLoggedIn) {
      userStatusLink = "/account/view";
    } else if (localStorage.user && !user) {
      // should probably verify user token if they try to go to account info / cart
      dispatch(storeUser(JSON.parse(localStorage.getItem("user"))));
      userStatusLink = "/account/view";
    }
  }

  const handleLogout = () => {
    // dispatch(clearCart());
    dispatch(removeUser());
    localStorage.removeItem("user");
    Router.push("/");
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        {user.isLoggedIn ? (
          <>
            {/* account link - displayed as email */}
            <Link href={userStatusLink}>
              <LinkContainer>
                <FaUser />
                <p>{user.user.email}</p>
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

        <Link href="/cart">
          <LinkContainer>
            <FaShoppingCart />
            <p>{`Cart (${cart.length})`}</p>
          </LinkContainer>
        </Link>
      </HeaderTop>

      <HeaderMain>
        <Link href="/">
          <div className="headerIconButton">
            <GiMeatCleaver size="2.4em" />
          </div>
        </Link>

        <Link href="/steaks">
          <h1>Steaks</h1>
        </Link>

        <Link href="/sushi">
          <h1>Sushi</h1>
        </Link>

        <Link href="/search?">
          <div className="headerIconButton">
            <FaSearch size="1.9em" />
          </div>
        </Link>
      </HeaderMain>
    </HeaderContainer>
  );
}

// disabling SSR for the header, because its contents depend on the localStorage
export default RemoveSSRFromComponent(Header);
