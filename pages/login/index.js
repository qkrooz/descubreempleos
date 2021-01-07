import Head from "next/head";
import { Button, Form, Icon } from "semantic-ui-react";
import { LoginStyle } from "./style";

export default function Login() {
  return (
    <LoginStyle>
      <img src="/thumbnailIconos.png"></img>
      <Head></Head>
      {/* <main> */}
      <Form>
        <Form.Field>
          <input placeholder="Correo electrónico" />
        </Form.Field>
        <Form.Field>
          <input placeholder="Contraseña" />
        </Form.Field>
        <Button type="submit" secondary>
          Iniciar
        </Button>
        <p> Recordar contraseña</p>
        <hr></hr>
        <p> ¿No tienes cuenta aún? Regístrate como</p>
        <Button>Trabajador</Button>
        <Button>Empresa</Button>
      </Form>
      <p className="textwhite">
        <Icon className="copyright outline"></Icon> Todos los derechos
        reservados - Descubre Sa. de CV
      </p>
      {/* </main> */}
    </LoginStyle>
  );
}
