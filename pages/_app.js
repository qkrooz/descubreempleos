import { useState } from "react";
import { MainContext } from "../public/resources/MainContext.js";
export default function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState({ id: 1 });
  return (
    <MainContext.Provider value={{ userInfoState: [userInfo, setUserInfo] }}>
      <Component {...pageProps} />
    </MainContext.Provider>
  );
}
