import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import Head from "next/head";
import * as Yup from "yup";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import axios from "axios";
import apiRoute from "../_api/resources/apiRoute";
import { MainContext } from "../_api/resources/MainContext";
// style
import style from "./style.module.css";
const RegistroTrabajador = React.memo(() => {
  const toast = useToast();
  const router = useRouter();
  // cointext
  const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
  const [, setUserInfo] = userInfoState;
  const [, setSecondaryInfo] = secondaryInfoState;
  const validation = Yup.object().shape({
    NAMES: Yup.string().required("Campo requerido"),
    LAST_NAME: Yup.string().required("Campo requerido"),
    MOTHERS_LAST_NAME: Yup.string().required("Campo requerido"),
    EMAIL: Yup.string().required("Campo requerido"),
    PASSWORD1: Yup.string().required("Campo requerido"),
    PASSWORD2: Yup.string().oneOf(
      [Yup.ref("PASSWORD1"), null],
      "Las contraseñas no son iguales"
    ),
  });
  const [inputType, setInputType] = React.useState({
    p1: "password",
    p2: "password",
  });
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://descubrempleos.com/webServices/img/favicon.png"
          type="image/x-icon"
        />
        <title>Descubre | Regístrate como trabajador</title>
      </Head>
      <div className={style.container}>
        <div className={style.decorator} />
        <div className={style.brand}>
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
              PASSWORD1: "",
              PASSWORD2: "",
              USER_TYPE: "trabajador",
            }}
            onSubmit={(values) => {
              axios
                .post(`${apiRoute}/register.php`, values)
                .then(({ data }) => {
                  switch (data.code) {
                    case 200:
                      setUserInfo(data.userInfo);
                      setSecondaryInfo(data.secondaryInfo);
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
            {({ handleChange, values, errors }) => (
              <Box
                p={4}
                borderRadius="10px"
                border="1px"
                borderColor="#ebebeb"
                shadow="lg"
                w="100%"
                zIndex="99"
                backgroundColor="white"
                className={style.formContainer}
              >
                <Text textAlign="start" fontSize="lg" fontWeight="bold">
                  Regístrate como trabajador
                </Text>
                <Flex marginBottom="1em" className={style.suggestion}>
                  <span style={{ whiteSpace: "normal" }}>
                    Si lo que buscas es reclutar{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "Highlight",
                      }}
                    >
                      <Link href="/registro-empresa">
                        regístrate como empresa aquí
                      </Link>
                    </span>
                  </span>
                </Flex>
                <Form>
                  <Flex justify="space-evenly" className={style.row1}>
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
                  </Flex>
                  <Flex justify="space-evenly" className={style.row2}>
                    <Field
                      type="mail"
                      placeholder="Correo electrónico"
                      name="EMAIL"
                      onChange={handleChange}
                      value={values.EMAIL}
                      className={errors.EMAIL ? style.fieldError : null}
                    />
                  </Flex>
                  <Flex className={style.row3}>
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
});
export default RegistroTrabajador;
