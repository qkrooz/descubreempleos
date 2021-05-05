import React from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { Box, Text, Flex } from "@chakra-ui/react";
import Head from "next/head";
import * as Yup from "yup";
// style
import style from "./style.module.css";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
const RegistroTrabajador = React.memo(() => {
  const validation = Yup.object().shape({
    NAMES: Yup.string().required(),
    LAST_NAME: Yup.string().required(),
    MOTHERS_LAST_NAME: Yup.string().required(),
    EMAIL: Yup.string().required(),
    PASSWORD1: Yup.string().required(),
    PASSWORD2: Yup.string().required(),
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
        <div className={style.decorator}></div>
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
              >
                <Text textAlign="start" fontSize="lg" fontWeight="bold">
                  Regístrate como trabajador
                </Text>
                <Flex marginBottom="1em">
                  <Text mr={0.5}>Si lo que buscas es reclutar</Text>
                  <Text color="blue.500" textDecoration="underline">
                    <Link href="/registro-empresa">
                      regístrate como empresa aquí
                    </Link>
                  </Text>
                </Flex>
                <Flex justify="space-evenly" className={style.row1}>
                  <Field
                    type="text"
                    placeholder="Nombres"
                    name="NAMES"
                    onChange={handleChange}
                    value={values.NAMES}
                  />
                  <Field
                    type="text"
                    placeholder="Apellido paterno"
                    name="LAST_NAME"
                    onChange={handleChange}
                    value={values.LAST_NAME}
                  />
                  <Field
                    type="text"
                    placeholder="Apellido materno"
                    name="MOTHERS_LAST_NAME"
                    onChange={handleChange}
                    value={values.MOTHERS_LAST_NAME}
                  />
                </Flex>
                <Flex justify="space-evenly" className={style.row2}>
                  <Field
                    type="text"
                    placeholder="Correo electrónico"
                    name="EMAIL"
                    onChange={handleChange}
                    value={values.EMAIL}
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
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setInputType({
                          ...inputType,
                          p1: inputType.p1 === "password" ? "text" : "password",
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
                  <div className={style.passwordContainer}>
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
                          p2: inputType.p2 === "password" ? "text" : "password",
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
                <span className={style.disclaimer}>
                  Al registrarte con nosotros declaras haber leído y estar de
                  acuerdo con nuestrao{" "}
                  <span className={style.discLink}>
                    <Link href="/">política de privacidad</Link>
                  </span>{" "}
                  así como nuestros{" "}
                  <span className={style.discLink}>
                    <Link href="#"> Términos y condiciones</Link>
                  </span>{" "}
                  los cuales son accesibles a través de los respectivos links en
                  sus títulos
                </span>
                <Flex mt={2} justify="center">
                  <button type="submit" className={style.registerButton}>
                    REGÍSTRATE
                  </button>
                </Flex>
              </Box>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
});
export default RegistroTrabajador;
