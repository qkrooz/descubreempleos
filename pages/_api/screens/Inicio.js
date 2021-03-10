import { Collapse } from "antd";
import React from "react";
import { Card, Grid } from "semantic-ui-react";
import style from "../../../styles/inicio.module.css";
import "antd/dist/antd.css";
import { CaretRightOutlined } from "@ant-design/icons";

export default function InicioComponent() {
  const { Panel } = Collapse;
  function callback(key) {
    console.log(key);
  }
  const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;
  return (
    <div className={style.container}>
      <Grid columns={"equal"} stackable>
        <Grid.Column width={9}>
          <p className={style.redtext}> Recomendación del día</p>

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

          <p className={style.redtext}>Empleos a los que has aplicado</p>
          <Collapse
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
          </Collapse>
        </Grid.Column>
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
      </Grid>
    </div>
  );
}
