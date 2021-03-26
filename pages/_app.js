import React, { useEffect } from "react";
import { MainContext } from "./_api/resources/MainContext.js";
import { ChakraProvider } from "@chakra-ui/react";
import useLocalStorage from "./_api/resources/useLocalStorage";
import { useRouter } from "next/router";
import apiRoute from "./_api/resources/apiRoute";
import "../styles/generalstyles.css";
import "semantic-ui-css/semantic.min.css";
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
            email: userInfo.EMAIL,
            password: userInfo.PASSWORD,
          })
          .then(({ data }) => {
            if (data.code === 200) {
              data.userInfo.IMAGE_URL = data.userInfo.IMAGE_URL.split("/")[9];
              setUserInfo(data.userInfo);
              setSecondaryInfo(data.secondaryInfo);
            } else {
              setDontUserExistsModal(true);
              setUserInfo({});
              setSecondaryInfo({});
            }
          })
          .catch((error) => console.log(error));
      } else {
        router.push("/login");
      }
    }
  }, []);
  return (
    <ChakraProvider>
      <MainContext.Provider
        value={{
          userInfoState: [userInfo, setUserInfo],
          secondaryInfoState: [secondaryInfo, setSecondaryInfo],
          // functions
        }}
      >
        <div suppressHydrationWarning>
          {typeof window === "undefined" ? null : <Component {...pageProps} />}
        </div>
      </MainContext.Provider>
    </ChakraProvider>
  );
});
export default App;
