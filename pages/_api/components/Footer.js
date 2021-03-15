import React from "react";
import { Icon } from "semantic-ui-react";
import footer from "../../../styles/footer.module.css";
const Footer = React.memo(() => {
  return (
    <footer className={footer.container}>
      <div>
        <h3 className={footer.h3}>
          Acerca de nosotros | Términos y condiciones | Politica de privacidad |
          Contáctanos
        </h3>
        <h4 className={footer.h4}>
          <Icon className="copyright outline" />
          Todos los derechos reservados - Descubre Sa. de CV.
        </h4>
      </div>
      <div className={footer.iconsContainer}>
        <Icon name="facebook" size="big" style={{ marginRight: "1em" }} />
        <Icon name="youtube" size="big" style={{ marginRight: "1em" }} />
        <Icon name="twitter" size="big" />
      </div>
    </footer>
  );
});
export default Footer;
