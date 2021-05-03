// import React, { useState, useContext, useEffect } from "react";
// import { MainContext } from "../_api/resources/MainContext";
// import apiRoute from "../_api/resources/apiRoute";
// import Head from "next/head";
// import { Button, Icon, Input } from "semantic-ui-react";
// import style from "../../styles/login_style.module.css";
// import { useRouter } from "next/router";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
// const Login = React.memo(() => {
//   const [userDontExistsModal, setDontUserExistsModal] = useState(false);
//   const { userInfoState, secondaryInfoState } = useContext(MainContext);
//   const [userInfo, setUserInfo] = userInfoState;
//   const [, setSecondaryInfo] = secondaryInfoState;
//   const router = useRouter();
//   const [passwordInputType, setPasswordInputType] = useState("password");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const SubmitLoginForm = (data) => {
//     axios
//       .post(`${apiRoute}/login.php`, data)
//       .then(({ data }) => {
//         // console.log(data);
//         if (data.code === 200) {
//           setUserInfo(data.userInfo);
//           setSecondaryInfo(data.secondaryInfo);
//         } else {
//           setDontUserExistsModal(true);
//           setUserInfo({});
//           setSecondaryInfo({});
//         }
//       })
//       .catch((error) => console.log(error));
//   };
//   const SetFormData = (e) => {
//     let key = e.target.name;
//     let temporalObj = { ...formData };
//     temporalObj[key] = e.target.value;
//     setFormData(temporalObj);
//   };
//   const ChangeInputPasswordType = () => {
//     if (passwordInputType === "password") {
//       setPasswordInputType("text");
//     } else {
//       setPasswordInputType("password");
//     }
//   };
//   // effects
//   useEffect(() => {
//     if (Object.keys(userInfo).length !== 0) {
//       router.push("/");
//     }
//   }, [userInfo]);
//   return (
//     <div className={style.loginstyle}>
//       <img className={style.img} src="./thumbnailIconos.png" />
//       <Head>
//         <title>Iniciar sesión</title>
//       </Head>
//       <Form
//         className={style.form}
//         onSubmit={() => {
//           SubmitLoginForm(formData);
//         }}
//       >
//         <Form.Field>
//           <input
//             placeholder="Correo electrónico"
//             name="email"
//             onChange={SetFormData}
//           />
//         </Form.Field>
//         <Form.Field>
//           <Input
//             icon={<Icon name="eye" link onClick={ChangeInputPasswordType} />}
//             placeholder="Contraseña"
//             name="password"
//             onChange={SetFormData}
//             type={passwordInputType}
//           />
//         </Form.Field>
//         <Button type="submit" secondary className={style.buttonblack}>
//           INICIAR
//         </Button>
//         <br></br>
//         <a href=""> Recordar contraseña</a>
//         <hr></hr>
//         <p> ¿No tienes cuenta aún? Regístrate como</p>
//         <div className={style.buttonsregister}>
//           <Button
//             className={style.button}
//             onClick={() => {
//               router.push("/registro-trabajador");
//             }}
//           >
//             Trabajador
//           </Button>
//           <Button
//             className={style.button}
//             onClick={() => {
//               router.push("/registro-empresa");
//             }}
//           >
//             Empresa
//           </Button>
//         </div>
//       </Form>
//       <p className={style.textwhite}>
//         <Icon className="copyright outline"></Icon> Todos los derechos
//         reservados - Descubre Sa. de CV
//       </p>
//       <Modal
//         isOpen={userDontExistsModal}
//         onClose={() => {
//           setDontUserExistsModal(false);
//         }}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Este usuario no existe</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody style={{ marginBottom: "1em" }}>
//             <span>Usuario no registrado</span>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// });
// export default Login;
import React from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

import style from "./style.module.css";
const Login = React.memo(() => {
  const loginValidation = Yup.object().shape({
    EMAIL: Yup.string().required().email(),
    PASSWORD: Yup.string().required(),
  });
  // states
  const [pswtext, setPswtext] = React.useState("password");
  return (
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
                      setPswtext(pswtext === "password" ? "text" : "password");
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
            <button type="submit">INICIAR</button>
            <Link href="/recoverPassword" className={style.pswReset}>
              Recordar contraseña
            </Link>
            <div className={style.divider} />
            <span>¿No tienes cuenta aún?</span>
            <span>Regístrate como</span>
            <div>
              <Link href="/registro-trabajador">TRABAJADOR</Link>
              <Link href="/registro-empresa">EMPRESA</Link>
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
  );
});
export default Login;
