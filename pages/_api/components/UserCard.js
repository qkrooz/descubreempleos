import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../resources/MainContext";
import apiRoute from "../resources/apiRoute";
import { Card, Checkbox, Icon } from "semantic-ui-react";
import style from "../../../styles/usercard.module.css";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
const UserCard = React.memo(() => {
  // states
  const [userImgError, setUserImgError] = useState(false);
  const [disponibleState, setDisponibleState] = useState();
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const ChangeAvailability = () => {
    axios
      .post(`${apiRoute}/changeAvailability.php`, {
        state: !Boolean(disponibleState),
        userId: userInfo.ID,
      })
      .then(({ data }) => {
        if (data.code === 200) {
          setDisponibleState(!Boolean(disponibleState));
        } else {
          console.log("ocurrio un error");
        }
      })
      .catch((error) => console.log(error));
  };
  //   effects
  useEffect(() => {
    Boolean(parseInt(secondaryInfo.DISPONIBLE))
      ? setDisponibleState(1)
      : setDisponibleState(0);
  }, [secondaryInfo]);
  return (
    <>
      <Card className={style.profileContainer}>
        <button
          className={style.edit}
          onClick={() => {
            setEditModalVisibility(true);
          }}
        >
          <Icon size="large" name="edit" />
        </button>
        {!userImgError ? (
          <img
            className={style.profile}
            src={`${apiRoute}/img/user-profile/${userInfo.ID}.jpg`}
            onError={() => {
              setUserImgError(true);
            }}
          />
        ) : (
          <div className={style.iconContainer}>
            <Icon name="user" size="huge" color="grey" />
          </div>
        )}
        <h3
          className={style.h3}
          style={{ textTransform: "capitalize" }}
        >{`${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME}`}</h3>
        {secondaryInfo.TITULO ? (
          <h3 className={style.h3}>{secondaryInfo.TITULO}</h3>
        ) : (
          <h3
            className={style.h3}
            style={{ color: "gray", fontWeight: "normal" }}
          >
            Titulo no disponible
          </h3>
        )}

        <a className={style.linkcv}> CV.PDF</a>
        <div className={style.flextoggle}>
          <h3 className={style.yellowtext}>Disponible para trabajar</h3>
          <Checkbox
            toggle
            defaultChecked={Boolean(parseInt(secondaryInfo.DISPONIBLE))}
            onChange={ChangeAvailability}
          />
        </div>
      </Card>
      <Modal1
        editModalVisibility={editModalVisibility}
        userImgError={userImgError}
        setEditModalVisibility={setEditModalVisibility}
      />
    </>
  );
});
const Modal1 = React.memo(
  ({ editModalVisibility, userImgError, setEditModalVisibility }) => {
    const RetroError = () => {
      return (
        <span style={{ color: "red", fontSize: "0.8em" }}>Requerido*</span>
      );
    };
    const validationSchema = Yup.object().shape({
      NAMES: Yup.string().required(),
      LAST_NAME: Yup.string().required(),
    });
    const { userInfoState, secondaryInfoState } = useContext(MainContext);
    const [userInfo, setUserInfo] = userInfoState;
    const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          NAMES: userInfo.NAMES,
          LAST_NAME: userInfo.LAST_NAME,
          MOTHERS_LAST_NAME: userInfo.MOTHERS_LAST_NAME,
          TITULO: secondaryInfo.TITULO ? secondaryInfo.TITULO : "",
        }}
        onSubmit={(values) => {
          if (
            values.NAME === userInfo.NAME &&
            values.LAST_NAME === userInfo.LAST_NAME &&
            values.MOTHERS_LAST_NAME === userInfo.MOTHERS_LAST_NAME &&
            values.TITULO === secondaryInfo.TITULO
          ) {
            setEditModalVisibility(!editModalVisibility);
          } else {
            values["ID"] = parseInt(userInfo.ID);
            axios
              .post(`${apiRoute}/updatePrimaryInfo.php`, values)
              .then(({ data }) => {
                if (data.code === 200) {
                  let userInfoCopy = { ...userInfo };
                  let secondaryInfoCopy = { ...secondaryInfo };
                  userInfoCopy.NAMES = values.NAMES.toLowerCase();
                  userInfoCopy.LAST_NAME = values.LAST_NAME.toLowerCase();
                  userInfoCopy.MOTHERS_LAST_NAME = values.MOTHERS_LAST_NAME.toLowerCase();
                  secondaryInfoCopy.TITULO = values.TITULO.toLowerCase();
                  setUserInfo(userInfoCopy);
                  setSecondaryInfo(secondaryInfoCopy);
                  setEditModalVisibility(false);
                } else {
                  console.log("ocurrio un error");
                }
              })
              .catch((error) => console.log(error));
          }
        }}
      >
        {({ values, handleChange, errors, handleBlur }) => (
          <>
            <Modal
              isOpen={editModalVisibility}
              onClose={() => {
                setEditModalVisibility(!editModalVisibility);
              }}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  ¿Quieres actualizar tus datos personales?
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div className={style.modal1Upper}>
                    {!userImgError ? (
                      <button>
                        <img
                          className={style.profile}
                          src={`${apiRoute}/img/user-profile/${userInfo.ID}.jpg`}
                          onError={() => {
                            setUserImgError(true);
                          }}
                        />
                      </button>
                    ) : (
                      <div className={style.iconContainer}>
                        <Icon name="user" size="huge" color="grey" />
                      </div>
                    )}
                    <Form
                      style={{ display: "flex", flexDirection: "column" }}
                      id="modal1Form"
                    >
                      {errors.NAMES ? <RetroError /> : null}
                      <Field
                        type="text"
                        placeholder="Nombres"
                        name="NAMES"
                        onChange={handleChange}
                        value={values.NAMES}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                      {errors.LAST_NAME ? <RetroError /> : null}
                      <Field
                        type="text"
                        placeholder="Apellido"
                        name="LAST_NAME"
                        onChange={handleChange}
                        value={values.LAST_NAME}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                      <Field
                        type="text"
                        placeholder="Apellido Materno"
                        name="MOTHERS_LAST_NAME"
                        onChange={handleChange}
                        value={values.MOTHERS_LAST_NAME}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                      <Field
                        type="text"
                        placeholder="Titulo/Puesto"
                        name="TITULO"
                        onChange={handleChange}
                        value={values.TITULO}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                    </Form>
                  </div>
                  <div className={style.modal1Lower}>
                    <div>
                      <p href="#">Fotografía</p>
                      <p>
                        Puedes escoger la fotografía que prefieras pero por
                        motivos profecionales sugerimos una fotografía de
                        aspecto formal y seria.
                      </p>
                    </div>
                    <div>
                      <a href="#">Generar y actualizar CV</a>
                      <p>
                        Crea un currículum con nosotros usando tus datos en esta
                        sección para generarlo de forma automatica y así puedas
                        enviarlo en tus postulaciones de empleo.
                      </p>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter style={{ justifyContent: "center" }}>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setEditModalVisibility(!editModalVisibility);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ECB83C" }}
                    form="modal1Form"
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Formik>
    );
  }
);
export default UserCard;
