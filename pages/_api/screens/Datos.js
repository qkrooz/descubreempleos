import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../resources/MainContext";
import { Card, Icon } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import Estados from "../resources/states_mexico.json";
import Cities from "../resources/cities_mexico.json";
// components
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
// styles
import style from "../../../styles/datos.module.css";
import axios from "axios";
import apiRoute from "../resources/apiRoute";
const Datos = React.memo(() => {
  // state

  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const [modalsVisibility, setModalsVisibility] = useState({
    modal2: false,
    modal3: false,
    modal4: false,
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
                  setModalsVisibility({ ...modalsVisibility, modal2: true });
                }}
              >
                <Icon name="edit" size="large" />
              </button>
            </div>
            <div>
              <table style={{ width: "100%" }}>
                <tbody className={style.personalTbody}>
                  <tr>
                    <td className={style.personalLabel}>Fecha de nacimiento</td>
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
                      {userInfo.BIRTH_DATE ? (
                        `${moment(userInfo.BIRTH_DATE).format("DD/MM/YYYY")}`
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
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
                        `${userInfo.AGE} años`
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
                    <td style={{ textTransform: "capitalize" }}>
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
                    <td className={style.personalLabel}>CURP</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td
                      style={{ textTransform: "capitalize", fontSize: "0.8em" }}
                    >
                      {userInfo.CURP ? (
                        userInfo.CURP
                      ) : (
                        <div>
                          <Icon name="warning circle" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.personalLabel}>RFC</td>
                    <td>
                      <div
                        style={{
                          width: "3em",
                          borderBottom: "2px solid gray",
                          margin: "0 1em",
                        }}
                      />
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {userInfo.RFC ? (
                        userInfo.RFC
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
                    <td style={{ textTransform: "capitalize" }}>
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
                    <td style={{ textTransform: "capitalize" }}>
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
                      {secondaryInfo.IDIOMAS ? (
                        JSON.parse(secondaryInfo.IDIOMAS).length === 0 ? (
                          <div>
                            <Icon name="warning circle" />
                            <span>No disponible</span>
                          </div>
                        ) : (
                          JSON.parse(secondaryInfo.IDIOMAS).map((key) => (
                            <div
                              key={key.ID}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span>{key.TITLE}</span>
                            </div>
                          ))
                        )
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5em",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
                Habilidades
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
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {secondaryInfo.HABILIDADES ? (
                JSON.parse(secondaryInfo.HABILIDADES).length === 0 ? (
                  <div>
                    <Icon name="warning circle" />
                    <span>No disponible</span>
                  </div>
                ) : (
                  JSON.parse(secondaryInfo.HABILIDADES).map((item) => (
                    <div
                      key={item.ID}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5em",
                        backgroundColor: "#e2e2e2",
                        borderRadius: "2em",
                        marginBottom: "1em",
                      }}
                    >
                      <span
                        style={{ marginRight: "0.5em", fontWeight: "bold" }}
                      >
                        {item.TITLE}
                      </span>
                    </div>
                  ))
                )
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
                  setModalsVisibility({ ...modalsVisibility, modal4: true });
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
      <Modal2
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Modal3
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Modal4
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Footer />
    </>
  );
});
const Modal2 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const toast = useToast();
  const [years, setYears] = useState([]);
  const [days, setDays] = useState();
  const [selectedCityID, setSelectedCityID] = useState("0");
  const [selectedStateID, setSelectedStateID] = useState("0");
  const [selectedYear, setSelectedYear] = useState(moment(new Date()).year());
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [languages, setLanguages] = useState([]);
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [languagesList, setLanguagesList] = useState([
    { ID: 1, TITLE: "Español", VALUE: "es" },
    { ID: 2, TITLE: "Inglés", VALUE: "en" },
    { ID: 3, TITLE: "Francés", VALUE: "fr" },
    { ID: 4, TITLE: "Chino", VALUE: "zh" },
  ]);
  const purgeLanguages = (value) => {
    let languagesListCopy = [...languagesList];
    value.forEach((item1) => {
      let index = languagesListCopy.findIndex(
        (item2) => item2.VALUE === item1.VALUE
      );
      languagesListCopy.splice(index, 1);
    });
    setLanguagesList(languagesListCopy);
  };
  useEffect(() => {
    // setting state
    userInfo.STATE
      ? setSelectedStateID(
          Estados.states.filter(
            (item) => item.name.toLowerCase() === userInfo.STATE
          )[0].id
        )
      : null;
    // setting city
    userInfo.CITY
      ? setSelectedCityID(
          Cities.cities.filter(
            (item) => item.name.toLowerCase() === userInfo.CITY
          )[0].id
        )
      : NULL;
    // setYears
    userInfo.BIRTH_DATE
      ? setSelectedYear(moment(userInfo.BIRTH_DATE).format("yyyy"))
      : null;
    // setMonth
    userInfo.BIRTH_DATE
      ? setSelectedMonth(moment(userInfo.BIRTH_DATE).format("MM"))
      : null;
    // setDat
    userInfo.BIRTH_DATE
      ? setSelectedDay(moment(userInfo.BIRTH_DATE).format("DD"))
      : null;
    if (secondaryInfo.IDIOMAS) {
      if (JSON.parse(secondaryInfo.IDIOMAS).length !== 0) {
        let array = JSON.parse(secondaryInfo.IDIOMAS);
        setLanguages(array);
        purgeLanguages(array);
      }
    } else {
      setLanguages([]);
    }
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
  }, []);
  useEffect(() => {
    setDays(
      moment(`${selectedYear},${selectedMonth}`, "YYYY-MM").daysInMonth()
    );
  }, [selectedYear, selectedMonth]);
  return (
    <Formik
      initialValues={{
        GENRE: userInfo.GENRE ? userInfo.GENRE : "femenino",
        TEL_NUMBER: userInfo.TEL_NUMBER ? userInfo.TEL_NUMBER : "",
        CURP: userInfo.CURP ? userInfo.CURP : "",
        RFC: userInfo.RFC ? userInfo.RFC : "",
      }}
      onSubmit={(values) => {
        let BIRTH_DATE = `${selectedYear}-${selectedMonth}-${selectedDay}`;
        values["IDIOMAS"] = languages;
        values["BIRTH_DATE"] =
          moment().diff(BIRTH_DATE, "years") !== 0 ? BIRTH_DATE : null;
        values["ID"] = parseInt(userInfo.ID);
        values["AGE"] =
          moment().diff(BIRTH_DATE, "years") !== 0
            ? moment().diff(BIRTH_DATE, "years")
            : null;
        values["CITY"] =
          selectedCityID === "0"
            ? Cities.cities
                .find((item) => item.state_id === selectedStateID)
                .name.toLowerCase()
            : Cities.cities
                .filter((o) => o.id === selectedCityID)[0]
                .name.toLowerCase();
        values["STATE"] =
          Estados.states
            .filter((o) => o.id === selectedStateID)[0]
            .name.toLowerCase() !== "todo méxico"
            ? Estados.states
                .filter((o) => o.id === selectedStateID)[0]
                .name.toLowerCase()
            : null;
        axios
          .post(`${apiRoute}/updateTrabajadorSecondaryInfo.php`, values)
          .then(({ data }) => {
            if (data.code === 200) {
              let userInfoCopy = { ...userInfo };
              let secondaryInfoCopy = { ...secondaryInfo };
              userInfoCopy.AGE = values.AGE;
              userInfoCopy.BIRTH_DATE = values.BIRTH_DATE;
              userInfoCopy.GENRE = values.GENRE;
              userInfoCopy.TEL_NUMBER = values.TEL_NUMBER;
              userInfoCopy.STATE = values.STATE;
              userInfoCopy.CITY = values.CITY;
              userInfoCopy.CURP = values.CURP;
              userInfoCopy.RFC = values.RFC;
              secondaryInfoCopy.IDIOMAS = JSON.stringify(values.IDIOMAS);
              setUserInfo(userInfoCopy);
              setSecondaryInfo(secondaryInfoCopy);
              setModalsVisibility({
                ...modalsVisibility,
                modal2: false,
              });
              toast({
                title: "Información actualizada",
                description: "Cambios exitosos",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Ocurrió un error inesperado",
                description: "Intenta más tarde",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .catch((error) => console.log(error));
      }}
    >
      {({ values, handleChange }) => (
        <Modal
          isOpen={modalsVisibility.modal2}
          onClose={() => {
            setModalsVisibility({
              ...modalsVisibility,
              modal2: false,
            });
          }}
          size="sm"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifica tus datos personales</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Form id="modal2Form">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Fecha de nacimiento</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "0.5em",
                    }}
                  >
                    <select
                      style={{ padding: "0.5em", marginRight: "0.5em" }}
                      aria-label="Año"
                      onChange={(e) => setSelectedYear(e.target.value)}
                      value={selectedYear}
                    >
                      {years.map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                    <select
                      style={{ padding: "0.5em", marginRight: "0.5em" }}
                      aria-label="Año"
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      value={selectedMonth}
                    >
                      <option value="01">Enero</option>
                      <option value="02">Febrero</option>
                      <option value="03">Marzo</option>
                      <option value="04">Abril</option>
                      <option value="05">Mayo</option>
                      <option value="06">Junio</option>
                      <option value="07">Julio</option>
                      <option value="08">Agosto</option>
                      <option value="09">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                    <select
                      style={{ padding: "0.5em", marginRight: "0.5em" }}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      value={selectedDay}
                    >
                      {Array(days)
                        .fill(0)
                        .map((_, i) => (
                          <option
                            key={(i + 1).toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            value={(i + 1).toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                          >
                            {(i + 1).toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                          </option>
                        ))}
                    </select>
                  </div>
                  <span>Género</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "0.5em",
                    }}
                  >
                    <select
                      name="GENRE"
                      style={{ padding: "0.5em" }}
                      value={values.GENRE}
                      onChange={handleChange}
                    >
                      <option value="fenemino">Femenino</option>
                      <option value="masculino">Masculino</option>
                      <option value="none">No especificar</option>
                    </select>
                  </div>
                  <span>CURP</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "0.5em",
                    }}
                  >
                    <Field
                      type="text"
                      name="CURP"
                      onChange={handleChange}
                      value={values.CURP}
                    />
                  </div>
                  <span>RFC</span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "0.5em",
                    }}
                  >
                    <Field
                      type="text"
                      name="RFC"
                      onChange={handleChange}
                      value={values.RFC}
                    />
                  </div>
                  <span>Número telefónico</span>
                  <div style={{ padding: "0.5em" }}>
                    <span style={{ marginRight: "0.5em" }}>(+52)</span>
                    <Field
                      name="TEL_NUMBER"
                      type="number"
                      onChange={handleChange}
                      value={values.TEL_NUMBER}
                    />
                  </div>
                  <span>Estado</span>
                  <div style={{ padding: "0.5em" }}>
                    <select
                      defaultValue={
                        userInfo.STATE
                          ? Estados.states.filter(
                              (item) =>
                                item.name.toLowerCase() === userInfo.STATE
                            )[0].id
                          : selectedStateID
                      }
                      onChange={(e) => {
                        setSelectedStateID(e.target.value);
                      }}
                    >
                      {Estados.states.map((key) => {
                        return (
                          <option key={key.id} value={key.id}>
                            {key.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <span>Ciudad</span>
                  <div style={{ padding: "0.5em" }}>
                    <select
                      defaultValue={
                        userInfo.CITY
                          ? Cities.cities.filter(
                              (item) =>
                                item.name.toLowerCase() === userInfo.CITY
                            )[0].id
                          : selectedCityID
                      }
                      onChange={(e) => {
                        setSelectedCityID(e.target.value);
                      }}
                      disabled={!Boolean(selectedStateID)}
                    >
                      {Cities.cities
                        .filter((item) => item.state_id === selectedStateID)
                        .map((key) => (
                          <option key={key.id} value={key.id}>
                            {key.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <span>Idiomas</span>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {languages.length !== 0
                    ? languages.map((key) => (
                        <div className={style.chip} key={key.ID}>
                          <span>{key.TITLE}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setLanguagesList((languagesList) => [
                                ...languagesList,
                                key,
                              ]);
                              setLanguages((languages) =>
                                languages.filter((item) => item.ID !== key.ID)
                              );
                            }}
                          >
                            <Icon name="close" />
                          </button>
                        </div>
                      ))
                    : null}
                </div>
                <div style={{ padding: "0.5em" }}>
                  {languages.length >= 4 ? null : (
                    <select
                      defaultValue="none"
                      onChange={(e) => {
                        setLanguagesList((languagesList) =>
                          languagesList.filter(
                            (item) => item.ID !== JSON.parse(e.target.value).ID
                          )
                        );
                        setLanguages((languages) => [
                          ...languages,
                          JSON.parse(e.target.value),
                        ]);
                      }}
                    >
                      <option value="none">Selecciona un idioma</option>
                      {languagesList.map((key) => (
                        <option value={JSON.stringify(key)} key={key.ID}>
                          {key.TITLE}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setModalsVisibility({
                    ...modalsVisibility,
                    modal2: false,
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#ECB83C" }}
                form="modal2Form"
              >
                Actualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
});
const Modal3 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const toast = useToast();
  const { secondaryInfoState, userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [habilities, setHabilities] = useState([]);
  const [habilitiesList, setHabilitiesList] = useState([
    { ID: 1, TITLE: "Pensamiento Crítico", VALUES: "pensamiento critico" },
    { ID: 2, TITLE: "Trabajo en equipo", VALUES: "trabajo en equipo" },
    { ID: 3, TITLE: "Comunicacion", VALUES: "comunicacion" },
  ]);
  // funciones
  const submitHabilities = () => {
    if (habilities.length !== 0) {
      axios
        .post(`${apiRoute}/updateHabilities.php`, {
          HABILIDADES: habilities,
          ID: userInfo.ID,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            let secondaryInfoCopy = { ...secondaryInfo };
            secondaryInfoCopy.HABILIDADES = JSON.stringify(habilities);
            setSecondaryInfo(secondaryInfoCopy);
            setModalsVisibility({ ...modalsVisibility, modal3: false });
            toast({
              title: "Información actualizada",
              description: "Cambios exitosos",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Ocurrió un error",
              description: "Intentar más tarde",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      setModalsVisibility({ ...modalsVisibility, modal3: false });
    }
  };
  const purgeHabilities = (array) => {
    let habilitiesListCopy = [...habilitiesList];
    array.forEach((item1) => {
      let index = habilitiesListCopy.findIndex(
        (item2) => item2.ID === item1.ID
      );
      habilitiesListCopy.splice(index, 1);
    });
    setHabilitiesList(habilitiesListCopy);
  };
  // effects
  useEffect(() => {
    if (secondaryInfo.HABILIDADES) {
      if (JSON.parse(secondaryInfo.HABILIDADES).length !== 0) {
        let array = JSON.parse(secondaryInfo.HABILIDADES);
        setHabilities(array);
        purgeHabilities(array);
      }
    } else {
      setHabilities([]);
    }
  }, []);
  return (
    <Modal
      isOpen={modalsVisibility.modal3}
      onClose={() => {
        setModalsVisibility({
          ...modalsVisibility,
          modal3: false,
        });
      }}
      size="md"
    >
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalHeader>Actualizar habilidades</ModalHeader>
        <ModalBody>
          <div
            style={{
              border: "1px solid #e2e2e2",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              padding: "0.5em",
              marginBottom: "1em",
            }}
          >
            {habilities.length === 0 ? (
              <span>No hay habilidades seleccionadas</span>
            ) : (
              habilities.map((key) => (
                <div
                  key={key.ID}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5em 0.5em 0.5em 1em",
                    backgroundColor: "#e2e2e2",
                    borderRadius: "2em",
                    marginBottom: "1em",
                  }}
                >
                  <span style={{ marginRight: "0.5em", fontWeight: "bold" }}>
                    {key.TITLE}
                  </span>
                  <button
                    onClick={() => {
                      setHabilities((habilities) =>
                        habilities.filter((item) => item.ID !== key.ID)
                      );
                      setHabilitiesList((habilitiesList) => [
                        ...habilitiesList,
                        key,
                      ]);
                    }}
                  >
                    <Icon name="close" />
                  </button>
                </div>
              ))
            )}
          </div>
          {habilitiesList.length === 0 ? null : (
            <select
              name="HABILIDADES"
              onChange={(e) => {
                setHabilitiesList((habilitiesList) =>
                  habilitiesList.filter(
                    (item) => item.ID !== JSON.parse(e.target.value).ID
                  )
                );
                setHabilities((habilities) => [
                  ...habilities,
                  JSON.parse(e.target.value),
                ]);
              }}
            >
              <option value="none">Selecciona una habilidad</option>
              {habilitiesList.map((key) => (
                <option key={key.ID} value={JSON.stringify(key)}>
                  {key.TITLE}
                </option>
              ))}
            </select>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setModalsVisibility({
                ...modalsVisibility,
                modal3: false,
              });
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={submitHabilities}
            style={{ backgroundColor: "#ECB83C" }}
          >
            Actualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
const Modal4 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const toast = useToast();
  const validationSchema = Yup.object({
    PASSWORD1: Yup.string().required("Password es requerida"),
    PASSWORD2: Yup.string().oneOf(
      [Yup.ref("PASSWORD1"), null],
      "Las contraseñas tienen que ser iguales"
    ),
  });
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        EMAIL: userInfo.EMAIL,
        PASSWORD1: "",
        PASSWORD2: "",
        OLDPASSWORD: "",
      }}
      onSubmit={(values) => {
        if (values.OLDPASSWORD === userInfo.PASSWORD) {
          axios
            .post(`${apiRoute}/updatePassword.php`, {
              ID: userInfo.ID,
              PASSWORD: values.PASSWORD2,
            })
            .then(({ data }) => {
              if (data.code === 200) {
                setModalsVisibility({ ...modalsVisibility, modal4: false });
                let userInfoCopy = { ...userInfo };
                userInfoCopy.PASSWORD = values.PASSWORD2;
                setUserInfo(userInfoCopy);
                toast({
                  title: "Información actualizada",
                  description: "Cambios exitosos",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Ocurrió un error inesperado",
                  description: "Favor de intentar mas tarde",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            })
            .catch((error) => console.log(error));
        } else {
          setModalsVisibility({ ...modalsVisibility, modal4: false });
        }
      }}
    >
      {({ values, handleChange, errors }) => (
        <Modal
          isOpen={modalsVisibility.modal4}
          onClose={() => {
            setModalsVisibility({ ...modalsVisibility, modal4: false });
          }}
        >
          <ModalOverlay />
          <ModalCloseButton />
          <ModalContent>
            <ModalHeader>Actualizar Información</ModalHeader>
            <ModalBody>
              <Form id="modal4Form" style={{ width: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "1em",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ marginRight: "1em" }}>Email</span>
                  <Field
                    name="EMAIL"
                    type="email"
                    onChange={handleChange}
                    value={values.EMAIL}
                    readOnly
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "1em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "1em" }}>
                    Contraseña anterior
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Field
                      name="OLDPASSWORD"
                      type="password"
                      onChange={handleChange}
                      value={values.OLDPASSWORD}
                    />
                    {errors.OLDPASSWORD ? (
                      <span style={{ color: "red" }}>Campo requerido</span>
                    ) : null}
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "1em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "1em" }}>Nueva Contraseña</span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Field
                      name="PASSWORD1"
                      type="password"
                      onChange={handleChange}
                      value={values.PASSWORD1}
                    />
                    {errors.PASSWORD1 ? (
                      <span style={{ color: "red" }}>Campo requerido</span>
                    ) : null}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "1em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "1em" }}>
                    Repita nueva contraseña
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Field
                      name="PASSWORD2"
                      type="password"
                      value={values.PASSWORD2}
                      onChange={handleChange}
                    />
                    {errors.PASSWORD1 ? (
                      <span style={{ color: "red" }}>
                        Las contraseñas tienen que ser iguales*
                      </span>
                    ) : null}
                  </div>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setModalsVisibility({
                    ...modalsVisibility,
                    modal4: false,
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#ECB83C" }}
                form="modal4Form"
              >
                Actualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
});
export default Datos;
