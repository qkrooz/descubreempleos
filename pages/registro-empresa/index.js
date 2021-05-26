import React from "react";
import { MainContext } from "../../_api/resources/MainContext";
import apiRoute from "../../_api/resources/apiRoute";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import axios from "axios";
// style
import style from "./style.module.css";
import { AddCircle, Check } from "@material-ui/icons";
export default function RegistroEmpresa() {
  const uploadFileRef = React.useRef();
  const toast = useToast();
  const router = useRouter();
  const validation = Yup.object().shape({
    NAMES: Yup.string().required("Campo requerido"),
    LAST_NAME: Yup.string().required("Campo requerido"),
    MOTHERS_LAST_NAME: Yup.string().required("Campo requerido"),
    EMAIL: Yup.string().required("Campo requerido"),
    TEL_NUMBER: Yup.string().required("Campo requerido"),
    COMPANY_NAME: Yup.string().required("Campo requerido"),
    RFC: Yup.string().required("Campo requerido"),
    PASSWORD1: Yup.string().required("Campo requerido"),
    PASSWORD2: Yup.string().oneOf(
      [Yup.ref("PASSWORD1"), null],
      "Las contraseñas no son iguales"
    ),
    RAZON_SOCIAL: Yup.string().required("Campo requerido"),
    BUSINESS_TYPE: Yup.string().required("Campo requerido"),
  });
  // cointext
  const { SetInfo } = React.useContext(MainContext);
  // states
  const [inputType, setInputType] = React.useState({
    p1: "password",
    p2: "password",
  });
  const [companyImage, setCompanyImage] = React.useState();
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://descubrempleos.com/webServices/img/favicon.png"
          type="image/x-icon"
        />
        <title>Descubre | Regístrate como empresa</title>
      </Head>
      <div className={style.container}>
        <div className={style.decorator} />
        <div className={style.infoContainer}>
          <img
            src="https://descubrempleos.com/webServices/img/logo2.png"
            alt="logo2"
          />
          <span>
            {"\u00a9"}Todos los derechos reservados - Descubre Sa. de CV
          </span>
        </div>
        <div className={style.formContainerOutter}>
          <Formik
            validationSchema={validation}
            initialValues={{
              NAMES: "",
              LAST_NAME: "",
              MOTHERS_LAST_NAME: "",
              EMAIL: "",
              TEL_NUMBER: "",
              COMPANY_NAME: "",
              RFC: "",
              PASSWORD1: "",
              PASSWORD2: "",
              RAZON_SOCIAL: "",
              BUSINESS_TYPE: "",
              USER_TYPE: "empresa",
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("NAMES", values.NAMES);
              formData.append("LAST_NAME", values.LAST_NAME);
              formData.append("MOTHERS_LAST_NAME", values.MOTHERS_LAST_NAME);
              formData.append("EMAIL", values.EMAIL);
              formData.append("TEL_NUMBER", values.TEL_NUMBER);
              formData.append("COMPANY_NAME", values.COMPANY_NAME);
              formData.append("RFC", values.RFC);
              formData.append("PASSWORD", values.PASSWORD1);
              formData.append("RAZON_SOCIAL", values.RAZON_SOCIAL);
              formData.append("BUSINESS_TYPE", values.BUSINESS_TYPE);
              formData.append("USER_TYPE", values.USER_TYPE);
              formData.append("image", companyImage);
              axios
                .post(`${apiRoute}/registerCompany.php`, formData, {
                  headers: { "Content-type": "multipart/form-data" },
                })
                .then(({ data }) => {
                  console.log(data);
                  switch (data.code) {
                    case 200:
                      SetInfo(data);
                      router.push("/");
                      break;
                    case 400:
                      toast({
                        title: `Error`,
                        description:
                          "Ha ocurrido un error en el registro, favor de intentar mas tarde",
                        status: "error",
                        isClosable: false,
                        position: "top-right",
                      });
                      break;
                    case 600:
                      toast({
                        title: `Error`,
                        description: "Este usuario ya está registrado",
                        status: "warning",
                        isClosable: false,
                        position: "top-right",
                      });
                      break;
                    case 404:
                      toast({
                        title: `Error`,
                        description: "Hay un error en la conexión al servidor",
                        status: "error",
                        isClosable: false,
                        position: "top-right",
                      });
                      break;
                    default:
                      break;
                  }
                })
                .catch((error) => console.log(error));
            }}
          >
            {({ values, errors, handleChange }) => (
              <Box
                p={4}
                borderRadius="10px"
                border="1px"
                borderColor="#ebebeb"
                shadow="lg"
                w="70%"
                zIndex="99"
                backgroundColor="white"
                className={style.formContainer}
              >
                <Text textAlign="start" fontSize="lg" fontWeight="bold">
                  Regístrate como empresa
                </Text>
                <Flex marginBottom="1em" className={style.advice}>
                  <span style={{ whiteSpace: "normal" }}>
                    Si lo que buscas es trabajo{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "Highlight",
                      }}
                    >
                      <Link href="/registro-trabajador">
                        regístrate como trabajador aquí
                      </Link>
                    </span>
                  </span>
                </Flex>
                <Form>
                  <Flex w="100%" mb={2} className={style.row1}>
                    <Field
                      type="text"
                      placeholder="Nombres"
                      name="NAMES"
                      onChange={handleChange}
                      value={values.NAMES}
                      className={errors.NAMES ? style.fieldError : null}
                    />
                    <Field
                      type="text"
                      placeholder="Apellido paterno"
                      name="LAST_NAME"
                      onChange={handleChange}
                      value={values.LAST_NAME}
                      className={errors.LAST_NAME ? style.fieldError : null}
                    />
                    <Field
                      type="text"
                      placeholder="Apellido materno"
                      name="MOTHERS_LAST_NAME"
                      onChange={handleChange}
                      value={values.MOTHERS_LAST_NAME}
                      className={
                        errors.MOTHERS_LAST_NAME ? style.fieldError : null
                      }
                    />
                    <Field
                      type="mail"
                      placeholder="Correo electrónico"
                      name="EMAIL"
                      onChange={handleChange}
                      value={values.EMAIL}
                      className={errors.EMAIL ? style.fieldError : null}
                    />
                  </Flex>
                  <Flex w="100%" mb={2} className={style.row2}>
                    <Field
                      type="text"
                      placeholder="Nombre comercial de la empresa"
                      name="COMPANY_NAME"
                      onChange={handleChange}
                      value={values.COMPANY_NAME}
                      className={errors.COMPANY_NAME ? style.fieldError : null}
                    />
                    <Field
                      type="text"
                      placeholder="RFC"
                      name="RFC"
                      onChange={handleChange}
                      value={values.RFC}
                      className={errors.RFC ? style.fieldError : null}
                    />
                    <div className={style.passwordContainer}>
                      <Field
                        type={inputType.p1}
                        placeholder="Contraseña"
                        name="PASSWORD1"
                        className={style.password}
                        onChange={handleChange}
                        value={values.PASSWORD1}
                        className={
                          errors.PASSWORD1 || errors.PASSWORD2
                            ? style.fieldError
                            : null
                        }
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setInputType({
                            ...inputType,
                            p1:
                              inputType.p1 === "password" ? "text" : "password",
                          });
                        }}
                      >
                        {inputType.p1 === "password" ? (
                          <EyeFilled style={{ fontSize: 20 }} />
                        ) : (
                          <EyeInvisibleFilled style={{ fontSize: 20 }} />
                        )}
                      </button>
                    </div>
                    <div
                      className={`${style.passwordContainer} ${
                        errors.PASSWORD2 ? style.fieldError : null
                      }`}
                    >
                      <Field
                        type={inputType.p2}
                        placeholder="Confirmar contraseña"
                        name="PASSWORD2"
                        className={style.password}
                        onChange={handleChange}
                        value={values.PASSWORD2}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setInputType({
                            ...inputType,
                            p2:
                              inputType.p2 === "password" ? "text" : "password",
                          });
                        }}
                      >
                        {inputType.p2 === "password" ? (
                          <EyeFilled style={{ fontSize: 20 }} />
                        ) : (
                          <EyeInvisibleFilled style={{ fontSize: 20 }} />
                        )}
                      </button>
                    </div>
                  </Flex>
                  <Flex w="100%" mb={2} className={style.row3}>
                    <Field
                      type="text"
                      placeholder="Razón social"
                      name="RAZON_SOCIAL"
                      onChange={handleChange}
                      value={values.RAZON_SOCIAL}
                      className={errors.RAZON_SOCIAL ? style.fieldError : null}
                    />
                    <Field
                      as="select"
                      type="select"
                      placeholder="Giro comercial"
                      name="BUSINESS_TYPE"
                      onChange={handleChange}
                      value={values.BUSINESS_TYPE}
                      className={errors.BUSINESS_TYPE ? style.fieldError : null}
                    >
                      <option hidden>Giro comercial</option>
                      <option value="medic">Médico/Salud</option>
                      <option value="other">Otro</option>
                    </Field>
                    <Field
                      type="text"
                      placeholder="Teléfono"
                      name="TEL_NUMBER"
                      onChange={handleChange}
                      value={values.TEL_NUMBER}
                      className={errors.TEL_NUMBER ? style.fieldError : null}
                    />
                    <div
                      className={style.loadImage}
                      onClick={() => {
                        uploadFileRef.current.click();
                      }}
                    >
                      <input
                        type="file"
                        hidden
                        ref={uploadFileRef}
                        onChange={(e) => setCompanyImage(e.target.files[0])}
                        onClick={(e) => (e.target.value = null)}
                      />
                      {companyImage ? (
                        <Check style={{ fontSize: "2.5em" }} />
                      ) : (
                        <AddCircle style={{ fontSize: "2.5em" }} />
                      )}

                      <span>Logotipo en JPG o PNG (opcional)</span>
                      {companyImage ? (
                        <span style={{ fontSize: "0.6em" }}>
                          {companyImage.name}
                        </span>
                      ) : null}
                    </div>
                  </Flex>
                  <div className={style.disclaimer}>
                    Al registrarte con nosotros declaras haber leído y estar de
                    acuerdo con nuestrao{" "}
                    <span className={style.discLink}>
                      <Link href="/">política de privacidad</Link>
                    </span>{" "}
                    así como nuestros{" "}
                    <span className={style.discLink}>
                      <Link href="#"> términos y condiciones</Link>
                    </span>{" "}
                    los cuales son accesibles a través de los respectivos links
                    en sus títulos
                  </div>
                  <Flex mt={2} justify="center">
                    <button type="submit" className={style.registerButton}>
                      REGÍSTRATE
                    </button>
                  </Flex>
                </Form>
              </Box>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
