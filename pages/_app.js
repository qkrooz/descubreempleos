import { useState } from "react";
import { MainContext } from "../public/resources/MainContext.js";
import "../styles/global.css";
export default function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState({
    ID: 1,
    FIRST_NAME: "Cesar",
    SECOND_NAME: "Ricardo",
    SURNAME: "Ibarra",
    LASTNAME: "Molina",
    TYPE: "user",
  });
  return (
    <MainContext.Provider value={{ userInfoState: [userInfo, setUserInfo] }}>
      <Component {...pageProps} />
    </MainContext.Provider>
  );
}
