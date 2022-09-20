import "../styles/globals.css";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/reducers/apiSlice";
import { store } from "../src/redux/store/store";

import styled from "styled-components";
import { FaPhone, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const MainContainer = styled.div`
  height: 100vh;
  * {
    margin: 0;
  }
`;

const HeaderContainer  = styled.div`
  color: white;
  height: 10%;
`;
const HeaderTop = styled.div`
  background-color: black;
  display: flex;
  justify-content: flex-end;
  height: 30%;
`;
const HeaderMain = styled.div`
  background-color: darkred;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70%;
`;

const Footer = styled.div`
  position: fixed;
  color: white;
  width: 100%;
  background-color: darkred;
  bottom: 0;
  height: 1.5em;
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1px;
`;

function MyApp({ Component, pageProps }) {
  return (
    <Provider api={apiSlice} store={store}>
      <MainContainer>

        {/* HEADER */}
        <HeaderContainer>
          <HeaderTop>
            <FaUser /> Account <FaShoppingCart /> Cart
          </HeaderTop>
          <HeaderMain>
            <h1>Logo</h1>
            <h1>Steaks</h1>
            <h1>Sushi</h1>
            <FaSearch />
          </HeaderMain>
        </HeaderContainer>

        {/* MAIN CONTENT */}
        <Component {...pageProps} />

        {/* FOOTER */}
        <Footer>
          <FaPhone /> Contact 
        </Footer>
        
      </MainContainer>
    </Provider>
  );
}

export default MyApp;
