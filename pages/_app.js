import React from "react";
import { MainContext } from "./_api/resources/MainContext.js";
import { ChakraProvider } from "@chakra-ui/react";
import useLocalStorage from "./_api/resources/useLocalStorage";
import "../styles/generalstyles.css";
import "semantic-ui-css/semantic.min.css";
const App = React.memo(({ Component, pageProps }) => {
  // states
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
  const [secondaryInfo, setSecondaryInfo] = useLocalStorage(
    "secondaryInfo",
    {}
  );
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
