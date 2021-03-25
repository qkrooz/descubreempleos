import React, { useEffect, useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import { useRouter } from "next/router";
import Footer from "../_api/components/Footer";
import Header from "../_api/components/Header";
import { MemoryRouter as Router } from "react-router-dom";
import { Button, Card, Icon } from "semantic-ui-react";
import style from "../../styles/blog.module.css";
import { useState } from "react";

const Blog = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [open, setOpen] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, [userInfo]);
  return (
    <Router>
      <Header></Header>
      <div className={style.backgroundwhite}> .</div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={style.buttonModalFirst}
        >
          <Icon className="plus circle" size="huge"></Icon>
        </button>
      )}
      {open && (
        <div className={style.modal}>
          <div className={style.title}>
            <h1>Agregar imagen de portada</h1>
          </div>
          <h2>Titulo </h2>
          <p>Texto</p>
          <Button color="yellow"> Publicar</Button>
          <Button onClick={() => setOpen(false)} color="yellow">
            Cancelar
          </Button>
        </div>
      )}
      {openCard && (
        <div className={style.modal}>
          Medios para salir de lo cotidiano Escrito por Jose Antonio Higuera V.
          Likes 15 A sea una pequeña, mediana o gran empresa; ya sea un empleado
          de medio tiempo, jo, por contrato, pasante o practicante; aquí en
          “Descubre” queremos ayudarte a encontrar lo que ejemplica en el campo
          del orden moderno. Asenciones de ambito moderno "Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui ocia deserunt mollit anim id est laborum."
          ¿Porque usar nos nuevos parametros? Section 1.10.32 of "de Finibus
          Bonorum et Malorum", written by Cicero in 45 BC "Sed ut perspiciatis
          unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
          enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
          nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit, sed quia non nu.{" "}
          <button onClick={() => setOpenCard(false)}>cerrar modal</button>
        </div>
      )}
      <div className={style.content}>
        <img src="./BlogBg.png" className={style.widthimage}></img>
        <div className={style.flexcontent}>
          <div className={style.containercard}>
            <Card onClick={() => setOpenCard(true)}>
              <img src="./ImgCard1.png"></img>
              <Card.Content>
                <div>
                  <h1 className={style.titlecard}>
                    Medios para salir de lo cotidiano
                  </h1>

                  <p> Escrito por Jose Antonio Higuera V.</p>
                  <p>
                    A sea una pequeña, mediana o gran empresa; ya sea un
                    empleado de medio tiempo, jo, por contrato, pasante o
                    practicante; aquí en “Descubre” queremos ayudarte a
                    encontrar lo q..
                  </p>
                  <div className={style.flexdate}>
                    <p>Publicado el 10 de Oct del 2020</p>
                    <div className={style.flexdate1}>
                      <p className={style.textmargin}> Likes 15</p>
                      <Icon className="heart" color="red"></Icon>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
          <div className={style.containercard}>
            <Card onClick={() => setOpenCard(true)}>
              <img src="./ImgCard2.png"></img>
              <Card.Content>
                <div>
                  <h1 className={style.titlecard}>
                    Llega a ese puesto que has estado esperando
                  </h1>

                  <p> Escrito por Jose Antonio Higuera V.</p>
                  <p>
                    A sea una pequeña, mediana o gran empresa; ya sea un
                    empleado de medio tiempo, jo, por contrato, pasante o
                    practicante; aquí en “Descubre” queremos ayudarte a
                    encontrar lo q...
                  </p>
                  <div className={style.flexdate}>
                    <p>Publicado el 14 de Sep del 2020</p>
                    <div className={style.flexdate1}>
                      <p className={style.textmargin}> Likes 45</p>
                      <Icon className="heart" color="red"></Icon>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
          <div className={style.containercard}>
            <Card onClick={() => setOpenCard(true)}>
              <img src="./ImgCard3.png"></img>
              <Card.Content>
                <div>
                  <h1 className={style.titlecard}>
                    Diseño en espacios de trabajo modernos
                  </h1>
                  <p>Escrito por Jose Antonio Higuera V.</p>
                  <p>
                    A sea una pequeña, mediana o gran empresa; ya sea un
                    empleado de medio tiempo, jo, por contrato, pasante o
                    practicante; aquí en “Descubre” queremos ayudarte a
                    encontrar lo q...
                  </p>
                  <div className={style.flexdate}>
                    <p>Publicado el 08 de Ago del 2020</p>
                    <div className={style.flexdate1}>
                      <p className={style.textmargin}> Likes 56</p>
                      <Icon className="heart" color="red"></Icon>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Router>
  );
});
export default Blog;
