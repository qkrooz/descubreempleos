import { useState, useEffect } from "react";
import { MainContext } from "./_api/resources/MainContext.js";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import apiRoute from "./_api/resources/apiRoute";
import "../styles/generalstyles.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // states
  const [userInfo, setUserInfo] = useState({});
  const [secondaryInfo, setSecondaryInfo] = useState({});
  // effects
  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [userInfo]);
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
}
