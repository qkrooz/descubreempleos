import React, { useContext } from "react";
import { MainContext } from "../public/resources/MainContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FooterContainer } from "./components/footer";
import InicioComponent from "./inicio";
import BusquedaComponent from "./busqueda";
import DatoComponent from "./datos";
import header from "../styles/header.module.css";
import { Grid } from "semantic-ui-react";

const Home = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  React.useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, []);
  const chat = () => {
    document.getElementById("myForm").style.display = "block";
  };

  const closeChat = () => {
    document.getElementById("myForm").style.display = "none";
  };
  return (
    <>
      <Head>
        <title>Descubre | Inicio</title>
      </Head>
      <Router>
        <header className={header.container}>
          <Grid columns={3} stackable>
            <Grid.Column>
              <img src="/icon-white2.png" className={header.logo}></img>
            </Grid.Column>
            <Grid.Column>
              <div className={header.navContainer}>
                <img src="/icon-home.png" className={header.icon}></img>
                <Link to="/" className={header.link}>
                  Inicio
                </Link>
                <img src="/icon-search.png" className={header.icon}></img>
                <Link to="/busqueda" className={header.link}>
                  Buscar
                </Link>
                <img src="/icon-info.png" className={header.icon}></img>
                <Link to="/datos" className={header.link}>
                  Mis datos
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className={header.containericons}>
                <img
                  onClick={() => chat()}
                  src="/icon-message.png"
                  className={header.icon}
                ></img>
                <img src="/icon-lamp-white.png" className={header.icon}></img>
                <img src="/icon-list.png" className={header.icon}></img>
              </div>
            </Grid.Column>
          </Grid>
          <div className={header.chatpopup} id="myForm">
            <form action="/action_page.php" className={header.formcontainer}>
              <h1>Chat</h1>

              <label for="msg">
                <b>Message</b>
              </label>
              <textarea
                placeholder="Type message.."
                name="msg"
                required
              ></textarea>

              <button type="submit" className={header.btn}>
                Send
              </button>
              <button
                type="button"
                className={header.btn + ' ' + header.cancel}
                onClick={() => closeChat()}
              >
                Close
              </button>
            </form>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={InicioComponent} />
          <Route path="/busqueda" component={BusquedaComponent}></Route>
          <Route path="/datos" component={DatoComponent} />
        </Switch>
        <FooterContainer></FooterContainer>
      </Router>
    </>
  );
});
export default Home;
