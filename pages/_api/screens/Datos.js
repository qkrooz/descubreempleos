import React, { useContext } from "react";
import { MainContext } from "../resources/MainContext";
import { Card, Grid } from "semantic-ui-react";
import style from "../../../styles/datos.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";
// components
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
export default function DatoComponent() {
  // state
  // context
  const {} = useContext(MainContext);
  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <UserCard />
        </div>
        <div className={style.rigth}></div>
        <Grid columns={"equal"} stackable>
          <Grid.Column width={10}>
            <Card className={style.card1}>
              <Card.Content>
                <Card.Description>
                  <h1 className={style.h3}>
                    Experiencia laboral <PlusCircleOutlined />
                  </h1>
                  <h3>Aún no has agregado ninguna experiencia laboral</h3>
                  <p>
                    Aumenta tus probabilidades de exito agregando experiencia en
                    este campo
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card className={style.card1}>
              <Card.Content>
                <Card.Description>
                  <h1 className={style.h3}>
                    Grado educativo <PlusCircleOutlined />
                  </h1>
                  <h3>Aún no has agregado ningun grado educativo</h3>
                  <p>
                    Aumenta tus probabilidades de exito agregando experiencia en
                    este campo
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card className={style.card}>
              <Card.Content>
                <Card.Description>
                  <h1 className={style.h3}>
                    Cursos y certificaciones <PlusCircleOutlined />
                  </h1>
                  <h3>Aún no has agregado ningun curso o certificación</h3>
                  <p>
                    Aumenta tus probabilidades de exito agregando experiencia en
                    este campo
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
