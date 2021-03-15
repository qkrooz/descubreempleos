import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../resources/MainContext";
import apiRoute from "../resources/apiRoute";
import { Card, Checkbox, Icon } from "semantic-ui-react";
import style from "../../../styles/usercard.module.css";
import axios from "axios";
const UserCard = React.memo(() => {
  // states
  const [userImgError, setUserImgError] = useState(false);
  const [disponibleState, setDisponibleState] = useState();
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
  useEffect(() => {
    console.log(secondaryInfo);
  }, [secondaryInfo]);
  return (
    <Card className={style.profileContainer}>
      <Icon className={style.edit} size="large" name="edit" />
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
      {userInfo.TITLE ? (
        <h3 className={style.h3}>{userInfo.TITLE}</h3>
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
  );
});
export default UserCard;
