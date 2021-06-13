import React, { useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import Head from "next/head";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
// screens
import LoadingScreen from "../_api/components/LoadingScreen";
import InicioComponent from "../_api/screens/Inicio";
import BusquedaComponent from "../_api/screens/Explore";
import DatoComponent from "../_api/screens/Datos";
import EnterpriseData from "../_api/screens/EnterpriseData";
import EnterpriseStatistics from "../_api/screens/EnterpriseStatistics";
// components
import Header, { EnterpriseHeader } from "../_api/components/Header";
const Home = React.memo(() => {
  const { userInfoState, index_loadingScreenState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [index_loadingScreen] = index_loadingScreenState;
  return (
    <Router>
      <Head>
        <link rel="shortcut icon" href="https://descubrempleos.com/webServices/img/favicon.png" type="image/x-icon" />
        <title>Descubre | Inicio</title>
      </Head>
      <LoadingScreen visible={index_loadingScreen} />
      {userInfo.USER_TYPE === "trabajador" ? <Header /> : <EnterpriseHeader />}
      <Switch>
        {userInfo.USER_TYPE === "trabajador" ? (
          <>
            <Route exact path="/" component={InicioComponent} />
            <Route path="/search" component={BusquedaComponent} />
            <Route path="/data" component={DatoComponent} />
          </>
        ) : (
          <>
            <Route path="/statistics" component={EnterpriseStatistics} />
            <Route path="/data" component={EnterpriseData} />
          </>
        )}
      </Switch>
    </Router>
  );
});
export default Home;
