import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import footer from "../../../styles/footer.module.css";

export const FooterContainer = () => {
  return (
    <div>
      <footer className={footer.container}>
        <Grid columns={2} stackable>
          <Grid.Column>
            <h3 className={footer.h3}>
              Acerca de nosotros | Términos y condiciones | Politica de
              privacidad | Contáctanos
            </h3>
            <h4 className={footer.h4}>
              <Icon className="copyright outline"></Icon>Todos los derechos
              reservados - Descubre Sa. de CV.
            </h4>
          </Grid.Column>
          <Grid.Column>
            <div className={footer.floatimg}>
              <img src="/icon-facebook-blue.png" className={footer.icon}></img>
              <img src="/icon-youtube-white.png" className={footer.icon}></img>
              <img src="/icon-twitter-blue.png" className={footer.icon}></img>
            </div>
          </Grid.Column>
        </Grid>
      </footer>
    </div>
  );
};
