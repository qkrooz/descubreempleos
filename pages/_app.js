import { useState, useEffect } from "react";
import { MainContext } from "./_api/resources/MainContext.js";
import { useRouter } from "next/router";
import "../styles/generalstyles.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({});
  // functions
  const SubmitLoginForm = (data) => {
    axios
      .post(
        `http://165.227.57.231/webServices/apis/descubrempleos/login.php`,
        data
      )
      .then(({ data }) => {
        data.code === 200 ? setUserInfo(data.userInfo[0]) : setUserInfo({});
      })
      .catch((error) => console.log(error));
  };
  // effects
  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [userInfo]);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <MainContext.Provider
      value={{
        userInfoState: [userInfo, setUserInfo],
        // functions
        SubmitLoginForm: SubmitLoginForm,
      }}
    >
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </div>
    </MainContext.Provider>
  );
}
