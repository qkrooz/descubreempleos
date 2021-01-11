import Head from "next/head";
import { Button, Form, Icon } from "semantic-ui-react";
import { Link } from "@reach/router";
import style from "./style.module.css"

export default function Login() {
  return (
    <div className={style.loginstyle}>
      <img className={style.img} src="/thumbnailIconos.png"></img>
      <Head></Head>
      <Form className={style.form}>
        <Form.Field>
          <input   placeholder="Correo electrónico" />
        </Form.Field>
        <Form.Field>
          <input icon="eye" placeholder="Contraseña"   />
        </Form.Field>
        <Button type="submit" secondary className={style.buttonblack}>
          INICIAR
        </Button>
        <br></br>
        <a href=""> Recordar contraseña</a>
        <hr></hr>
        <p> ¿No tienes cuenta aún? Regístrate como</p>
        <div className={style.buttonsregister}>
          <Button className={style.button} as={Link} to="/registro-trabajador">
            Trabajador
          </Button>
          <Button className={style.button} as={Link} to="/registro-empresa">
            Empresa
          </Button>
        </div>
      </Form>
      <p className={style.textwhite}>
        <Icon className="copyright outline"></Icon> Todos los derechos
        reservados - Descubre Sa. de CV
      </p>
     </div>
  );
}
