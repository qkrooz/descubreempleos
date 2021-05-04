import React from "react";
import { Facebook, Twitter, YouTube } from "@material-ui/icons";
import footer from "../../../styles/footer.module.css";
const Footer = React.memo(() => {
  return (
    <footer className={footer.container}>
      <div className={footer.infoContainer}>
        <div className={footer.h3}>
          <a href="#">Acerca de nosotros</a>|
          <a href="#">Términos y condiciones</a>|
          <a href="#">Politica de privacidad</a>|<a href="#">Contáctanos</a>
        </div>
        <span className={footer.h4}>
          {"\u00a9"}
          Todos los derechos reservados - Descubre Sa. de CV.
        </span>
      </div>
      <div className={footer.iconsContainer}>
        <Facebook className={footer.icon} />
        <YouTube className={footer.icon} />
        <Twitter className={footer.icon} />
      </div>
    </footer>
  );
});
export default Footer;
