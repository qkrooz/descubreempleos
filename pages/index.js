import React, { useContext } from "react";
import { MainContext } from "../public/resources/MainContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "./login";
import RegistroEmpresa from "./registro-empresa/index";
import RegistroTrabajador from "./registro-trabajador/index";
import "semantic-ui-css/semantic.min.css";
import { Router } from "@reach/router";

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
    <div className="general">
      <Head>
        <title>Descubre | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Router>
        <Login path="/"></Login>
        <RegistroEmpresa path="/registro-empresa" />
        <RegistroTrabajador path="/registro-trabajador" />
      </Router>
    </div>
  );
});
export default Home;
