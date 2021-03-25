import React, { useEffect, useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import { useRouter } from "next/router";
import Footer from "../_api/components/Footer";
import Header from "../_api/components/Header";
import { MemoryRouter as Router } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import style from "../../styles/blog.module.css";

const Blog = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, [userInfo]);
  return (
    <Router>
      <Header></Header>
      <div className={style.backgroundwhite}> .</div>
      <div className={style.content}>
        <img src="./BlogBg.png" className={style.widthimage}></img>
        <div className={style.flexcontent}>
          <div className={style.containercard}>
            <Card>
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
            <Card>
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
            <Card>
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
