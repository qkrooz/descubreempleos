import React, { useContext } from "react";
import { MainContext } from "../public/resources/MainContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import main from "../styles/main.module.css";
import header from "../styles/header.module.css";
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
    <>
      <Head>
        <title>Descubre | Inicio</title>
      </Head>
      <Router>
        <header className={header.container}>
          <div className={header.logo}></div>
          <nav className={header.navContainer}>
            <button>Buscar</button>
            <button>Inicio</button>
            <button>Usuario</button>
          </nav>
          <div className={header.controlsContainer}></div>
        </header>
        <main className={main.container}>
          <h1>Main aqui</h1>
          <Switch>
            <Route />
            <Route />
            <Route />
          </Switch>
        </main>
      </Router>
      <footer>
        <h1>Footer aqui</h1>
      </footer>
    </>
  );
});
export default Home;
