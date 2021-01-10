import React from "react";
import { Button, Form, Grid, Icon, Image } from "semantic-ui-react";
import { CompanyStyle } from "./style";
const RegistroEmpresa = React.memo(() => {
  return (
    <CompanyStyle>
      <div className="background">.</div>
      <img src="/icon-white2.png"></img>
      <Form>
        <div className="textleft">
          <h3>Registrate como empresa </h3>Si lo que buscas es un trabajo
          <a href=""> regístrate como trabajador aquí</a>
        </div>
        <Grid columns={4} stackable>
          <Grid.Column>
            <Form.Field>
              <input placeholder="Nombres" />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Nombre comercial de la empresa
"
              />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Razón social
"
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <input placeholder="Apellidos" />
            </Form.Field>
            <Form.Field>
              <input placeholder="RFC" />
            </Form.Field>
            <Form.Field>
              <select>
                <option>Sector/Giro comercial</option>
              </select>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <input placeholder="Correo electrónico" />
            </Form.Field>
            <Form.Field>
              <input placeholder="Contraseña" />
              <p className="textleft1">
                Recomendamos subir una imagen de su logotipo para mejorar su
                relación con los candidatos y poderse hacer notar entre las
                otras empresas.
              </p>
              <p className="process">Proceso opcional*</p>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field>
              <input placeholder="Teléfono" />
              <ul>
                <li>Al menos un número</li>
                <li>Al menos una letra mayúscula</li>
                <li>Mínimo de 8 caracteres</li>
              </ul>
              <div className="photo">
                <label for="file-input">
                  <img src="/iconadd.svg" className="img"></img>
                </label>
                <input id="file-input" type="file" />
                <p>Logotipo en JPG o PNG</p>
              </div>
            </Form.Field>
          </Grid.Column>
        </Grid>
        <p className="textcenter">
          Al registrarte con nosotros declaras haber leído y estar de acuerdo
          con nuestra <a href="">Política de privacidad</a> así como nuestros
          <a href=""> Términos y condiciones </a>los cuales son accesibles a
          través de los respectivos links en sus títulos.
        </p>
        <Button secondary>Regístrate</Button>
      </Form>
      <p className="textwhite">
        <Icon className="copyright outline"></Icon> Todos los derechos
        reservados - Descubre Sa. de CV.
      </p>
    </CompanyStyle>
  );
});
export default RegistroEmpresa;
