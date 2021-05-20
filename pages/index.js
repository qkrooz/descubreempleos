import React, { useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import Head from "next/head";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
// screens
import InicioComponent from "../_api/screens/Inicio";
import BusquedaComponent from "../_api/screens/Explore";
import DatoComponent from "../_api/screens/Datos";
import EnterpriseData from "../_api/screens/EnterpriseData";
import EnterprisePublish from "../_api/screens/EnterprisePublish";
import EnterpriseStatistics from "../_api/screens/EnterpriseStatistics";
// components
import Header, { EnterpriseHeader } from "../_api/components/Header";
const Home = React.memo(() => {
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  return (
    <Router>
      <Head>
        <link
          rel="shortcut icon"
          href="https://descubrempleos.com/webServices/img/favicon.png"
          type="image/x-icon"
        />
        <title>Descubre | Inicio</title>
      </Head>
      {userInfo.USER_TYPE === "trabajador" ? <Header /> : <EnterpriseHeader />}
      <Switch>
        {userInfo.USER_TYPE === "trabajador" ? (
          <>
            <Route exact path="/" component={InicioComponent} />
            <Route path="/search" component={BusquedaComponent}></Route>
            <Route path="/data" component={DatoComponent} />
          </>
        ) : (
          <>
            <Route exact path="/" component={EnterpriseStatistics} />
            <Route exact path="/publish" component={EnterprisePublish} />
            <Route exact path="/data" component={EnterpriseData} />
          </>
        )}
      </Switch>
    </Router>
  );
});
export default Home;
