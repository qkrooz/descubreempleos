import React, { useContext } from "react";
import { MainContext } from "../public/resources/MainContext";
import Head from "next/head";
import { useRouter } from "next/router";
const Home = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  React.useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Descubre | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Main</h1>
      </main>
    </div>
  );
});
export default Home;
