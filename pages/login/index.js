import { useState, useContext } from "react";
import { MainContext } from "../components/resources/MainContext";
import Head from "next/head";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import style from "../../styles/login_style.module.css";
import { useRouter } from "next/router";
export default function Login() {
  const { SubmitLoginForm } = useContext(MainContext);
  const router = useRouter();
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const SetFormData = (e) => {
    let key = e.target.name;
    let temporalObj = { ...formData };
    temporalObj[key] = e.target.value;
    setFormData(temporalObj);
  };
  const ChangeInputPasswordType = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };
  return (
    <div className={style.loginstyle}>
      <img className={style.img} src="./thumbnailIconos.png" />
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      <Form
        className={style.form}
        onSubmit={() => {
          SubmitLoginForm(formData);
        }}
      >
        <Form.Field>
          <input
            placeholder="Correo electrónico"
            name="email"
            onChange={SetFormData}
          />
        </Form.Field>
        <Form.Field>
          <Input
            icon={<Icon name="eye" link onClick={ChangeInputPasswordType} />}
            placeholder="Contraseña"
            name="password"
            onChange={SetFormData}
            type={passwordInputType}
          />
        </Form.Field>
        <Button type="submit" secondary className={style.buttonblack}>
          INICIAR
        </Button>
        <br></br>
        <a href=""> Recordar contraseña</a>
        <hr></hr>
        <p> ¿No tienes cuenta aún? Regístrate como</p>
        <div className={style.buttonsregister}>
          <Button
            className={style.button}
            onClick={() => {
              router.push("/registro-trabajador");
            }}
          >
            Trabajador
          </Button>
          <Button
            className={style.button}
            onClick={() => {
              router.push("/registro-empresa");
            }}
          >
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
