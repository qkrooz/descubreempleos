import React, { useState, useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import Link from "next/link";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import style from "../../styles/registroTrabajador_style.module.css";
import { Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import apiRoute from "../_api/resources/apiRoute";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
const RegistroTrabajador = React.memo(() => {
  const { userInfoState } = useContext(MainContext);
  const [, setUserInfo] = userInfoState;
  const route = useRouter();
  const [passwordInputType, setPasswordInputType] = useState("PASSWORD");
  const [retroModalVisibility, setRetroModalVisibility] = useState(false);
  const [retroModal2Visibility, setRetroModal2Visibility] = useState(false);
  const [formData, setFormData] = useState({
    NAMES: "",
    LAST_NAME: "",
    MOTHERS_LAST_NAME: "",
    EMAIL: "",
    PASSWORD: "",
    PASSWORD2: "",
  });
  const [errors, setErrors] = useState({
    empty: false,
    passwordContainsNumber: false,
    password8characters: false,
    passwordEqual: false,
  });
  const SetFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toLowerCase() });
  };
  const ChangeInputPasswordType = () => {
    if (passwordInputType === "PASSWORD") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("PASSWORD");
    }
  };
  const SubmitForm = () => {
    if (
      formData.NAMES !== "" &&
      formData.LAST_NAME !== "" &&
      formData.MOTHERS_LAST_NAME !== "" &&
      formData.EMAIL !== "" &&
      formData.PASSWORD !== "" &&
      formData.PASSWORD2 !== ""
    ) {
      setErrors({ ...errors, empty: false });
      let regex = /\d/;
      if (regex.test(formData.PASSWORD) && regex.test(formData.PASSWORD2)) {
        setErrors({ ...errors, passwordContainsNumber: false });
        if (formData.PASSWORD.length > 8) {
          setErrors({ ...errors, password8characters: false });
          if (formData.PASSWORD === formData.PASSWORD2) {
            setErrors({
              empty: false,
              passwordContainsNumber: false,
              password8characters: false,
              passwordEqual: false,
            });
            console.log("aqui llego");
            axios
              .post(`${apiRoute}/userExists.php`, { EMAIL: formData.EMAIL })
              .then(({ data }) => {
                if (data.code === 200) {
                  setRetroModal2Visibility(true);
                } else {
                  setRetroModal2Visibility(false);
                  setRetroModalVisibility(true);
                  axios
                    .post(`${apiRoute}/register.php`, formData)
                    .then(({ data }) => {
                      if (data.code === 200) {
                        setTimeout(() => {
                          setUserInfo(data.userInfo);
                        }, 2000);
                      }
                    })
                    .catch((error) => console.log(error));
                }
              })
              .catch((error) => console.log(error));
          } else {
            setErrors({ ...errors, passwordEqual: true });
          }
        } else {
          setErrors({ ...errors, password8characters: true });
        }
      } else {
        setErrors({ ...errors, passwordContainsNumber: true });
      }
    } else {
      setErrors({ ...errors, empty: true });
    }
  };
  return (
    <div className={style.employeecontainer}>
      <div className={style.background}>.</div>
      <Grid columns={2} stackable>
        <Grid.Column className={style.columnpadding}>
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
        <Grid.Column className={style.columnpadding}>
          <div className={style.containerform}>
            <Form className={style.form} onSubmit={SubmitForm}>
              <div className={style.formHeader}>
                <h3> Regístrate como trabajador</h3>
                <p>
                  Si lo que buscas es reclutar{" "}
                  <Link href="/registro-empresa">
                    regístrate como empresa aquí
                  </Link>
                </p>
              </div>
              <div className={style.formBody}></div>
              <Grid columns={3} stackable>
                <Grid.Column>
                  <Form.Field className={style.field} onChange={SetFormData}>
                    <input
                      placeholder="Nombres"
                      className={style.input}
                      name="NAMES"
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field className={style.field}>
                    <input
                      placeholder="Apellido paterno"
                      name="LAST_NAME"
                      onChange={SetFormData}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field className={style.field}>
                    <input
                      placeholder="Apellido materno"
                      name="MOTHERS_LAST_NAME"
                      onChange={SetFormData}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid>
              <Form.Field>
                <input
                  placeholder="Correo electrónico"
                  name="EMAIL"
                  onChange={SetFormData}
                />
              </Form.Field>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Form.Field>
                    <Input
                      icon={
                        <Icon
                          name="eye"
                          link
                          onClick={ChangeInputPasswordType}
                        />
                      }
                      name="PASSWORD"
                      placeholder="Contraseña"
                      type={passwordInputType}
                      onChange={SetFormData}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      icon={
                        <Icon
                          name="eye"
                          link
                          onClick={ChangeInputPasswordType}
                        />
                      }
                      name="PASSWORD2"
                      placeholder="Repite contraseña"
                      type={passwordInputType}
                      onChange={SetFormData}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <ul className={style.ul}>
                    <li
                      style={{
                        color: errors.passwordContainsNumber ? "red" : "green",
                      }}
                    >
                      Al menos un número
                    </li>
                    <li
                      style={{
                        color: errors.password8characters ? "red" : "green",
                      }}
                    >
                      Mínimo de 8 caracteres
                    </li>
                    <li
                      style={{
                        color: errors.passwordEqual ? "red" : "green",
                      }}
                    >
                      Contraseñas deben ser iguales
                    </li>
                  </ul>
                </Grid.Column>
              </Grid>
              <p>
                Al registrarte con nosotros declaras haber leído y estar de
                acuerdo con nuestra<a href=""> Política de privacidad</a> así
                como nuestros <a>Términos y condiciones</a> los cuales son
                accesibles a través de los respectivos links en sus títulos.
              </p>
              {errors.empty ? (
                <p style={{ color: "red" }}>
                  Es necesario llenar todos los campos*
                </p>
              ) : null}
              <Button secondary>Regístrate</Button>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
      <Modal
        isOpen={retroModalVisibility}
        onClose={() => {
          setRetroModalVisibility(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¡Registro exitoso!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <span>Serás redireccionado a la página principal en breve.</span>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                setRetroModalVisibility(false);
                setFormData({});
              }}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={retroModal2Visibility}
        onClose={() => {
          setRetroModal2Visibility(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Usuario registrado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <span>Este usuario ya existe</span>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                route.push("/login");
              }}
            >
              Ir al inicio de sesion
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
});
export default RegistroTrabajador;
