import React from "react";
import { Card, Grid } from "semantic-ui-react";
import style from "../../styles/datos.module.css";

export const DatoComponent = () => {
  return (
    <div>
      <Grid columns={2} stackable>
        <Grid.Column>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                <div className={style.profilecontainer}>
                  <img className={style.profile} src="/perfil.jpg"></img>
                  <h3 className={style.h3}> José Antonio Higuera Vázquez</h3>
                  <h3 className={style.h3}>Diseñador Gráfico</h3>
                  <a className={style.linkcv}> CV.PDF</a>
                  <h3 className={style.yellowtext}>Disponible para trabajar</h3>
                </div>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          Experiencia laboral Aún no has agregado ninguna experiencia laborarl
          Aumenta tus probabilidades de exito agregando experiencia en este
          campo Grado educativo Aún no has agregado ningun grado educativo
          Aumenta tus probabilidades de exito agregando experiencia en este
          campo Cursos y certicaciones Aún no has agregado ningun curso o
          certicación
        </Grid.Column>
      </Grid>
    </div>
  );
};
