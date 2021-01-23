import React from "react";
import { Card, Grid } from "semantic-ui-react";
import style from "../../styles/busqueda.module.css";

export const BusquedaComponent = () => {
  return (
    <div>
      <div className={style.searchbackground}>
        <h4 className={style.title}>
          Encuentra ese trabajo que has estado esperando
        </h4>
        ¿Qué estas buscando?
        <input placeholder="Puesto, profeción o campo"></input>
        ¿Donde estas buscando?<input placeholder="Municipio, Estado"></input>
        <button>Filtros</button> <button>Buscar</button>
      </div>
      <Grid columns={2} stackable>
        <Grid.Column>
          349 Resultados Ordenar por
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                <Grid columns={"equal"} stackable>
                  <Grid.Column width={3}>
                    <img
                      className={style.image}
                      src="https://ingenieria.udd.cl/files/2020/09/walmart-logo-1-1.jpg"
                    ></img>
                  </Grid.Column>
                  <Grid.Column>
                    <h1> Encargado de marketing digital 10,000 mensuales</h1>
                  </Grid.Column>
                </Grid>
                <Grid columns={2} stackable>
                  <Grid.Column>
                    Walmart México, Cd Juárez - Chihuahua
                  </Grid.Column>
                  <Grid.Column>
                    <p className={style.textrigth}>
                      Publicado el 15 de Oct. 2020
                    </p>
                  </Grid.Column>
                </Grid>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                <Grid columns={"equal"} stackable>
                  <Grid.Column width={3}>
                    <img
                      className={style.image}
                      src="https://ingenieria.udd.cl/files/2020/09/walmart-logo-1-1.jpg"
                    ></img>
                  </Grid.Column>
                  <Grid.Column>
                    <h1>
                      {" "}
                      Encargado de marketing digital Salario no específico
                    </h1>
                  </Grid.Column>
                </Grid>
                <Grid columns={2} stackable>
                  <Grid.Column>Starbucks, Cd Juárez - Chihuahua</Grid.Column>
                  <Grid.Column>
                    <p className={style.textrigth}>
                      Publicado el 07 de Oct. 2020
                    </p>
                  </Grid.Column>
                </Grid>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                Activar alerta por correo con estos parametros de busqueda
                Activar
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={style.card}>
            <Card.Content>
              <Card.Description>Postulaciónes activas 33</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};
