import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import axios from "axios";
import { MainContext } from "../_api/resources/MainContext.js";
import apiRoute from "../_api/resources/apiRoute";
import "../styles/generalstyles.css";
const App = React.memo(({ Component, pageProps }) => {
  // states
  const [userInfo, setUserInfo] = useState({});
  const [secondaryInfo, setSecondaryInfo] = useState({});
  const [index_loadingScreen, set_index_loadingScreen] = useState(false);
  const [already_searched, set_already_searched] = useState(false);
  // functions
  const ResetInfo = () => {
    set_index_loadingScreen(true);
    localStorage.setItem("userInfo", JSON.stringify({}));
    localStorage.setItem("secondaryInfo", JSON.stringify({}));
    setUserInfo({});
    setSecondaryInfo({});
    setTimeout(() => set_index_loadingScreen(false), 1500);
  };
  const SetInfo = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    localStorage.setItem("secondaryInfo", JSON.stringify(data.secondaryInfo));
    setUserInfo(data.userInfo);
    setSecondaryInfo(data.secondaryInfo);
    set_index_loadingScreen(false);
  };
  // effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userInfo") === null) {
        ResetInfo();
        Router.push("/entra");
      } else {
        if (Object.values(JSON.parse(localStorage.getItem("userInfo"))).length !== 0) {
          axios
            .post(`${apiRoute}/login.php`, {
              EMAIL: JSON.parse(localStorage.getItem("userInfo")).EMAIL,
              PASSWORD: JSON.parse(localStorage.getItem("userInfo")).PASSWORD,
            })
            .then(({ data }) => {
              if (data.code === 200) {
                SetInfo(data);
              } else {
                ResetInfo();
              }
            })
            .catch((error) => console.log(error));
        } else {
          ResetInfo();
          Router.push("/entra");
        }
      }
    }
  }, []);
  return (
    <MainContext.Provider
      value={{
        userInfoState: [userInfo, setUserInfo],
        secondaryInfoState: [secondaryInfo, setSecondaryInfo],
        index_loadingScreenState: [index_loadingScreen, set_index_loadingScreen],
        already_searched_state: [already_searched, set_already_searched],
        // functions
        ResetInfo: ResetInfo,
        SetInfo: SetInfo,
      }}
    >
      <ChakraProvider>
        <div
          suppressHydrationWarning
          style={{
            height: "100vh",
            maxHeight: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {typeof window === "undefined" ? null : <Component {...pageProps} />}
        </div>
      </ChakraProvider>
    </MainContext.Provider>
  );
});
export default App;
