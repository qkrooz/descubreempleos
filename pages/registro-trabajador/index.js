import React from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { Employee } from "./style";
import { Grid } from "semantic-ui-react";

const RegistroTrabajador = React.memo(() => {
  return (
    <Employee>
      <div className="background">.</div>
      <Grid columns={2} stackable>
        <Grid.Column>
          <div>
            <img src="/icon-white2.png"></img>
            <h2>Las oportunidades de empleo que tenemos para ti</h2>
            <p className="textwhite1">
              <Icon className="copyright outline"></Icon> Todos los derechos
              reservados - Descubre Sa. de CV.
            </p>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className="containerform">
            <Form>
              <div className="registerleft">
                <h3> Registrate como trabajador</h3>
                <p>
                  Si lo que buscas es reclutar
                  <a href=""> regístrate como empresa aquí</a>
                </p>
              </div>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Form.Field>
                    <input placeholder="Nombres" />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <input placeholder="Apellidos" />
                  </Form.Field>
                </Grid.Column>
              </Grid>
              <Form.Field>
                <input
                  placeholder="Correo electrónico
"
                />
              </Form.Field>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Form.Field>
                    <Input icon="eye" placeholder="Contraseña" />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <ul>
                    <li>Al menos un número</li>
                    <li>Al menos una letra mayuscula</li>
                    <li> Mínimo de 8 caracteres</li>
                  </ul>
                </Grid.Column>
              </Grid>
              <p>
                Al registrarte con nosotros declaras haber leído y estar de
                acuerdo con nuestra<a href=""> Política de privacidad</a> así
                como nuestros <a>Términos y condiciones</a> los cuales son
                accesibles a través de los respectivos links en sus títulos.
              </p>
              <Button secondary>Regístrate</Button>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
    </Employee>
  );
});
export default RegistroTrabajador;
