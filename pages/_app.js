import "../styles/globals.css";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/reducers/apiSlice";
import { store } from "../src/redux/store/store";
import styled from "styled-components";
import { Header, Footer } from "../src/components";

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  * {
    margin: 0;
    user-select: none;
  }
`;

function App({ Component, pageProps }) {
  return (
    <Provider api={apiSlice} store={store}>
      <MainContainer>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </MainContainer>
    </Provider>
  );
}

export default App;
