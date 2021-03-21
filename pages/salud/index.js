import React from "react";
import { Card, Form } from "semantic-ui-react";
import style from "../../styles/salud.module.css";

const Salud = React.memo(() => {
  return (
    <>
      <header className={style.header}>
        <img src="./icon-blue2.png" className={style.img}></img>
      </header>
      <div className={style.flexcontainer}>
        <div className={style.columm1}>
          <Form className={style.form}>
            <h3> ¿Quieres más información?</h3>
            <Form.Field>
              <label>Nombre</label> <input></input>
            </Form.Field>
            <Form.Field>
              <label>Número de teléfono</label>
              <input></input>
            </Form.Field>
            <Form.Field>
              <label> Correo electrónico</label>
              <input></input>
            </Form.Field>
            <Form.Field>
              <label>Háblanos de tu problema</label>
              <input></input>
            </Form.Field>
            <div className={style.containerbutton}>
              <button className={style.button}>
                Enviar datos para contacto
              </button>
            </div>
          </Form>
        </div>
        <div className={style.columm2}>
          <h1> ¿Estresado por el trabajo?</h1> El estrés, la ansiedad y la
          depresión, son de los principales motivos de consulta en terapia
          psicológica.
        </div>
      </div>
      <div className={style.flexcontainer}>
        <Card>
          <div className={style.card}>Equipo profesional </div>
          <b>Contamos con</b> Un equipo de psicólogos con Cardersas
          especialidades y maestrías, originarios de México, Estados Unidos y
          Cuba
        </Card>
        <Card>
          <div className={style.card}> Servicio para candidatos</div>{" "}
          <b>Brindamos</b> Terapia individual, de pareja y familiar, en
          modalidad presencial y virtual con precios accesibles que van desde
          $150.
        </Card>
        <Card>
          <div className={style.card}>Servicio para empresas </div>
          <b>Ofrecemos </b>Hacer un convenio con tu empresa para cuidar la salud
          mental de tu personal. También te podemos apoyar en evaluar el clima
          organizacional, así como aplicar la NOM-035
        </Card>
      </div>
      <footer className={style.footer}>
        Acerca de nosotros Términos y condiciones Politica de privacidad
        Contáctanos Todos los derechos reservados - Descubre Sa. de CV.
      </footer>
    </>
  );
});
export default Salud;
