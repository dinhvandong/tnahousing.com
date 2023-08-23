import { Provider, useSelector } from "react-redux";
import { store, persistor } from "../app/store";
import ScrollToTop from "../components/common/ScrollTop";
import Seo from "../components/common/seo";
import "../index.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PersistGate } from 'redux-persist/integration/react';
import Protect from "../components/common/ProtectedComponent";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps }) {


  return (
    <>
      <Seo
        font={
          "https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        }
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Protect>
            <Component {...pageProps} />
          </Protect>

        </PersistGate>
      </Provider>

      <ScrollToTop />
    </>
  );
}

export default MyApp;
