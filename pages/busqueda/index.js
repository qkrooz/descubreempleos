import React from "react";
import { Button, Card, Grid, Input } from "semantic-ui-react";
import style from "../../styles/busqueda.module.css";

export const BusquedaComponent = () => {
  return (
    <div>
      <div className={style.searchbackground}>
        <h4 className={style.title}>
          Encuentra ese trabajo que has estado esperando
        </h4>
        <Grid columns={3} stackable> <Grid.Column><label>¿Qué estas buscando?</label><br></br>
          <Input icon='clock outline' iconPosition='left' placeholder="Puesto, profeción o campo"></Input></Grid.Column><Grid.Column><label>  ¿Donde estas buscando?</label><br></br><Input icon='map marker alternate' iconPosition='left' placeholder="Municipio, Estado"></Input></Grid.Column><Grid.Column>        <Button>Filtros</Button> <Button color="yellow">Buscar</Button>
          </Grid.Column></Grid>
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
                      src="https://tse1.mm.bing.net/th?id=OIP.CoDDxOo6rl3wxDgGzUmjBgHaGK&pid=Api&P=0&w=202&h=169"
                    ></img>
                  </Grid.Column>
                  <Grid.Column>
                    <h1>
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
          <Card className={style.card1}>
            <Card.Content>
              <Card.Description>
                <h3>Activar alerta por correo con estos parametros de busqueda</h3>
                <Button color="yellow">Activar</Button>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={style.card1}>
            <Card.Content>
              <Card.Description><h3>Postulaciónes activas</h3> <h1 className={style.h1}>33</h1></Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};
