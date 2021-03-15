import React, { useContext, useState } from "react";
import { MainContext } from "../resources/MainContext";
import { Card, Icon } from "semantic-ui-react";
import style from "../../../styles/datos.module.css";
// components
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
export default function DatoComponent() {
  // state
  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const [modalsVisibility, setModalsVisibility] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });
  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <UserCard />
          <Card style={{ padding: "1em" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                Datos personales
              </span>
              <button
                className={style.modalButton}
                onClick={() => {
                  setModalsVisibility({ ...modalsVisibility, modal1: true });
                }}
              >
                <Icon name="edit" size="large" />
              </button>
            </div>
            <div>
              <table style={{ width: "100%" }}>
                <tbody className={style.personalTbody}>
                  <tr>
                    <td className={style.personalLabel}>Edad</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td>
                      {userInfo.AGE ? (
                        userInfo.AGE
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>Género</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td>
                      {userInfo.GENRE ? (
                        userInfo.GENRE
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>Teléfono</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td>
                      {userInfo.TEL_NUMBER ? (
                        userInfo.TEL_NUMBER
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>Estado</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td>
                      {userInfo.STATE ? (
                        userInfo.STATE
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>Ciudad</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td>
                      {userInfo.CITY ? (
                        userInfo.CITY
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>Idiomas</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td>
                      {secondaryInfo.LANGUAGES ? (
                        secondaryInfo.LANGUAGES
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card style={{ padding: "1em" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                Habilidades
              </span>
              <button
                className={style.modalButton}
                onClick={() => {
                  setModalsVisibility({ ...modalsVisibility, modal2: true });
                }}
              >
                <Icon name="edit" size="large" />
              </button>
            </div>
            <div>
              {secondaryInfo.HABILIDADES ? (
                secondaryInfo.HABILIDADES
              ) : (
                <div>
                  <Icon name="warning circle" />
                  <span>No disponible</span>
                </div>
              )}
            </div>
          </Card>
          <Card style={{ padding: "1em" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                Seguridad
              </span>
              <button
                className={style.modalButton}
                onClick={() => {
                  setModalsVisibility({ ...modalsVisibility, modal3: true });
                }}
              >
                <Icon name="edit" size="large" />
              </button>
            </div>
            <div>
              <table style={{ width: "100%" }}>
                <tbody className={style.personalTbody}>
                  <tr>
                    <td className={style.personalLabel}>Correo:{"  "}</td>
                    <td
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1em",
                        paddingLeft: "1em",
                      }}
                    >
                      {userInfo.EMAIL.substring(0, 3) +
                        "****" +
                        userInfo.EMAIL.substring(userInfo.EMAIL.length - 10)}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>Contraseña:</td>
                    <td
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1em",
                        paddingLeft: "1em",
                      }}
                    >
                      *********
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className={style.rigth}>
          <Card className={style.card1}>
            <div className={style.dataCardHeader}>
              <h1>Experiencia laboral</h1>
              <button className={style.enableEditButton}>
                <Icon
                  name="add circle"
                  style={{ marginLeft: "0.5em" }}
                  size="large"
                />
              </button>
            </div>
            <Card.Content>
              <Card.Description>
                <h3>Aún no has agregado ninguna experiencia laboral</h3>
                <p>
                  Aumenta tus probabilidades de exito agregando experiencia en
                  este campo
                </p>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={style.card1}>
            <div className={style.dataCardHeader}>
              <h1>Grado Educativo</h1>
              <button className={style.enableEditButton}>
                <Icon
                  name="add circle"
                  style={{ marginLeft: "0.5em" }}
                  size="large"
                />
              </button>
            </div>
            <Card.Content>
              <Card.Description>
                <h3>Aún no has agregado ningun grado educativo</h3>
                <p>
                  Aumenta tus probabilidades de exito agregando experiencia en
                  este campo
                </p>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={style.card}>
            <div className={style.dataCardHeader}>
              <h1>Cursos y certificaciones</h1>
              <button className={style.enableEditButton}>
                <Icon
                  name="add circle"
                  style={{ marginLeft: "0.5em" }}
                  size="large"
                />
              </button>
            </div>
            <Card.Content>
              <Card.Description>
                <h3>Aún no has agregado ningun curso o certificación</h3>
                <p>
                  Aumenta tus probabilidades de exito agregando experiencia en
                  este campo
                </p>
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
