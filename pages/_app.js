import "../styles/globals.css";
// redux
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/reducers/apiSlice";
import { store } from "../src/redux/store/store";
// components
import styled from "styled-components";
import { Header, Footer } from "../src/components";
import { AnimatePresence } from "framer-motion";

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 2em;
  * {
    margin: 0;
    user-select: none;
  }
`;

function App({ Component, pageProps }) {
  // console.dir(Component);
  return (
    <Provider api={apiSlice} store={store}>
      <MainContainer>
        <Header />

        <AnimatePresence mode="wait">
          <Component {...pageProps} key={Component.name}/>
        </AnimatePresence>

        <Footer />
      </MainContainer>
    </Provider>
  );
}

export default App;
