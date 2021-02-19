import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import style from "../../styles/registroTrabajador_style.module.css";
import { Grid } from "semantic-ui-react";
import axios from "axios";
const RegistroTrabajador = React.memo(() => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [formData, setFormData] = useState({
    names: "",
    surname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const SetFormData = (e) => {
    let key = e.target.name;
    let temporalObj = { ...formData };
    temporalObj[key] = e.target.value;
    setFormData(temporalObj);
  };
  const ChangeInputPasswordType = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };
  const SubmitForm = () => {};
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className={style.employeecontainer}>
      <div className={style.background}>.</div>
      <Grid columns={2} stackable>
        <Grid.Column className={style.columnpadding}>
          <div>
            <img className={style.img} src="./icon-white2.png" />
            <h2 className={style.h2}>
              Las oportunidades de empleo que tenemos para ti
            </h2>
            <p className={style.textwhite1}>
              <Icon className="copyright outline"></Icon> Todos los derechos
              reservados - Descubre Sa. de CV.
            </p>
          </div>
        </Grid.Column>
        <Grid.Column className={style.columnpadding}>
          <div className={style.containerform}>
            <Form className={style.form} onSubmit={SubmitForm}>
              <div className={style.formHeader}>
                <h3> Regístrate como trabajador</h3>
                <p>
                  Si lo que buscas es reclutar{" "}
                  <Link href="/registro-empresa">
                    regístrate como empresa aquí
                  </Link>
                </p>
              </div>
              <div className={style.formBody}></div>
              <Grid columns={3} stackable>
                <Grid.Column>
                  <Form.Field
                    className={style.field}
                    onChange={SetFormData}
                    name="names"
                  >
                    <input
                      placeholder="Nombres"
                      className={style.input}
                      name="names"
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field className={style.field}>
                    <input
                      placeholder="Apellido materno"
                      name="surname"
                      onChange={SetFormData}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field className={style.field}>
                    <input
                      placeholder="Apellido paterno"
                      name="lastname"
                      onChange={SetFormData}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid>
              <Form.Field>
                <input
                  placeholder="Correo electrónico"
                  name="email"
                  onChange={SetFormData}
                />
              </Form.Field>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Form.Field>
                    <Input
                      icon={
                        <Icon
                          name="eye"
                          link
                          onClick={ChangeInputPasswordType}
                        />
                      }
                      name="password"
                      placeholder="Contraseña"
                      type={passwordInputType}
                      onChange={SetFormData}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <ul className={style.ul}>
                    <li>Al menos un número</li>
                    <li>Al menos una letra mayuscula</li>
                    <li> Mínimo de 8 caracteres</li>
                  </ul>
                </Grid.Column>
              </Grid>
              <p>
                Al registrarte con nosotros declaras haber leído y estar de
                acuerdo con nuestra<a href=""> Política de privacidad</a> así
                como nuestros <a>Términos y condiciones</a> los cuales son
                accesibles a través de los respectivos links en sus títulos.
              </p>
              <Button secondary>Regístrate</Button>
            </Form>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
});
export default RegistroTrabajador;
