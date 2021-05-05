import React from "react";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import apiRoute from "../_api/resources/apiRoute";
import { MainContext } from "../_api/resources/MainContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import LoadingScreen from "../_api/components/LoadingScreen";
import style from "./style.module.css";
const Login = React.memo(() => {
  const toast = useToast();
  const router = useRouter();
  // context
  const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const loginValidation = Yup.object().shape({
    EMAIL: Yup.string().required().email(),
    PASSWORD: Yup.string().required(),
  });
  // states
  const [pswtext, setPswtext] = React.useState("password");
  const [loading, setLoading] = React.useState(true);
  // effects
  React.useEffect(() => {
    if (
      Object.values(userInfo).length !== 0 &&
      Object.values(secondaryInfo).length !== 0
    ) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [userInfo, secondaryInfo]);
  return (
    <>
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
            axios
              .post(`${apiRoute}/login.php`, values)
              .then(({ data }) => {
                if (data.code === 200) {
                  setUserInfo(data.userInfo);
                  setSecondaryInfo(data.secondaryInfo);
                } else if (data.code === 404) {
                  setUserInfo({});
                  setSecondaryInfo({});
                  toast({
                    title: "Error",
                    description: "Contraseña o correo eletrónico incorrecto",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-right",
                  });
                } else if (data.code === 500) {
                  setUserInfo({});
                  setSecondaryInfo({});
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
              .catch((error) => console.log(error));
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
