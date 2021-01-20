import React from "react";
import { Icon } from "semantic-ui-react";
import footer from "../../../styles/footer.module.css";

export const FooterContainer = () => {
  return (
    <div>
      <footer className={footer.container}>
        <Icon className="copyright outline"></Icon> Acerca de nosotros |Términos
        y condiciones| Politica de privacidad| Contáctanos Todos los derechos
        reservados - Descubre Sa. de CV.
      </footer>
    </div>
  );
};
