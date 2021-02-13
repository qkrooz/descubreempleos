import { useState } from "react";
import { MainContext } from "../public/resources/MainContext.js";
import "../styles/generalstyles.css";
import "semantic-ui-css/semantic.min.css";

export default function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <MainContext.Provider value={{ userInfoState: [userInfo, setUserInfo] }}>
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </div>
    </MainContext.Provider>
  );
}
