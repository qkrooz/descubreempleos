import React from "react";
import { Grid } from "semantic-ui-react";
import header from "../../../styles/header.module.css";

export const HeaderComponent = () => {
  return (
    <div>
      <header className={header.container}>
        <Grid columns={3} stackable>
          <Grid.Column>
            <img src="/icon-white2.png" className={header.logo}></img>
          </Grid.Column>
          <Grid.Column>
            <div className={header.navContainer}>
              <img src="/icon-home.png" className={header.icon}></img>
              <a className={header.link}>Inicio</a>
              <img src="/icon-search.png" className={header.icon}></img>
              <a className={header.link}>Buscar</a>
              <img src="/icon-info.png" className={header.icon}></img>
              <a className={header.link}>Mis datos</a>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className={header.containericons}>
              <img src="/icon-message.png" className={header.icon}></img>
              <img src="/icon-lamp-white.png" className={header.icon}></img>
              <img src="/icon-list.png" className={header.icon}></img>
            </div>
          </Grid.Column>
        </Grid>

        <div className={header.controlsContainer}></div>
      </header>
    </div>
  );
};
