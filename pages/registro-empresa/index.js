import React, { useState, useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import Head from "next/head";
import Link from "next/link";
import apiRoute from "../_api/resources/apiRoute";
import { Button, Icon } from "semantic-ui-react";
import style from "../../styles/registroEmpresa_style.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
const RegistroEmpresa = React.memo(() => {
  const route = useRouter();
  const [userExistsModal, setUserExistsModal] = useState(false);
  const { userInfoState } = useContext(MainContext);
  const [, setUserInfo] = userInfoState;
  const ValidationSchema = Yup.object().shape({
    NAMES: Yup.string().required("Required"),
    LAST_NAME: Yup.string().required("Required"),
    EMAIL: Yup.string().required("Required"),
    TEL_NUMBER: Yup.string().required("Required"),
    COMPANY_NAME: Yup.string().required("Required"),
    RFC: Yup.string().required("Required"),
    PASSWORD: Yup.string().required("Required"),
    RAZON_SOCIAL: Yup.string().required("Required"),
    BUSINESS_TYPE: Yup.string().required("Required"),
  });
  const RetroError = () => (
    <span style={{ color: "red", alignSelf: "flex-start" }}>Requerido*</span>
  );
  const CheckAndSubmit = (values) => {
    let response;
    axios
      .post(`${apiRoute}/userExists.php`, { EMAIL: values.EMAIL })
      .then(({ data }) => {
        data.code !== 200 ? RegisterCompany(values) : setUserExistsModal(true);
        return response;
      })
      .catch((error) => error);
  };
  const RegisterCompany = (values) => {
    values["USER_TYPE"] = "empresa";
    axios
      .post(`${apiRoute}/register.php`, values)
      .then(({ data }) => {
        setUserInfo(data.userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Head>
        <title>Registro empresa</title>
      </Head>
      <div className={style.companystyle}>
        <div className={style.background}></div>
        <img className={style.img} src="./icon-white2.png" />
        <Formik
          initialValues={{
            NAMES: "",
            LAST_NAME: "",
            EMAIL: "",
            TEL_NUMBER: "",
            COMPANY_NAME: "",
            RFC: "",
            PASSWORD: "",
            RAZON_SOCIAL: "",
            BUSINESS_TYPE: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={async (values) => CheckAndSubmit(values)}
        >
          {({ handleChange, errors, values, handleBlur }) => (
            <Form className={style.form}>
              <div className={style.textleft}>
                <h3>Regístrate como empresa </h3>Si lo que buscas es un trabajo{" "}
                <Link href="/registro-trabajador">
                  regístrate como trabajador aquí
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridGap: "20px",
                  gridAutoRows: "minmax(auto, auto)",
                  alignItems: "center",
                }}
              >
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Nombres"
                    onChange={handleChange}
                    name="NAMES"
                    value={values.NAMES}
                    onBlur={handleBlur}
                  />
                  {errors.NAMES ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Apellido"
                    onChange={handleChange}
                    name="LAST_NAME"
                    value={values.LAST_NAME}
                    onBlur={handleBlur}
                  />
                  {errors.LAST_NAME ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                    name="EMAIL"
                    value={values.EMAIL}
                    onBlur={handleBlur}
                    type="email"
                  />
                  {errors.EMAIL ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Teléfono"
                    onChange={handleChange}
                    name="TEL_NUMBER"
                    value={values.TEL_NUMBER}
                    onBlur={handleBlur}
                  />
                  {errors.TEL_NUMBER ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Nombre comercial de la empresa"
                    onChange={handleChange}
                    name="COMPANY_NAME"
                    value={values.COMPANY_NAME}
                    onBlur={handleBlur}
                  />
                  {errors.COMPANY_NAME ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="RFC"
                    onChange={handleChange}
                    name="RFC"
                    value={values.RFC}
                    onBlur={handleBlur}
                  />
                  {errors.RFC ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Contraseña"
                    onChange={handleChange}
                    name="PASSWORD"
                    value={values.PASSWORD}
                    onBlur={handleBlur}
                    type="password"
                  />
                  {errors.PASSWORD ? <RetroError /> : null}
                </div>
                <ul className={style.ul}>
                  <li>Al menos un número</li>
                  <li>Al menos una letra mayúscula</li>
                  <li>Mínimo de 8 caracteres</li>
                </ul>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridGap: "20px",
                  gridAutoRows: "minmax(auto, auto)",
                  alignItems: "start",
                  marginTop: 20,
                }}
              >
                <div className={style.inputContainer}>
                  <Field
                    className={style.formInput}
                    placeholder="Razón social"
                    onChange={handleChange}
                    name="RAZON_SOCIAL"
                    value={values.RAZON_SOCIAL}
                    onBlur={handleBlur}
                  />
                  {errors.RAZON_SOCIAL ? <RetroError /> : null}
                </div>
                <div className={style.inputContainer}>
                  <select
                    className={style.formInput}
                    onChange={handleChange}
                    name="BUSINESS_TYPE"
                    value={values.BUSINESS_TYPE}
                    onBlur={handleBlur}
                  >
                    <option>Sector/Giro comercial</option>
                    <option value="medic">Médico</option>
                  </select>
                  {errors.BUSINESS_TYPE ? <RetroError /> : null}
                </div>
                <p className={style.textleft1}>
                  Recomendamos subir una imagen de su logotipo para mejorar su
                  relación con los candidatos y poderse hacer notar entre las
                  otras empresas.
                </p>
                <div className={style.photo}>
                  <label htmlFor="file-input">
                    <img src="./iconadd.svg" className={style.img1}></img>
                  </label>
                  <input id="file-input" type="file" className={style.input} />
                  <p>Logotipo en JPG*</p>
                </div>
              </div>
              <p className={style.textcenter}>
                Al registrarte con nosotros declaras haber leído y estar de
                acuerdo con nuestra <a href="">Política de privacidad</a> así
                como nuestros
                <a href=""> Términos y condiciones </a>los cuales son accesibles
                a través de los respectivos links en sus títulos.
              </p>
              <Button secondary type="submit">
                Regístrate
              </Button>
            </Form>
          )}
        </Formik>
        <p className={style.textwhite}>
          <Icon className="copyright outline"></Icon> Todos los derechos
          reservados - Descubre Sa. de CV.
        </p>
      </div>
      <Modal
        isOpen={userExistsModal}
        onClose={() => {
          setUserExistsModal(false);
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
    </>
  );
});
export default RegistroEmpresa;
