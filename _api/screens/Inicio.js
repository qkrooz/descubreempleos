import React from "react";
import style from "../../styles/inicio.module.css";
// components
import Footer from "../components/Footer";
// import { HomeUserCard } from "../components/UserCard";
export default function InicioComponent() {
  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <p className={style.redtext}> Recomendación del día</p>
          {/* <Card className={style.card}>
            <Card.Content>
              <Card.Description>
                <Grid columns={"equal"} stackable>
                  <Grid.Column width={3}>
                    <img
                      className={style.image}
                      src="https://ingenieria.udd.cl/files/2020/09/walmart-logo-1-1.jpg"
                    />
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
          </Card> */}
          <p className={style.redtext}>Empleos a los que has aplicado</p>
        </div>
        <div className={style.rigth}>{/* <HomeUserCard /> */}</div>

        {/* <Collapse
              defaultActiveKey={["2"]}
              onChange={callback}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header="Curriculums sin revisar
"
                key="1"
              >
                <p>{text}</p>
              </Panel>
            </Collapse>
            <Collapse
              defaultActiveKey={["2"]}
              onChange={callback}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header="Curriculums revisados
"
                key="1"
              >
                <p>{text}</p>
              </Panel>
            </Collapse>
            <Collapse
              defaultActiveKey={["2"]}
              onChange={callback}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel header="Vacantes expiradas" key="1">
                <p>{text}</p>
              </Panel>
            </Collapse> */}
      </div>
      <Footer />
    </>
  );
}
