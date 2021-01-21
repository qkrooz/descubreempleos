import React from "react";
import { Card, Grid } from "semantic-ui-react";
import style from "../../styles/inicio.module.css";

export const InicioComponent = () => {
  return (
    <div>
      Recomendación del día
      <Grid columns={2} stackable>
        <Grid.Column>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                <h2> Encargado de marketing digital 10,000 mensuales</h2>
                Walmart México, Cd Juárez - Chihuahua Publicado el 15 de Oct.
                2020
              </Card.Description>
            </Card.Content>
          </Card>
          Empleos a los que has aplicado
        </Grid.Column>
        <Grid.Column>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                José Antonio Higuera Vázquez Diseñador Graco Disponible para
                trabajar
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};
