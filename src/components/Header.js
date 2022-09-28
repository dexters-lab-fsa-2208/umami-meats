import React, { useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";
import { storeUser, removeUser } from "../redux/reducers/user-slice";

import { RemoveSSRFromComponent } from "../utils";

import { clearUserCart } from "../redux/reducers/cart-slice";
import { useGetProductsQuery } from "../redux/reducers/apiSlice";

// react-icons
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { GiMeatCleaver } from "react-icons/gi";
import { BiLogIn, BiLogOut } from "react-icons/bi";
// utils
import { RemoveSSRFromComponent } from "../utils";

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
  width: 100%;
  height: ${headerMainHeight};
  background-color: #8b0000;

  @media screen and (min-width: 1000px) {
    background-color: #7b0000;

    > div {
      width: 1000px;
      margin: auto;
      background-color: #8b0000;
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .headerIconButton {
    background-color: #7b0000;
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

// const CartCounter = styled.div`
//   position: relative;
// `;

const searchBarWidth = "15em";
const searchTransition = "0.2s";

const SearchContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${headerMainHeight + headerTopHeight};
  
  transition: background-color 0.2s;
  transition: opacity 0.2s;
  background-color: rgba(50, 50, 50, 0.4);

  padding-top: 1.2em;
  input {
    font-size: 1.1em;
    top: 1em;
    width: ${searchBarWidth};
    margin: 0 auto;
  }

  display: flex column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .searchProductList {
    width: fit-content;
    margin: 0 auto;
    color: black;
    background-color: white;

    * {
      padding: 0.3em 0.7em;
      &:nth-child(even) {
        background-color: rgb(238,238,238);
      }
    }
  }
  
  &.hide {
    z-index: -100;
    opacity: 0;
    background-color: rgba(0,0,0,0);
  }
`;

// const SearchContainer = styled.div`
// position: absolute;
// display: flex column;
// // z-index: 2;
// color: black;
// // margin-top: 6em;
// justify-content: center;
// align-items: center;
// text-align: center;
// background-color: white;
// width: 100%;
// `;

//COMPONENT STARTS HERE
function Header() {
  const { cart } = useSelector((state) => state.cart);
  const { cart: usersCart } = useSelector((state) => state.usersCart);
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const { data: products, isLoading } = useGetProductsQuery();

  const [isSearchOpen, toggleSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const dispatch = useDispatch();

  let userStatusLink = "/login";
  if (typeof window !== "undefined") {
    if (isLoggedIn) {
      userStatusLink = "/account/view";
    } else if (localStorage.user && !user) {
      dispatch(storeUser(JSON.parse(localStorage.getItem("user"))));
      userStatusLink = "/account/view";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("persist:root");
    dispatch(removeUser());
    // clears the users cart in redux storage only on log out, workaround for removing persistence

    Router.push("/");
  };
  const searchRef = useRef();
  const inputRef = useRef();

  const toggle = (e) => {
    const target = e.target.tagName;
    if (target === "DIV" || target === "svg" || target === "path") {
      toggleSearch(!isSearchOpen);
      searchRef.current.classList.toggle("hide");
      setSearchTerm("");
      inputRef.current.focus();
    } else if (e.target.tagName === "P") {
      searchRef.current.classList.add("hide");
      
      setTimeout(() => {
        toggleSearch(false);
        setSearchTerm("");
      }, 300);
    }
  };

  // if we want to hide search when user switch pages, maybe should add 'isSearching' to redux store
  // also need to allow user to exit out by clicking elsewhere
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
        <div>
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

            <div className="headerIconButton" onClick={toggle}>
              <FaSearch size="1.9em" />
            </div>
        </div>
      </HeaderMain>

      <SearchContainer className="hide" ref={searchRef} onClick={toggle}>
        <input
          type="text"
          className="search"
          ref={inputRef}
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        ></input>
        <div className="searchProductList">
        {!isLoading &&
          products
            .filter((product) => {
              if (searchTerm === "") {
                return false;
              } else {
                return product.name.toLowerCase().includes(searchTerm.toLowerCase());
              }
            }
            )
            .map((product) => (
              <Link href={`/${product.type}/${product.id}`} key={product.id}>
                <p onClick={toggle}>{product.name}</p>
              </Link>
            ))}
            </div>
      </SearchContainer>
    </HeaderContainer>
  );
}

// disabling SSR for the header, because its contents depend on the localStorage
export default RemoveSSRFromComponent(Header);
