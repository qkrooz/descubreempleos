import React, { useEffect } from "react";
import { MainContext } from "./_api/resources/MainContext.js";
import useLocalStorage from "./_api/resources/useLocalStorage";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import apiRoute from "./_api/resources/apiRoute";
import "../styles/generalstyles.css";
import axios from "axios";
const App = React.memo(({ Component, pageProps }) => {
  const router = useRouter();
  // states
  const [userInfo, setUserInfo] = React.useState({});
  const [secondaryInfo, setSecondaryInfo] = React.useState({});
  // functions
  const ResetInfo = () => {
    localStorage.setItem("userInfo", JSON.stringify({}));
    localStorage.setItem("secondaryInfo", JSON.stringify({}));
    setUserInfo({});
    setSecondaryInfo({});
  };
  const SetInfo = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    localStorage.setItem("secondaryInfo", JSON.stringify(data.secondaryInfo));
    setUserInfo(data.userInfo);
    setSecondaryInfo(data.secondaryInfo);
  };
  // effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        Object.values(JSON.parse(localStorage.getItem("userInfo"))).length !== 0
      ) {
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
        router.push("/entra");
      }
    }
  }, []);
  return (
    <MainContext.Provider
      value={{
        userInfoState: [userInfo, setUserInfo],
        secondaryInfoState: [secondaryInfo, setSecondaryInfo],
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
