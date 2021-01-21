import { Collapse } from "antd";
import React from "react";
import { Card, Grid } from "semantic-ui-react";
import style from "../../styles/inicio.module.css";
import "antd/dist/antd.css";
import { CaretRightOutlined } from "@ant-design/icons";

export const InicioComponent = () => {
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
          <Collapse
            defaultActiveKey={["2"]}
            onChange={callback}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel header="This is panel header 1" key="1">
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
            <Panel header="This is panel header 1" key="1">
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
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
          </Collapse>
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
