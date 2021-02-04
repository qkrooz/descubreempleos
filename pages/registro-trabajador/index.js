import React from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { Employee } from "./style";
import style from "../../styles/registroTrabajador_style.module.css";
import { Grid } from "semantic-ui-react";

const RegistroTrabajador = React.memo(() => {
  return (
    <div className={style.employeecontainer}>
      <div className={style.background}>.</div>
      <Grid columns={2} stackable>
        <Grid.Column>
          <div>
            <img className={style.img} src="./icon-white2.png" />
            <h2 className={style.h2}>
              Las oportunidades de empleo que tenemos para ti
            </h2>
            <p className={style.textwhite1}>
              <Icon className="copyright outline"></Icon> Todos los derechos
              reservados - Descubre Sa. de CV.
            </p>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className={style.containerform}>
            <Form className={style.form}>
              <div className={style.registerleft}>
                <h3> Regístrate como trabajador</h3>
                <p>
                  Si lo que buscas es reclutar
                  <a href=""> regístrate como empresa aquí</a>
                </p>
              </div>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Form.Field className={style.field}>
                    <input placeholder="Nombres" className={style.input} />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field className={style.field}>
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
                  <ul className={style.ul}>
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
    </div>
  );
});
export default RegistroTrabajador;
