import { useState } from "react";
import { MainContext } from "../public/resources/MainContext.js";
import "./generalstyles.css"
import "semantic-ui-css/semantic.min.css";

export default function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState({ id: 1 });
  return (
    <MainContext.Provider value={{ userInfoState: [userInfo, setUserInfo] }}>
      <Component {...pageProps} />
    </MainContext.Provider>
  );
}
