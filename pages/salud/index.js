import React from "react";
import style from "../../styles/salud.module.css";

const Salud = React.memo(() => {
  return (
    <>
      <header className={style.header}>1</header>
      <div className={style.flexcontainer}>
        <form>
          <h3> ¿Quieres más información?</h3> <label>Nombre</label>
          <br />
          <input></input>
          <br /> <label>Número de teléfono</label>
          <br />
          <input></input>
          <br />
          <label> Correo electrónico</label>
          <br />
          <input></input>
          <br /> <label>Háblanos de tu problema</label>
          <br />
          <input></input>
          <br />
          <button className={style.button}>Enviar datos para contacto</button>
        </form>
        <div>
          ¿Estresado por el trabajo? El estrés, la ansiedad y la depresión, son
          de los principales motivos de consulta en terapia psicológica. Equipo
          profesional Contamos con Un equipo de psicólogos con diversas
          especialidades y maestrías, originarios de México, Estados Unidos y
          Cuba Servicio para candidatos Brindamos Terapia individual, de pareja
          y familiar, en modalidad presencial y virtual con precios accesibles
          que van desde $150. Servicio para empresas Ofrecemos Hacer un convenio
          con tu empresa para cuidar la salud mental de tu personal. También te
          podemos apoyar en evaluar el clima organizacional, así como aplicar la
          NOM-035
        </div>
      </div>
      <footer className={style.footer}>
        Acerca de nosotros Términos y condiciones Politica de privacidad
        Contáctanos Todos los derechos reservados - Descubre Sa. de CV.
      </footer>
    </>
  );
});
export default Salud;
