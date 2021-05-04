import React, { useContext } from "react";
import apiRoute from "../resources/apiRoute";
import { MainContext } from "../resources/MainContext";
// components
import Footer from "../components/Footer";
// style
import style from "../../../styles/enterprisedata.module.css";
const EnterpriseData = React.memo(() => {
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  console.log(userInfo);
  return (
    <>
      <div className={style.container}>
        <div className={style.containerInner}>
          <div className={style.left}>
            <div className={style.card1}>
              <div className={style.card1Header}>
                <span />
                <button>{/* <Icon name="edit" size="large" /> */}</button>
              </div>
              <img
                src={`${apiRoute}/img/companyprofile/${
                  userInfo.IMAGE_URL
                }?v=${Date.now()}`}
                alt=""
              />
            </div>
            <div className={style.card1}>
              <div className={style.card1Header}>
                <span>Seguridad</span>
                <button>{/* <Icon name="edit" size="large" /> */}</button>
              </div>
              <img src={`${apiRoute}/`} alt="" />
            </div>
            <div className={style.card1}>
              <div className={style.card1Header}>
                <span>Datos de Cobro</span>
                <button>{/* <Icon name="edit" size="large" /> */}</button>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.card2}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
});
export default EnterpriseData;
