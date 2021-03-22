import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../resources/MainContext";
import { Card, Icon } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import * as Yup from "yup";
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
      <Modal2
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
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const [habilitiesList, setLanguagesList] = useState([
    { ID: 1, TITLE: "Español", VALUE: "es" },
    { ID: 2, TITLE: "Inglés", VALUE: "en" },
    { ID: 3, TITLE: "Francés", VALUE: "fr" },
    { ID: 4, TITLE: "Chino", VALUE: "zh" },
  ]);
  const purgeHabilities = (value) => {
    let optionValue = JSON.parse(value);
    let habilitiesListCopy = [...habilitiesList];
    const index = habilitiesListCopy.findIndex(
      (item) => item.VALUE === optionValue.VALUE
    );
    if (index > -1) habilitiesListCopy.splice(index, 1);
    setLanguagesList(habilitiesListCopy);
  };
  const renewHabilitiesList = (value) => {
    let habilitiesCopy = [...languages];
    let newArray = habilitiesCopy.filter((item) => item.ID !== value.ID);
    setLanguages(newArray);
    setLanguagesList((habilitiesList) => [...habilitiesList, value]);
  };
  useEffect(() => {
    if (secondaryInfo.HABILIDADES) {
      let array = JSON.parse(secondaryInfo.HABILIDADES);
      for (let i = 0; i < array; i++) {
        purgeHabilities(array[i]);
      }
      setLanguages(array);
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
        AGE: userInfo.AGE ? userInfo.AGE : "",
        GENRE: userInfo.GENRE ? userInfo.GENRE : "femenino",
        TEL_NUMBER: userInfo.TEL_NUMBER ? userInfo.TEL_NUMBER : "",
        STATE: userInfo.STATE ? userInfo.STATE : "",
        CITY: userInfo.CITY ? userInfo.CITY : "",
      }}
      onSubmit={(values) => {
        let BIRTH_DATE = `${selectedYear}-${selectedMonth}-${selectedDay}`;
        values["IDIOMAS"] = JSON.stringify(languages);
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
          .then(({ data }) => console.log(data))
          .catch((error) => console.log(error));
        console.log(values);
      }}
    >
      {({ values, handleChange, errors, handleBlur }) => (
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
                  <span>Número telefónico</span>
                  <div style={{ padding: "0.5em" }}>
                    <span style={{ marginRight: "0.5em" }}>(+52)</span>
                    <input
                      name="TEL_NUMBER"
                      type="number"
                      onChange={handleChange}
                      value={values.TEL_NUMBER}
                    />
                  </div>
                  <span>Estado</span>
                  <div style={{ padding: "0.5em" }}>
                    <select
                      value={selectedStateID}
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
                      value={selectedCityID}
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
                    ? languages.map((key, i) => (
                        <div className={style.chip} key={key.ID}>
                          <span>{key.TITLE}</span>
                          <button
                            type="button"
                            onClick={() => {
                              renewHabilitiesList(key);
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
                        setLanguages((languages) => [
                          ...languages,
                          JSON.parse(e.target.value),
                        ]);
                        purgeHabilities(e.target.value);
                      }}
                    >
                      <option value="none">Selecciona un idioma</option>
                      {habilitiesList.map((key) => (
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
export default Datos;
