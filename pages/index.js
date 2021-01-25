import React, { useContext } from "react";
import { MainContext } from "../public/resources/MainContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import main from "../styles/main.module.css";
import { HeaderComponent } from "./components/header";
import { FooterContainer } from "./components/footer";
import { InicioComponent } from "./inicio";
import { BusquedaComponent } from "./busqueda";
import { DatoComponent } from "./datos";

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
        <HeaderComponent></HeaderComponent>
        <main className={main.container}>
          {/* <h1>Main aqui</h1> */}
          {/* <InicioComponent></InicioComponent> */}
          {/* <BusquedaComponent></BusquedaComponent> */}
          <DatoComponent></DatoComponent>
          <Switch>
            <Route />
            <Route />
            <Route />
          </Switch>
        </main>
      </Router>
      <FooterContainer></FooterContainer>
    </>
  );
});
export default Home;
