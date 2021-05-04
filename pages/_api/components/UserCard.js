import React, { useState, useContext, useEffect, useRef } from "react";
import { MainContext } from "../resources/MainContext";
import apiRoute from "../resources/apiRoute";
import style from "../../../styles/usercard.module.css";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
const UserCard = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  // states
  const [userImgError, setUserImgError] = useState(false);
  const [disponibleState, setDisponibleState] = useState();
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [imageHash, setImageHash] = useState(0);
  const ChangeAvailability = () => {
    axios
      .post(`${apiRoute}/changeAvailability.php`, {
        state: !Boolean(disponibleState),
        userId: userInfo.ID,
      })
      .then(({ data }) => {
        if (data.code === 200) {
          toast({
            title: data.current ? "Disponible para trabajar" : "No disponible",
            description: "Has cambiado tu disponibilidad de trabajo",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          let secondaryInfoCopy = { ...secondaryInfo };
          secondaryInfoCopy.DISPONIBLE = data.current.toString();
          setSecondaryInfo(secondaryInfoCopy);
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
      <div className={style.profileContainer}>
        <button
          className={style.edit}
          onClick={() => {
            setEditModalVisibility(true);
          }}
        >
          {/* <Icon size="large" name="edit" /> */}
        </button>
        {!userImgError ? (
          <img
            className={style.profile}
            src={`${userInfo.IMAGE_URL}?v=${Date.now()}`}
            onError={() => {
              setUserImgError(true);
            }}
          />
        ) : (
          <button type="file">
            <div className={style.iconContainer}>
              {/* <Icon name="user" size="huge" color="grey" /> */}
            </div>
          </button>
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

        <a
          className={style.linkcv}
          onClick={() => {
            setModalsVisibility({ ...modalsVisibility, CVmodal: true });
          }}
        >
          CV.PDF
        </a>
        <div className={style.flextoggle}>
          <h3 className={style.yellowtext}>Disponible para trabajar</h3>
          <Checkbox
            toggle
            defaultChecked={Boolean(parseInt(secondaryInfo.DISPONIBLE))}
            onChange={ChangeAvailability}
          />
        </div>
      </div>
      <Modal1
        editModalVisibility={editModalVisibility}
        userImgError={userImgError}
        setEditModalVisibility={setEditModalVisibility}
        setUserImgError={setUserImgError}
        imageHash={imageHash}
        setImageHash={setImageHash}
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
    </>
  );
});
export const HomeUserCard = React.memo(() => {
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const [userImgError, setUserImgError] = useState(false);
  const [imageHash, setImageHash] = useState(0);
  return (
    <div className={style.profileContainer}>
      <span />
      {!userImgError ? (
        <img
          className={style.profile}
          style={{ borderRadius: "50%" }}
          src={`${userInfo.IMAGE_URL}?v=${Date.now()}`}
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
    </div>
  );
});

export default UserCard;
