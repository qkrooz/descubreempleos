import React from "react";
import { Card, Form } from "semantic-ui-react";
import style from "../../styles/salud.module.css";

const Salud = React.memo(() => {
  return (
    <div className={style.content}>
      <header className={style.header}>
        <img src="./icon-blue2.png" className={style.img}></img>
      </header>
      <div className={style.flexcontainer}>
        <div className={style.background}>.</div>
        <div className={style.columm1}>
          <Form className={style.form}>
            <div className={style.titleform}>
              <h3> ¿Quieres más información?</h3>
            </div>
            <Form.Field>
              <label className={style.label}>Nombre</label> <input type="text" placeholder="Nonbre Completo"></input>
            </Form.Field>
            <Form.Field>
              <label className={style.label}>Número de teléfono</label>
              <input type="text" placeholder="Teléfono con código de área"></input>
            </Form.Field>
            <Form.Field>
              <label className={style.label}> Correo electrónico</label>
              <input type="text" placeholder="Correo"></input>
            </Form.Field>
            <Form.Field>
              <label className={style.label}>Háblanos de tu problema</label>
              <input type="textarea" placeholder="No es necesario contestar esta casilla" className={style.textarea}></input>
            </Form.Field>
            <div className={style.containerbutton}>
              <button className={style.button}>
                Enviar datos para contacto
              </button>
            </div>
          </Form>
          <img src="./icon-lamp-white-blue.png" className={style.imgicon}></img>
        </div>
        <div className={style.columm2}>
          <div className={style.column2content}> <h1 className={style.title}> ¿Estresado por el trabajo?</h1> <p className={style.textindex}>El estrés, la ansiedad y la
          depresión, son de los principales motivos de consulta en terapia
          psicológica.</p>
          </div></div>
      </div>
      <div className={style.flexcontainer1}>
        <Card>
          <div className={style.card}>
            <h1>Equipo profesional</h1>
          </div>
          <Card.Content>
            <div className={style.heigthcard}> <h4 className={style.subtitlecard}>Contamos con</h4> Un equipo de psicólogos con Cardersas
            especialidades y maestrías, originarios de México, Estados Unidos y
            Cuba</div>
          </Card.Content>
        </Card>
        <Card>
          <div className={style.card}>
            <h1> Servicio para candidatos</h1>
          </div>
          <Card.Content>
            <div className={style.heigthcard}><h4 className={style.subtitlecard}>Brindamos</h4> Terapia individual, de pareja y familiar, en
            modalidad presencial y virtual con precios accesibles que van desde
            $150.</div>
          </Card.Content>
        </Card>
        <Card>
          <div className={style.card}>
            <h1>Servicio para empresas</h1>
          </div>
          <Card.Content>
            <div className={style.heigthcard}> <h4 className={style.subtitlecard}>Ofrecemos </h4>Hacer un convenio con tu empresa para cuidar la
            salud mental de tu personal. También te podemos apoyar en evaluar el
            clima organizacional, así como aplicar la NOM-035</div>
          </Card.Content>
        </Card>
      </div>
      <footer className={style.footer}>
        <div>
          Acerca de nosotros | Términos y condiciones | Politica de privacidad |
          Contáctanos <br />
          Todos los derechos reservados - Descubre Sa. de CV.
        </div>
        <div className={style.flexfooter}>
          <img src="./icon-facebook-blue.png" className={style.image}></img>
          <img
            src="./icon-youtube-white-blue.png"
            className={style.image}
          ></img>
          <img src="./icon-twitter-blue.png" className={style.image}></img>
        </div>
      </footer>
    </div >
  );
});
export default Salud;
