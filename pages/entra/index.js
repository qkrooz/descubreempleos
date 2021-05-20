import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useToast } from "@chakra-ui/react";
import Router from "next/router";
import apiRoute from "../../_api/resources/apiRoute";
import { MainContext } from "../../_api/resources/MainContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import LoadingScreen from "../../_api/components/LoadingScreen";
import style from "./style.module.css";
const Login = React.memo(() => {
  const toast = useToast();
  // context
  const { ResetInfo, SetInfo } = React.useContext(MainContext);
  const loginValidation = Yup.object().shape({
    EMAIL: Yup.string().required().email(),
    PASSWORD: Yup.string().required(),
  });
  // states
  const [pswtext, setPswtext] = React.useState("password");
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userInfo") === null) {
        ResetInfo();
        Router.push("/entra");
        setLoading(false);
      } else {
        if (
          Object.values(JSON.parse(localStorage.getItem("userInfo"))).length !==
            0 &&
          Object.values(JSON.parse(localStorage.getItem("secondaryInfo")))
            .length !== 0
        ) {
          Router.push("/");
        } else {
          ResetInfo();
          Router.push("/entra");
          setLoading(false);
        }
      }
    }
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="./favicon.png" type="image/x-icon" />
        <title>Descubre | Entra</title>
      </Head>
      <LoadingScreen visible={loading} />
      <div className={style.container}>
        <div className={style.logoContainer}>
          <img
            src="https://descubrempleos.com/webServices/img/logo1.png"
            alt="logo1"
          />
        </div>
        <Formik
          validationSchema={loginValidation}
          initialValues={{
            EMAIL: "",
            PASSWORD: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            axios
              .post(`${apiRoute}/login.php`, values)
              .then(({ data }) => {
                console.log(values);
                console.log(data);
                if (data.code === 200) {
                  SetInfo(data);
                  Router.push("/");
                } else if (data.code === 404) {
                  ResetInfo();
                  toast({
                    title: "Error",
                    description: "Contraseña o correo eletrónico incorrecto",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-right",
                  });
                } else if (data.code === 500) {
                  ResetInfo();
                  toast({
                    title: "Error",
                    description: "Ha ocurrido un error en el servidor",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-right",
                  });
                }
              })
              .catch((error) => {
                if (error) {
                  ResetInfo();
                  toast({
                    title: "Error",
                    description: "Tienes problemas de conexion",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-right",
                  });
                }
              });
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form className={style.formContainer}>
              <div className={style.fields}>
                <div>
                  <Field
                    type="email"
                    name="EMAIL"
                    onChange={handleChange}
                    value={values.EMAIL}
                  />
                  {errors.EMAIL ? (
                    <span className={style.error}>Email requerido *</span>
                  ) : null}
                </div>
                <div>
                  <div className={style.pswField}>
                    <Field
                      type={pswtext}
                      name="PASSWORD"
                      onChange={handleChange}
                      value={values.PASSWORD}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPswtext(
                          pswtext === "password" ? "text" : "password"
                        );
                      }}
                    >
                      {pswtext ? <EyeFilled /> : <EyeInvisibleFilled />}
                    </button>
                  </div>
                  {errors.PASSWORD ? (
                    <span className={style.error}>Contraseña requerida *</span>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                children="INICIAR"
                className={style.blackButton}
              />
              <Link href="#" children="Recordar contraseña" />
              <div className={style.divider} />
              <div className={style.recommendation}>
                <span>¿No tienes cuenta aún?</span>
                <span>Regístrate como</span>
              </div>

              <div className={style.links}>
                <Link href="/registro-trabajador" children="TRABAJADOR" />
                <Link href="/registro-empresa" children="EMPRESA" />
              </div>
            </Form>
          )}
        </Formik>
        <div className={style.captionContainer}>
          <span>
            {"\u00a9"}Todos los derechos reservados - Descubre Sa. de CV
          </span>
        </div>
      </div>
    </>
  );
});
export default Login;
