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
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
  const [secondaryInfo, setSecondaryInfo] = useLocalStorage(
    "secondaryInfo",
    {}
  );
  // effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userInfo")) {
        axios
          .post(`${apiRoute}/login.php`, {
            EMAIL: userInfo.EMAIL,
            PASSWORD: userInfo.PASSWORD,
          })
          .then(({ data }) => {
            if (data.code === 200) {
              setUserInfo(data.userInfo);
              setSecondaryInfo(data.secondaryInfo);
            } else {
              // setDontUserExistsModal(true);
              setUserInfo({});
              setSecondaryInfo({});
            }
          })
          .catch((error) => console.log(error));
      } else {
        setUserInfo({});
        setSecondaryInfo({});
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
      }}
    >
      <ChakraProvider>
        <div
          suppressHydrationWarning
          style={{ maxHeight: "100%", overflowY: "auto", overflowX: "hidden" }}
        >
          {typeof window === "undefined" ? null : <Component {...pageProps} />}
        </div>
      </ChakraProvider>
    </MainContext.Provider>
  );
});
export default App;
