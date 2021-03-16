import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../_api/resources/MainContext";
import apiRoute from "../_api/resources/apiRoute";
import Head from "next/head";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import style from "../../styles/login_style.module.css";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
const Login = React.memo(() => {
  const [userDontExistsModal, setDontUserExistsModal] = useState(false);
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  const [, setSecondaryInfo] = secondaryInfoState;
  const router = useRouter();
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const SubmitLoginForm = (data) => {
    axios
      .post(`${apiRoute}/login.php`, data)
      .then(({ data }) => {
        if (data.code === 200) {
          setUserInfo(data.userInfo);
          setSecondaryInfo(data.secondaryInfo);
        } else {
          setDontUserExistsModal(true);
          setUserInfo({});
          setSecondaryInfo({});
        }
      })
      .catch((error) => console.log(error));
  };
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
  // effects
  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      router.push("/");
    }
  }, [userInfo]);
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
      <Modal
        isOpen={userDontExistsModal}
        onClose={() => {
          setDontUserExistsModal(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Este usuario no existe</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ marginBottom: "1em" }}>
            <span>Usuario no registrado</span>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
});
export default Login;
