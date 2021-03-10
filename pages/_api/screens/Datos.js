import React from "react";
import { Card, Checkbox, Grid, Icon } from "semantic-ui-react";
import style from "../../../styles/datos.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";

export default function DatoComponent() {
  return (
    <div className={style.container}>
      <Grid columns={"equal"} stackable>
        <Grid.Column>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                <div className={style.profilecontainer}>
                  <Icon className={style.edit} size="large" name="edit"></Icon>
                  <div>
                    <img className={style.profile} src="/perfil.jpg"></img>
                    <h3 className={style.h3}> José Antonio Higuera Vázquez</h3>
                    <h3 className={style.h3}>Diseñador Gráfico</h3>
                    <a className={style.linkcv}> CV.PDF</a>
                    <div className={style.flextoggle}>
                      <h3 className={style.yellowtext}>
                        Disponible para trabajar
                      </h3>
                      <Checkbox toggle />
                    </div>
                  </div>
                </div>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
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
  );
}
