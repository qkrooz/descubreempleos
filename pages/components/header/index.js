import React from "react";
import header from "../../../styles/header.module.css";

export const HeaderComponent = () => {
  return (
    <div>
      <header className={header.container}>
        <img src="/icon-white2.png" className={header.logo}></img>
        <div className={header.navContainer}>
          <img src="/icon-home.png" className={header.icon}></img>
          <a className={header.link}>Inicio</a>
          <img src="/icon-search.png" className={header.icon}></img>
          <a className={header.link}>Buscar</a>
          <img src="/icon-info.png" className={header.icon}></img>
          <a className={header.link}>Usuario</a>
        </div>
        <img src="/icon-message.png" className={header.icon}></img>
        <img src="/icon-lamp-white.png" className={header.icon}></img>
        <img src="/icon-list.png" className={header.icon}></img>
        <div className={header.controlsContainer}></div>
      </header>
    </div>
  );
};
