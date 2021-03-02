import React, { useContext, useEffect } from "react";
import { red } from "../resources/theme";
import { MainContext } from "../../../public/resources/MainContext";
const Header = React.memo(() => {
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: red,
        display: "flex",
        position: "relative",
        padding: "1em 0em",
      }}
    >
      <div>Logo</div>
      <nav
        style={{
          position: "absolute",
          left: "50%",
          transform: `translateX(-50%) translateY(${0}px)`,
        }}
      >
        {userInfo.TYPE === "user" ? (
          <a href="#">Inicio</a>
        ) : userInfo.TYPE === "enterprise" ? (
          <a href="#">Estadisticas</a>
        ) : null}
        <a href="#">Buscar</a>
        {userInfo.TYPE === "user" ? (
          <a href="#">Mis Datos</a>
        ) : userInfo.TYPE === "enterprise" ? (
          <a href="#">Nuestros Datos</a>
        ) : null}
      </nav>
      <div style={{ marginLeft: "auto" }}></div>
    </div>
  );
});
export default Header;
