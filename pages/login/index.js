import Head from "next/head";
import { Button, Form, Icon } from "semantic-ui-react";
import { LoginStyle } from "./style";
import { Link } from "@reach/router";
export default function Login() {
  return (
    <LoginStyle>
      <img src="/thumbnailIconos.png"></img>
      <Head></Head>
      <Form>
        <Form.Field>
          <input className="input" placeholder="Correo electrónico" />
        </Form.Field>
        <Form.Field>
          <input icon="eye" placeholder="Contraseña" className="input" />
        </Form.Field>
        <Button type="submit" secondary>
          INICIAR
        </Button>
        <br></br>
        <a href=""> Recordar contraseña</a>
        <hr></hr>
        <p> ¿No tienes cuenta aún? Regístrate como</p>
        <div className="buttonsregister">
          <Button as={Link} to="/registro-trabajador">
            Trabajador
          </Button>
          <Button as={Link} to="/registro-empresa">
            Empresa
          </Button>
        </div>
      </Form>
      <p className="textwhite">
        <Icon className="copyright outline"></Icon> Todos los derechos
        reservados - Descubre Sa. de CV
      </p>
     </LoginStyle>
  );
}
