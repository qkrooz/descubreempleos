import React from "react";
import { Button, Card, Grid, Icon, Input } from "semantic-ui-react";
import explore from "../../../styles/explore.module.css";

export default function BusquedaComponent() {
  return (
    <>
      <div className={explore.searchbackground}>
        <h4 className={explore.title}>
          Encuentra ese trabajo que has estado esperando
        </h4>
        <Grid columns={3} stackable>
          <Grid.Column>
            <label>¿Qué estas buscando?</label>
            <br></br>
            <Input
              className={explore.input}
              icon="clock outline"
              iconPosition="left"
              placeholder="Puesto, profeción o campo"
            ></Input>
          </Grid.Column>
          <Grid.Column>
            <label> ¿Donde estas buscando?</label>
            <br></br>
            <Input
              className={explore.input}
              icon="map marker alternate"
              iconPosition="left"
              placeholder="Municipio, Estado"
            ></Input>
          </Grid.Column>
          <Grid.Column>
            <div className={explore.marginbuttons}>
              <Button className={explore.buttonwhite}>
                Filtros <Icon className="bars" />
              </Button>
              <Button className={explore.buttonyellow}>
                Buscar
                <Icon className="search" />
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </div>
      <div className={explore.container}>
        <Grid columns={"equal"} stackable>
          <Grid.Column width={10}>
            <div className={explore.order}>
              <p className={explore.results}>349 Resultados </p>
              <div className={explore.sort}>
                Ordenar por <img src="/sort.png"></img>
              </div>
            </div>
            <Card className={explore.card}>
              <Card.Content>
                <Card.Description>
                  <Grid columns={"equal"} stackable>
                    <Grid.Column width={3}>
                      <img
                        className={explore.image}
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
                      <p className={explore.textrigth}>
                        Publicado el 15 de Oct. 2020
                      </p>
                    </Grid.Column>
                  </Grid>
                </Card.Description>
              </Card.Content>
            </Card>

            <Card className={explore.card}>
              <Card.Content>
                <Card.Description>
                  <Grid columns={"equal"} stackable>
                    <Grid.Column width={3}>
                      <img
                        className={explore.image}
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
                      <p className={explore.textrigth}>
                        Publicado el 07 de Oct. 2020
                      </p>
                    </Grid.Column>
                  </Grid>
                </Card.Description>
              </Card.Content>
            </Card>

            <Card className={explore.card}>
              <Card.Content>
                <Card.Description>
                  <Grid columns={"equal"} stackable>
                    <Grid.Column width={3}>
                      <img
                        className={explore.image}
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
                      <p className={explore.textrigth}>
                        Publicado el 15 de Oct. 2020
                      </p>
                    </Grid.Column>
                  </Grid>
                </Card.Description>
              </Card.Content>
            </Card>

            <Card className={explore.card}>
              <Card.Content>
                <Card.Description>
                  <Grid columns={"equal"} stackable>
                    <Grid.Column width={3}>
                      <img
                        className={explore.image}
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
                      <p className={explore.textrigth}>
                        Publicado el 07 de Oct. 2020
                      </p>
                    </Grid.Column>
                  </Grid>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card className={explore.card1}>
              <Card.Content>
                <Card.Description>
                  <h3>
                    Activar alerta por correo con estos parametros de busqueda
                  </h3>
                  <Button className={explore.active}>Activar</Button>
                </Card.Description>
              </Card.Content>
            </Card>
            <Card className={explore.card2}>
              <Card.Content>
                <Card.Description>
                  <h3>Postulaciónes activas</h3>
                  <h1 className={explore.h1}>33</h1>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
