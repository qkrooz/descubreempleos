import React, { useContext, useState } from "react";
import { MainContext } from "../public/resources/MainContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FooterContainer } from "./components/footer";
import InicioComponent from "./inicio";
import BusquedaComponent from "./busqueda";
import DatoComponent from "./datos";
import header from "../styles/header.module.css";
import { Button, Grid, Input } from "semantic-ui-react";

const Home = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  React.useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, []);

  const [show, setShow] = useState(false);

  const chat = () => {
    document.getElementById("myForm").style.display = "block";
  };
  const chat1 = () => {
    document.getElementById("myForm1").style.display = "block";
    document.getElementById("myForm").style.display = "none";
  };
  const closeChat = () => {
    document.getElementById("myForm").style.display = "none";
  };
  const closeChat1 = () => {
    document.getElementById("myForm1").style.display = "none";
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
                <img
                  src="/icon-list.png"
                  className={header.icon}
                  onClick={() => {
                    setShow(!show);
                  }}
                ></img>
              </div>
            </Grid.Column>
          </Grid>
          <div className={header.chatpopup} id="myForm">
            <div className={header.formcontainer1}>
              <div className={header.containerchats}>
                <div className={header.triangulo}>.</div>
                {[
                  {
                    icon: "/icon-lamp-blue.png",
                    title: "Walmart México",
                    message: "Tú: Muchas graci....",
                  },
                  {
                    icon: "/icon-lamp-blue.png",
                    title: "Walmart México",
                    message: "Tú: Muchas graci....",
                  },
                  {
                    icon: "/icon-lamp-blue.png",
                    title: "Walmart México",
                    message: "Tú: Muchas graci....",
                  },
                  {
                    icon: "/icon-lamp-white.png",
                    title: "Walmart México",
                    message: "Tú: Muchas graci....",
                  },
                  {
                    icon: "/icon-lamp-blue.png",
                    title: "Walmart México",
                    message: "Tú: Muchas graci....",
                  },
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={header.chatcontent}
                      onClick={() => chat1()}
                    >
                      <img
                        className={header.imagechat}
                        src="https://ingenieria.udd.cl/files/2020/09/walmart-logo-1-1.jpg"
                      ></img>
                      <div className={header.margintext}>
                        <h4> {item.title}</h4>
                        <p> {item.message}</p>
                      </div>
                      <img className={header.lampblue} src={item.icon}></img>
                    </div>
                  );
                })}
                <div></div>
              </div>
              <button className={header.button} onClick={() => closeChat()}>
                X
              </button>
            </div>
          </div>
          <div className={header.chatpopup1} id="myForm1">
            <div className={header.triangulo1}>.</div>
            <form className={header.formcontainer}>
              <div className={header.flextitle}>
                <img
                  className={header.logochat}
                  src="https://ingenieria.udd.cl/files/2020/09/walmart-logo-1-1.jpg"
                ></img>

                <h3 className={header.title}>Walmart México</h3>
                <button className={header.button} onClick={() => closeChat1()}>
                  X
                </button>
              </div>
              <div className={header.chatbox}>.</div>

              <div className={header.flexsend}>
                <Input
                  type="text"
                  placeholder="Escribe tu mensaje.."
                  required
                ></Input>
                <Button type="submit" className={header.btn}>
                  Enviar
                </Button>
              </div>
            </form>
          </div>
          {show ? (
            <div id="menu" className={header.menu}>
              <div className={header.texticons}>
                <p className={header.textblack}>Por salud mental</p>
                <img
                  className={header.menuicon}
                  src="/icon-lamp-ligthblue.png"
                ></img>
              </div>
              <div className={header.texticons}>
                <p className={header.textblack}>Blog Descubre</p>
                <img className={header.menuicon} src="/b.png"></img>
              </div>
              <hr className={header.hr}></hr>
              <div className={header.texticons}>
                <p className={header.textblack}>Configuración</p>
                <img className={header.menuicon} src="/config.png"></img>
              </div>
              <p className={header.textblack}>Reportar problema</p>
              <hr className={header.hr}></hr>
              <p className={header.redtext}>Cerrar sesión</p>
            </div>
          ) : (
            ""
          )}
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
