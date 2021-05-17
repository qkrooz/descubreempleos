import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { MainContext } from "../resources/MainContext";
import apiRoute from "../resources/apiRoute";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Cities from "../resources/cities_mexico.json";
import States from "../resources/states_mexico.json";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Flex,
  Text,
  toast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Close, Person } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import style from "../../../styles/modals.module.css";
const ThisContext = React.createContext();
export const CustomModal = React.memo(({ hook, content }) => {
  const router = useRouter();
  const toast = useToast();
  const { userInfoState, secondaryInfoState, ResetInfo } =
    useContext(MainContext);
  const [formInitialValues, setFormInitialValues] = useState();
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [userInfo, setUserInfo] = userInfoState;
  const { modalState } = hook;
  const [modal, setModal] = modalState;
  const primaryKeys = [
    "BIRTH_DATE",
    "NAMES",
    "LAST_NAME",
    "MOTHERS_LAST_NAME",
    "AGE",
    "GENRE",
    "TEL_NUMBER",
    "STATE",
    "CITY",
    "PASSWORD",
    "EMAIL",
  ];
  const secondaryKeys = [
    "TITULO",
    "HABILIDADES",
    "IDIOMAS",
    "EXPERIENCIA_LABORAL",
    "GRADO_EDUCATIVO",
    "CURSOS_CERTIFICACIONES",
  ];

  const onClose = () => {
    setModal(!modal);
  };
  const setNewInfo = (values) => {
    let userInfoCopy = { ...userInfo };
    let secondaryInfoCopy = { ...secondaryInfo };
    Object.entries(values).forEach((key) => {
      if (key[0] !== "ID") {
        if (primaryKeys.includes(key[0])) {
          key[1] === "todo méxico" ? (key[1] = null) : null;
          userInfoCopy[key[0]] = key[1];
          setUserInfo(userInfoCopy);
        } else if (secondaryKeys.includes(key[0])) {
          secondaryInfoCopy[key[0]] = key[1];
          setSecondaryInfo(secondaryInfoCopy);
        }
      }
    });
  };
  const FormContentComponent = ModalContentIndex[content].form;
  useEffect(() => {
    let formInitialValues;
    formInitialValues = ModalContentIndex[content].formInitialValues;
    Object.entries(formInitialValues).forEach((key) => {
      if (primaryKeys.includes(key[0])) {
        userInfo[key[0]]
          ? (formInitialValues[key[0]] = userInfo[key[0]])
          : (formInitialValues[key[0]] = "");
      } else if (secondaryKeys.includes(key[0])) {
        secondaryInfo[key[0]]
          ? (formInitialValues[key[0]] = secondaryInfo[key[0]])
          : key[0] === "IDIOMAS" ||
            key[0] === "HABILIDADES" ||
            key[0] === "GRADO_EDUCATIVO" ||
            key[0] === "CURSOS_CERTIFICACIONES" ||
            key[0] === "EXPERIENCIA_LABORAL"
          ? (formInitialValues[key[0]] = JSON.stringify([]))
          : (formInitialValues[key[0]] = "");
      }
    });
    setFormInitialValues(formInitialValues);
  }, [modal]);
  return (
    <Modal
      isOpen={modal}
      onClose={onClose}
      size={ModalContentIndex[content].modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ModalContentIndex[content].title}</ModalHeader>
        <ModalCloseButton />
        <Formik
          validationSchema={ModalContentIndex[content].validation}
          initialValues={formInitialValues}
          onSubmit={(values) => {
            values.ID = userInfo.ID;
            axios
              .post(ModalContentIndex[content].apiURL, values)
              .then(({ data }) => {
                // console.log(data);
                switch (data.code) {
                  case 200:
                    setNewInfo(values);
                    toast({
                      title: "Información actualizada",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                    break;
                  default:
                    toast({
                      title: "No se pudo actualizar la información",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                    break;
                }
                if (data.willSignOut) {
                  toast({
                    title: "Cerrando sesión...",
                    status: "info",
                    duration: 3000,
                  });
                  setTimeout(() => {
                    ResetInfo();
                    router.push("/entra");
                  }, 3500);
                }
                onClose();
              })
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleChange, errors }) => (
            <ModalBody>
              <ThisContext.Provider
                value={{
                  values: values,
                  handleChange: handleChange,
                  errors: errors,
                  content: content,
                }}
              >
                <Form id="modalForm">
                  <FormContentComponent
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    onClose={onClose}
                  />
                </Form>
              </ThisContext.Provider>
            </ModalBody>
          )}
        </Formik>
        <ModalFooter>
          <Button mr={2} type="submit" form="modalForm">
            Actualizar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
const Content1 = () => {
  const toast = useToast();
  const imgInputRef = React.useRef();
  const { userInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  const { values, handleChange, errors } = useContext(ThisContext);
  const [imgError, setImgError] = useState(false);
  const uploadImage = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userID", userInfo.ID);
    axios
      .post(`${apiRoute}/uploadProfilePhoto.php`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(({ data }) => {
        switch (data.code) {
          case 200:
            setUserInfo({ ...userInfo, IMAGE_URL: data.IMAGE_URL });
            toast({
              title: "Imagen actualizada",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setImgError(false);
            break;
          case 400:
            toast({
              title: "No se ha podido actualizar la imagen",
              description: "Por favor intente mas tarde",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            break;
          case 500:
            toast({
              title: "Este tipo de archivo no es aceptado",
              description:
                "Por favor intente con un archivo con extension, jpg, jpeg o png.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Flex>
      <Flex mr={4} grow={1} direction="column" align="center">
        {imgError ? (
          <Flex
            background="#f2f2f2"
            width="8em"
            height="8em"
            borderRadius="50%"
            justify="center"
            align="center"
            cursor="pointer"
            onClick={() => {
              imgInputRef.current.click();
            }}
          >
            <input
              type="file"
              hidden
              ref={imgInputRef}
              onClick={(e) => (e.target.value = null)}
              onChange={(e) => uploadImage(e)}
            />
            <Person style={{ fontSize: "3.5em" }} />
          </Flex>
        ) : (
          <Flex
            background="#f2f2f2"
            width="8em"
            height="8em"
            borderRadius="50%"
            justify="center"
            align="center"
            cursor="pointer"
            cursor="pointer"
            onClick={() => {
              imgInputRef.current.click();
            }}
          >
            <input
              type="file"
              hidden
              ref={imgInputRef}
              onClick={(e) => (e.target.value = null)}
              onChange={(e) => uploadImage(e)}
            />
            <img
              src={userInfo.IMAGE_URL + `?v=${Date.now()}`}
              alt="userimage"
              onError={() => setImgError(true)}
              style={{
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Flex>
        )}
        <Flex
          mt="auto"
          direction="column"
          background="#ebebeb"
          textAlign="center"
          borderRadius="1em"
          p={3}
        >
          <Text fontWeight="bold">Fotografia</Text>
          <Text>
            Puedes escoger la fotografía que prefieras pero por motivos
            profesionales sugerimos una fotografía formal y seria
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Field
          onChange={handleChange}
          value={values.NAMES}
          name="NAMES"
          className={errors.NAMES ? style.errorField : null}
          style={{ marginBottom: "1em", textTransform: "capitalize" }}
          placeholder="Nombre"
        />
        <Field
          onChange={handleChange}
          value={values.LAST_NAME}
          name="LAST_NAME"
          className={errors.LAST_NAME ? style.errorField : null}
          style={{ marginBottom: "1em", textTransform: "capitalize" }}
          placeholder="Apellido paterno"
        />
        <Field
          onChange={handleChange}
          value={values.MOTHERS_LAST_NAME}
          name="MOTHERS_LAST_NAME"
          className={errors.MOTHERS_LAST_NAME ? style.errorField : null}
          style={{ marginBottom: "1em", textTransform: "capitalize" }}
          placeholder="Apellido paterno"
        />
        <Field
          onChange={handleChange}
          value={values.TITULO}
          name="TITULO"
          placeholder="Título"
          style={{ marginBottom: "1em", textTransform: "capitalize" }}
        />
        <div>
          <Text color="Highlight" decoration="underline">
            Generar CV
          </Text>
          <Text size="0.8em">
            Crea un curriculum con nosotros usando tus datos en esta seccion
            para generarlo de forma automática y asi puedas enviarlo en tus
            postulaciones de empleo
          </Text>
        </div>
      </Flex>
    </Flex>
  );
};
const Content2 = () => {
  const { values, handleChange, errors, content } = useContext(ThisContext);
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const [years, setYears] = useState([]);
  const [days, setDays] = useState();
  const [languagesList, setLanguagesList] = useState([
    { ID: 1, TITLE: "Español", VALUE: "es" },
    { ID: 2, TITLE: "Inglés", VALUE: "en" },
    { ID: 3, TITLE: "Francés", VALUE: "fr" },
    { ID: 4, TITLE: "Chino", VALUE: "zh" },
  ]);
  const [selectedYear, setSelectedYear] = useState(moment(new Date()).year());
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [stateID, setStateID] = useState();
  const [cityID, setCityID] = useState();
  const restoreLanguagesList = (value) => {
    const languagesListCopy = [...languagesList];
    languagesListCopy.push(value);
    setLanguagesList(languagesListCopy);
    const finalLanguagesCopy = [...JSON.parse(values.IDIOMAS)];
    const newArray = finalLanguagesCopy.filter((item) => item.ID !== value.ID);
    values.IDIOMAS = JSON.stringify(newArray);
  };
  useEffect(() => {
    // --------------------
    // BIRTH DATE
    // --------------------
    ////Set Year
    userInfo.BIRTH_DATE
      ? setSelectedYear(moment(userInfo.BIRTH_DATE).format("yyyy"))
      : null;
    //// setMonth
    userInfo.BIRTH_DATE
      ? setSelectedMonth(moment(userInfo.BIRTH_DATE).format("MM"))
      : null;
    //// setDaY
    userInfo.BIRTH_DATE
      ? setSelectedDay(moment(userInfo.BIRTH_DATE).format("DD"))
      : null;
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
    // --------------------
    // STATE & CITY
    // --------------------
    if (userInfo.STATE) {
      setStateID(
        States.states.filter(
          (item) => item.name.toLowerCase() === userInfo.STATE
        )[0].id
      );
    } else {
      setStateID("0");
    }
    if (userInfo.CITY) {
      setCityID(
        Cities.cities.filter(
          (item) => item.name.toLowerCase() === userInfo.CITY
        )[0].id
      );
    } else {
      setCityID("0");
    }
    // --------------------
    // IDIOMAS
    // --------------------
    if (secondaryInfo.IDIOMAS) {
      if (JSON.parse(secondaryInfo.IDIOMAS).length !== 0) {
        let temporalListCopy = [...languagesList];
        JSON.parse(secondaryInfo.IDIOMAS).forEach((item) => {
          temporalListCopy = temporalListCopy.filter(
            (key) => key.ID !== item.ID
          );
        });
        setLanguagesList(temporalListCopy);
      }
    }
  }, [content]);
  useEffect(() => {
    setDays(
      moment(`${selectedYear},${selectedMonth}`, "YYYY-MM").daysInMonth()
    );
    values.BIRTH_DATE = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    values.AGE =
      moment().diff(values.BIRTH_DATE, "years") !== 0
        ? moment().diff(values.BIRTH_DATE, "years")
        : null;
  }, [selectedYear, selectedMonth, selectedDay]);
  useEffect(() => {
    if (stateID) {
      const state = States.states
        .filter((item) => item.id === stateID)[0]
        .name.toLowerCase();
      values.STATE = state;
    }
  }, [stateID]);
  useEffect(() => {
    if (cityID) {
      const city = Cities.cities
        .filter((item) => item.id === cityID)[0]
        .name.toLowerCase();
      values.CITY = city;
    }
  }, [cityID, content]);
  return (
    <Flex direction="column">
      <Flex direction="column" mb={3}>
        <Flex justify="space-between" w="100%">
          <Field
            as="select"
            onChange={(e) => {
              setSelectedDay(e.target.value);
            }}
            value={selectedDay}
            name="AGE"
            className={errors.AGE ? style.errorField : null}
            style={{
              textTransform: "capitalize",
              flexGrow: 1,
              marginRight: "0.5em",
            }}
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
          </Field>
          <Field
            as="select"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
            className={errors.AGE ? style.errorField : null}
            style={{
              textTransform: "capitalize",
              flexGrow: 1,
              marginRight: "0.5em",
            }}
            onBlur={null}
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
          </Field>
          <Field
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
            as="select"
            name="AGE"
            className={errors.AGE ? style.errorField : null}
            style={{ textTransform: "capitalize", flexGrow: 1 }}
          >
            {years.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Field>
        </Flex>
        <Text
          fontWeight="bold"
          fontSize="0.7em"
          color="gray"
          textTransform="uppercase"
        >
          FECHA DE NACIMIENTO
        </Text>
      </Flex>
      <Flex direction="column" mb={3}>
        <Field
          as="select"
          onChange={handleChange}
          value={values.GENRE}
          name="GENRE"
          className={errors.GENRE ? style.errorField : null}
          style={{ textTransform: "capitalize" }}
        >
          <option value="" disabled>
            Selecionar
          </option>
          <option value="fenemino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="none">No especificar</option>
        </Field>
        <Text
          fontWeight="bold"
          fontSize="0.7em"
          color="gray"
          textTransform="uppercase"
        >
          GÉNERO
        </Text>
      </Flex>
      <Flex direction="column" mb={3}>
        <Field
          onChange={handleChange}
          value={values.TEL_NUMBER}
          name="TEL_NUMBER"
          className={errors.TEL_NUMBER ? style.errorField : null}
          style={{ textTransform: "capitalize" }}
        />
        <Text
          fontWeight="bold"
          fontSize="0.7em"
          color="gray"
          textTransform="uppercase"
        >
          Número telefónico
        </Text>
      </Flex>
      <Flex direction="column" mb={3}>
        <Flex w="100%">
          <Field
            as="select"
            style={{ flexGrow: 1, marginRight: "0.5em", width: 0 }}
            value={stateID}
            onChange={(e) => setStateID(e.target.value)}
            onBlur={null}
          >
            {States.states.map((key) => {
              return (
                <option key={key.id} value={key.id}>
                  {key.name}
                </option>
              );
            })}
          </Field>
          <Field
            as="select"
            style={{ flexGrow: 1, width: 0 }}
            value={cityID}
            onChange={(e) => setCityID(e.target.value)}
            disabled={stateID !== "0" ? false : true}
            onBlur={null}
          >
            {Cities.cities
              .filter((item) => item.state_id === stateID)
              .map((key) => (
                <option key={key.id} value={key.id}>
                  {key.name}
                </option>
              ))}
          </Field>
        </Flex>
        <Text
          fontWeight="bold"
          fontSize="0.7em"
          color="gray"
          textTransform="uppercase"
        >
          Ubicación
        </Text>
      </Flex>
      <Flex direction="column" mb={3}>
        {languagesList.length === 0 ? null : (
          <Field
            as="select"
            onChange={(e) => {
              const obj = JSON.parse(e.target.value);
              setLanguagesList((languagesList) =>
                languagesList.filter((item) => item.ID !== obj.ID)
              );
              const finalValueCopy = [...JSON.parse(values.IDIOMAS)];
              finalValueCopy.push(obj);
              values.IDIOMAS = JSON.stringify(finalValueCopy);
            }}
            style={{ textTransform: "capitalize" }}
            name="IDIOMAS"
            value="[]"
          >
            <option value="[]" disabled>
              Selecciona idiomas
            </option>
            {languagesList.map((key) => (
              <option value={JSON.stringify(key)} key={key.ID}>
                {key.TITLE}
              </option>
            ))}
          </Field>
        )}
        <Text
          fontWeight="bold"
          fontSize="0.7em"
          color="gray"
          textTransform="uppercase"
        >
          Idiomas
        </Text>
        <Flex
          border="1px solid gray"
          borderRadius="10px"
          wrap="wrap"
          justify="center"
        >
          {values.IDIOMAS ? (
            JSON.parse(values.IDIOMAS).length === 0 ? (
              <Text fontWeight="bold" fontSize="0.9em" m={3} color="gray">
                Agrega un idioma
              </Text>
            ) : (
              Object.values(JSON.parse(values.IDIOMAS)).map((key) => (
                <div
                  style={{
                    backgroundColor: "#ebebeb",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2em",
                    margin: "0.3em",
                    padding: "0.5em 1em",
                    paddingRight: "0.5em",
                  }}
                  key={key.ID}
                >
                  <span>{key.TITLE}</span>
                  <button
                    type="button"
                    onClick={() => {
                      restoreLanguagesList(key);
                    }}
                  >
                    <Close />
                  </button>
                </div>
              ))
            )
          ) : (
            <Text fontWeight="bold" fontSize="0.9em" m={3} color="gray">
              Agrega un idioma
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
const Content3 = () => {
  const { values, content } = useContext(ThisContext);
  const { secondaryInfoState } = useContext(MainContext);
  const [secondaryInfo] = secondaryInfoState;
  const [habilidadesList, setHabilidadesList] = useState([
    { ID: 1, TITLE: "Pensamiento Crítico", VALUES: "pensamiento critico" },
    { ID: 2, TITLE: "Trabajo en equipo", VALUES: "trabajo en equipo" },
    { ID: 3, TITLE: "Comunicacion", VALUES: "comunicacion" },
  ]);
  const restoreHabilidades = (key) => {
    const newHabilitiesList = [...habilidadesList, key];
    const temporalValues = [...JSON.parse(values.HABILIDADES)];
    setHabilidadesList(newHabilitiesList);
    const newArray = temporalValues.filter((item) => item.ID !== key.ID);
    values.HABILIDADES = JSON.stringify(newArray);
  };
  const purgeHabilidades = (e) => {
    const item = JSON.parse(e.target.value);
    const habilidadesListCopy = [...habilidadesList];
    const formValuesCopy = [...JSON.parse(values.HABILIDADES)];
    const newArray = habilidadesListCopy.filter(
      (item2) => item2.ID !== item.ID
    );
    formValuesCopy.push(item);
    values.HABILIDADES = JSON.stringify(formValuesCopy);
    setHabilidadesList(newArray);
  };
  useEffect(() => {
    if (secondaryInfo.HABILIDADES) {
      if (JSON.parse(secondaryInfo.HABILIDADES).length !== 0) {
        let temporalHabilidadesListCopy = [...habilidadesList];
        JSON.parse(secondaryInfo.HABILIDADES).forEach((item) => {
          temporalHabilidadesListCopy = temporalHabilidadesListCopy.filter(
            (key) => key.ID !== item.ID
          );
        });
        setHabilidadesList(temporalHabilidadesListCopy);
      }
    }
  }, [content]);
  return (
    <Flex direction="column">
      <Flex>
        {habilidadesList.length !== 0 ? (
          <Field
            as="select"
            name="HABILIDADES"
            onChange={(e) => {
              purgeHabilidades(e);
            }}
          >
            <option value="">Selecciona habilidades</option>
            {Object.values(habilidadesList).map((key) => (
              <option value={JSON.stringify(key)} key={key.ID}>
                {key.TITLE}
              </option>
            ))}
          </Field>
        ) : null}
      </Flex>
      <Flex
        mt={3}
        borderColor="gray"
        borderWidth="1px"
        borderRadius="10px"
        wrap="wrap"
        justify="space-evenly"
      >
        {JSON.parse(values.HABILIDADES).length !== 0 ? (
          Object.values(JSON.parse(values.HABILIDADES)).map((key) => (
            <div
              key={key.ID}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5em",
                backgroundColor: "#ebebeb",
                borderRadius: "2em",
                margin: "0.5em",
              }}
            >
              <span>{key.TITLE}</span>
              <button
                type="button"
                onClick={() => {
                  restoreHabilidades(key);
                }}
              >
                <Close />
              </button>
            </div>
          ))
        ) : (
          <Text color="gray" m={4}>
            Elije al menos una habilidadad
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
const Content4 = () => {
  const { values, handleChange, errors } = useContext(ThisContext);
  return (
    <Flex direction="column">
      <Flex mb={3} justify="space-between" align="center">
        <div children="Correo electrónico:" style={{ marginRight: "1em" }} />
        <Field value={values.EMAIL} readOnly style={{ width: "50%" }} />
      </Flex>
      {errors.OLDPASSWORD ? (
        <Flex justify="flex-end">
          <Text color="red" fontWeight="bold" fontSize="0.6em">
            La contraseña es incorrecta*
          </Text>
        </Flex>
      ) : null}
      <Flex mb={3} justify="space-between" align="center">
        <div children="Contraseña anterior:" style={{ marginRight: "1em" }} />
        <Field
          name="OLDPASSWORD"
          onChange={handleChange}
          value={values.OLDPASSWROD}
          style={{ width: "50%" }}
        />
      </Flex>
      {errors.PASSWORD1 ? (
        <Flex justify="flex-end">
          <Text color="red" fontWeight="bold" fontSize="0.6em">
            Este campo es requerido*
          </Text>
        </Flex>
      ) : null}
      <Flex mb={3} justify="space-between" align="center">
        <div children="Nueva contraseña:" style={{ marginRight: "1em" }} />
        <Field
          name="PASSWORD1"
          onChange={handleChange}
          value={values.PASSWORD1}
          style={{ width: "50%" }}
        />
      </Flex>
      {errors.PASSWORD2 ? (
        <Flex justify="flex-end">
          <Text color="red" fontWeight="bold" fontSize="0.6em">
            Las contraseñas no son iguales*
          </Text>
        </Flex>
      ) : null}
      <Flex mb={3} justify="space-between" align="center">
        <div children="Confirmar contraseña:" style={{ marginRight: "1em" }} />
        <Field
          name="PASSWORD2"
          onChange={handleChange}
          value={values.PASSWORD2}
          style={{ width: "50%" }}
        />
      </Flex>
    </Flex>
  );
};
const Content5 = () => {
  const { values, handleChange, errors, content } = useContext(ThisContext);
  const { secondaryInfoState } = useContext(MainContext);
  const [secondaryInfo] = secondaryInfoState;
  const [years, setYears] = useState([]);
  const [from, setFrom] = useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  const [to, setTo] = useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  useEffect(() => {
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
  }, []);
  useEffect(() => {
    values.FECHA_INICIO = `${from.month}/${from.year}`;
  }, [from]);
  useEffect(() => {
    values.FECHA_FIN = `${to.month}/${to.year}`;
  }, [to]);
  useEffect(() => {
    if (values.STILL) {
      delete values.FECHA_FIN;
    } else {
      values.FECHA_FIN = `${to.month}/${to.year}`;
    }
  }, [values.STILL]);
  useEffect(() => {
    let experienciaLaboralCopy;
    if (secondaryInfo.EXPERIENCIA_LABORAL) {
      experienciaLaboralCopy = [
        ...JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL),
      ];
    } else {
      experienciaLaboralCopy = [];
    }
    let currentItem;
    if (experienciaLaboralCopy.length === 0) {
      currentItem = 0;
    } else {
      currentItem =
        experienciaLaboralCopy[experienciaLaboralCopy.length - 1].ID + 1;
    }
    let newObj;
    if (!values.STILL) {
      newObj = {
        ID: currentItem,
        PUESTO: values.PUESTO,
        EMPRESA: values.EMPRESA,
        DESCRIPCION: values.DESCRIPCION,
        FECHA_INICIO: values.FECHA_INICIO,
        FECHA_FIN: values.FECHA_FIN,
        STILL: values.STILL,
      };
    } else {
      newObj = {
        ID: currentItem,
        PUESTO: values.PUESTO,
        EMPRESA: values.EMPRESA,
        DESCRIPCION: values.DESCRIPCION,
        FECHA_INICIO: values.FECHA_INICIO,
        STILL: values.STILL,
      };
    }
    experienciaLaboralCopy.push(newObj);
    values.EXPERIENCIA_LABORAL = JSON.stringify(experienciaLaboralCopy);
  }, [values, from, to, content]);
  return (
    <Flex direction="column">
      <Flex mb="0.5em">
        <Flex direction="column" w="60%" justify="space-evenly">
          <Field
            value={values.PUESTO}
            name="PUESTO"
            onChange={handleChange}
            placeholder="Puesto desarrollado"
          />
          {errors.PUESTO ? (
            <Text color="red" fontSize="0.7em">
              Campo requerido*
            </Text>
          ) : null}
          <Field
            value={values.EMPRESA}
            name="EMPRESA"
            onChange={handleChange}
            placeholder="Empresa"
            style={{ marginTop: "0.5em" }}
          />
          {errors.EMPRESA ? (
            <Text color="red" fontSize="0.7em">
              Campo requerido*
            </Text>
          ) : null}
        </Flex>
        <Flex direction="column" grow={1}>
          <Flex align="center" justify="center" direction="column">
            <Flex align="center" mb={3}>
              <Text children="De" mr={3} flexGrow={1} />
              <Field
                value={from.month}
                as="select"
                style={{ marginRight: "0.5em", width: "5em" }}
                onChange={(e) => setFrom({ ...from, month: e.target.value })}
                onBlur={null}
              >
                <option value="">Mes</option>
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
              </Field>
              <Field
                onBlur={null}
                as="select"
                value={from.year}
                onChange={(e) => setFrom({ ...from, year: e.target.value })}
              >
                <option value="">Año</option>
                {years.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Field>
            </Flex>
            {!values.STILL ? (
              <Flex align="center" mb={3}>
                <Text children="A" mr={3} flexGrow={1} w="1em" />
                <Field
                  onBlur={null}
                  value={to.month}
                  as="select"
                  style={{ marginRight: "0.5em", width: "5em" }}
                  onChange={(e) => setTo({ ...to, month: e.target.value })}
                >
                  <option value="">Mes</option>
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
                </Field>
                <Field
                  onBlur={null}
                  as="select"
                  value={to.year}
                  onChange={(e) => setTo({ ...to, year: e.target.value })}
                >
                  <option value="">Año</option>
                  {years.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </Field>
              </Flex>
            ) : null}
          </Flex>
          <Flex align="center" justify="center">
            <Text children="¿Aún en este puesto?" fontSize="0.9em" mr={3} />
            <input
              type="checkbox"
              name="STILL"
              value={values.STILL}
              onChange={handleChange}
            />
          </Flex>
        </Flex>
      </Flex>
      <Field
        maxrows={6}
        rows={4}
        as="textarea"
        name="DESCRIPCION"
        value={values.DESCRIPCION}
        onChange={handleChange}
        maxLength={400}
      />
      <Flex w="100%">
        {errors.DESCRIPCION ? (
          <Text color="red" fontSize="0.7em">
            Campo requerido*
          </Text>
        ) : null}
        <Text
          ml="auto"
          color="gray"
          fontSize="0.8em"
        >{`${values.DESCRIPCION.length}/400`}</Text>
      </Flex>
    </Flex>
  );
};
const Content6 = () => {
  const { onClose, values, handleChange, errors } = useContext(ThisContext);
  return <></>;
};
const Content7 = () => {
  const { onClose, values, handleChange, errors } = useContext(ThisContext);

  return <></>;
};
export const ConfirmDelete = ({ hook, workingItem, deleteFunction }) => {
  const { dialogState } = hook;
  const [confirmDelete, setConfirmDelete] = dialogState;
  const onClose = () => {
    setConfirmDelete(!confirmDelete);
  };
  return (
    <AlertDialog isOpen={confirmDelete} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteFunction(workingItem);
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
const ModalContentIndex = [
  {
    id: 0,
    modalSize: "xl",
    title: "",
    form: () => <Content1 />,
    apiURL: `${apiRoute}/updatePrimaryInfo.php`,
    formInitialValues: {
      NAMES: "",
      TITULO: "",
      LAST_NAME: "",
      MOTHERS_LAST_NAME: "",
    },
    validation: Yup.object().shape({
      NAMES: Yup.string().required("Este campo es requerido"),
      LAST_NAME: Yup.string().required("Este campo es requerido"),
      MOTHERS_LAST_NAME: Yup.string().required("Este campo es requerido"),
    }),
  },
  {
    id: 1,
    modalSize: "xs",
    title: "Actualizar datos personales",
    apiURL: `${apiRoute}/updateTrabajadorSecondaryInfo.php`,
    form: () => <Content2 />,
    formInitialValues: {
      AGE: "",
      BIRTH_DATE: "",
      GENRE: "",
      TEL_NUMBER: "",
      STATE: "",
      CITY: "",
      IDIOMAS: JSON.stringify([]),
    },
    validation: Yup.object().shape({}),
  },
  {
    id: 2,
    modalSize: "xl",
    title: "Actualizar habilidades",
    apiURL: `${apiRoute}/updateHabilities.php`,
    form: () => <Content3 />,
    formInitialValues: {
      HABILIDADES: JSON.stringify([]),
    },
    validation: Yup.object().shape({}),
  },
  {
    id: 3,
    modalSize: "md",
    title: "Actualizar datos de seguridad",
    apiURL: `${apiRoute}/updatePassword.php`,
    form: () => <Content4 />,
    formInitialValues: {
      PASSWORD1: "",
      PASSWORD2: "",
      EMAIL: "",
      PASSWORD: "",
      OLDPASSWORD: "",
    },
    validation: Yup.object().shape({
      OLDPASSWORD: Yup.string()
        .required("Campo requerido")
        .oneOf([Yup.ref("PASSWORD"), null], "Las contraseña no es correcta"),
      PASSWORD1: Yup.string().required("Campo requerido"),
      PASSWORD2: Yup.string()
        .required("Campo requerido")
        .oneOf([Yup.ref("PASSWORD1"), null], "Las contraseñas no son iguales"),
    }),
  },
  {
    id: 4,
    title: "Agregar experiencia laboral",
    modalSize: "xl",
    apiURL: `${apiRoute}/updateExperienciaLaboral.php`,
    formInitialValues: {
      PUESTO: "",
      EMPRESA: "",
      DESCRIPCION: "",
      FECHA_INICIO: "",
      FECHA_FIN: "",
      STILL: false,
    },
    form: () => <Content5 />,
    validation: Yup.object().shape({
      PUESTO: Yup.string().required(),
      EMPRESA: Yup.string().required(),
      DESCRIPCION: Yup.string().required(),
    }),
  },
  {
    id: 5,
    title: "Agregar información académica",
    form: () => <Content6 />,
    validation: Yup.object().shape({}),
  },
  {
    id: 6,
    title: "Agregar cursos y certificaciones",
    form: () => <Content7 />,
    validation: Yup.object().shape({}),
  },
];

// export const Modal5Edit = React.memo(
//   ({
//     modalVisibility,
//     setModalVisibility,
//     editingObjectExperienciaLaboral,
//   }) => {
//     const toast = useToast();
//     // context
//     const { userInfoState, secondaryInfoState } = useContext(MainContext);
//     const [userInfo] = userInfoState;
//     const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
//     // states
//     const [years, setYears] = useState([]);
//     const [from, setFrom] = useState({
//       month: "01",
//       year: moment(new Date()).format("YYYY"),
//     });
//     const [to, setTo] = useState({
//       month: "01",
//       year: moment(new Date()).format("YYYY"),
//     });
//     // functions
//     const deleteThisElement = (key) => {
//       let prevArray = [...JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL)];
//       let newArray = prevArray.filter((item) => item.ID !== key.ID);
//       axios
//         .post(`${apiRoute}/updateExperienciaLaboral.php`, {
//           EXPERIENCIA_LABORAL: newArray,
//           ID: userInfo.ID,
//         })
//         .then(({ data }) => {
//           if (data.code === 200) {
//             setSecondaryInfo({
//               ...secondaryInfo,
//               EXPERIENCIA_LABORAL: JSON.stringify(newArray),
//             });
//             setModalVisibility({ modalVisibility, modal5: false });
//             toast({
//               title: "Información actualizada",
//               description: "Cambios exitosos",
//               status: "success",
//               duration: 3000,
//               isClosable: true,
//             });
//           } else {
//             setModalVisibility({ modalVisibility, modal5: false });
//             toast({
//               title: "Ocurrio un error en la actualizacion",
//               description: "CIntentar mas tarde",
//               status: "error",
//               duration: 3000,
//               isClosable: true,
//             });
//           }
//         })
//         .catch((error) => console.log(error));
//     };
//     // effects
//     useEffect(() => {
//       let years = [];
//       let limit = moment(new Date()).year() - 80;
//       for (let i = moment(new Date()).year(); i > limit; i--) {
//         years.push(i);
//       }
//       setYears(years);
//     }, []);
//     if (Object.values(editingObjectExperienciaLaboral).length !== 0) {
//       return (
//         <Formik
//           initialValues={{
//             EDITPUESTO: editingObjectExperienciaLaboral.PUESTO,
//             EDITEMPRESA: editingObjectExperienciaLaboral.EMPRESA,
//             EDITDESCRIPCION: editingObjectExperienciaLaboral.DESCRIPCION,
//             EDITSTILLINTHIS: editingObjectExperienciaLaboral.STILLINTHIS,
//           }}
//           onSubmit={(values) => {
//             values.PUESTO = values.EDITPUESTO;
//             delete values.EDITPUESTO;
//             values.EMPRESA = values.EDITEMPRESA;
//             delete values.EDITEMPRESA;
//             values.DESCRIPCION = values.EDITDESCRIPCION;
//             delete values.EDITDESCRIPCION;
//             values.STILLINTHIS = values.EDITSTILLINTHIS;
//             delete values.EDITSTILLINTHIS;
//             let oldExperienciaLaboral = [
//               ...JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL),
//             ];
//             values.ID = editingObjectExperienciaLaboral.ID;
//             values.FROM = `${from.month}/${from.year}`;
//             !values.STILLINTHIS
//               ? (values.TO = `${to.month}/${to.year}`)
//               : delete values.TO;
//             const index = oldExperienciaLaboral.findIndex(
//               (item) => item.ID === editingObjectExperienciaLaboral.ID
//             );
//             oldExperienciaLaboral[index] = values;
//             axios
//               .post(`${apiRoute}/updateExperienciaLaboral.php`, {
//                 ID: userInfo.ID,
//                 EXPERIENCIA_LABORAL: oldExperienciaLaboral,
//               })
//               .then(({ data }) => {
//                 if (data.code === 200) {
//                   setSecondaryInfo({
//                     ...secondaryInfo,
//                     EXPERIENCIA_LABORAL: JSON.stringify(oldExperienciaLaboral),
//                   });
//                   setModalVisibility({ modalVisibility, modal5Edit: false });
//                   toast({
//                     title: "Información actualizada",
//                     description: "Cambios exitosos",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 } else {
//                   setModalVisibility({ modalVisibility, modal5Edit: false });
//                   toast({
//                     title: "Ocurrio un error en la actualizacion",
//                     description: "CIntentar mas tarde",
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 }
//               })
//               .catch((error) => console.log(error));
//           }}
//         >
//           {({ values, handleChange }) => (
//             <Modal
//               isOpen={modalVisibility.modal5Edit}
//               onClose={() => {
//                 setModalVisibility({ ...modalVisibility, modal5Edit: false });
//               }}
//               size="xl"
//             >
//               <ModalOverlay />
//               <ModalCloseButton />
//               <ModalContent>
//                 <ModalHeader>Editar eperiencia laboral</ModalHeader>
//                 <ModalBody>
//                   <Form id="modal5EditForm">
//                     <div style={{ display: "flex", marginBottom: "1em" }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           flexGrow: 1,
//                           marginRight: "1em",
//                         }}
//                       >
//                         <Field
//                           onChange={handleChange}
//                           value={values.EDITPUESTO}
//                           name="EDITPUESTO"
//                           placeholder="Puesto desempeñado"
//                           style={{ marginBottom: "1em" }}
//                         />
//                         <Field
//                           onChange={handleChange}
//                           value={values.EDITEMPRESA}
//                           name="EDITEMPRESA"
//                           placeholder="Nombre de la empresa"
//                         />
//                       </div>
//                       <div style={{ width: "50%" }}>
//                         <div
//                           style={{ display: "flex", flexDirection: "column" }}
//                         >
//                           <span style={{ fontSize: "0.7em", color: "gray" }}>
//                             Desde:
//                           </span>
//                           <div style={{ marginBottom: "0.5em" }}>
//                             <select
//                               style={{ marginRight: "1em" }}
//                               onChange={(e) => {
//                                 setFrom({ ...from, month: e.target.value });
//                               }}
//                               defaultValue={moment(
//                                 editingObjectExperienciaLaboral.FROM,
//                                 "MM/YYYY"
//                               ).format("MM")}
//                             >
//                               <option value="01">Enero</option>
//                               <option value="02">Febrero</option>
//                               <option value="03">Marzo</option>
//                               <option value="04">Abril</option>
//                               <option value="05">Mayo</option>
//                               <option value="06">Junio</option>
//                               <option value="07">Julio</option>
//                               <option value="08">Agosto</option>
//                               <option value="09">Septiembre</option>
//                               <option value="10">Octubre</option>
//                               <option value="11">Noviembre</option>
//                               <option value="12">Diciembre</option>
//                             </select>
//                             <select
//                               style={{ marginRight: "1em" }}
//                               onChange={(e) => {
//                                 setFrom({ ...from, year: e.target.value });
//                               }}
//                               defaultValue={moment(
//                                 editingObjectExperienciaLaboral.FROM,
//                                 "MM/YYYY"
//                               ).format("YYYY")}
//                             >
//                               {years.map((key) => (
//                                 <option key={key} value={key}>
//                                   {key}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </div>
//                         {values.EDITSTILLINTHIS ? null : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               marginBottom: "0.5em",
//                             }}
//                           >
//                             <span style={{ fontSize: "0.7em", color: "gray" }}>
//                               Hasta:
//                             </span>
//                             <div>
//                               <select
//                                 style={{ marginRight: "1em" }}
//                                 onChange={(e) => {
//                                   setTo({ ...to, month: e.target.value });
//                                 }}
//                                 defaultValue={moment(
//                                   editingObjectExperienciaLaboral.TO,
//                                   "MM/YYYY"
//                                 ).format("MM")}
//                               >
//                                 <option value="01">Enero</option>
//                                 <option value="02">Febrero</option>
//                                 <option value="03">Marzo</option>
//                                 <option value="04">Abril</option>
//                                 <option value="05">Mayo</option>
//                                 <option value="06">Junio</option>
//                                 <option value="07">Julio</option>
//                                 <option value="08">Agosto</option>
//                                 <option value="09">Septiembre</option>
//                                 <option value="10">Octubre</option>
//                                 <option value="11">Noviembre</option>
//                                 <option value="12">Diciembre</option>
//                               </select>
//                               <select
//                                 onChange={(e) => {
//                                   setTo({ ...to, year: e.target.value });
//                                 }}
//                                 defaultValue={moment(
//                                   editingObjectExperienciaLaboral.TO,
//                                   "MM/YYYY"
//                                 ).format("YYYY")}
//                               >
//                                 {years.map((key) => (
//                                   <option key={key} value={key}>
//                                     {key}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>
//                           </div>
//                         )}
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           <span style={{ marginRight: "0.5em" }}>
//                             ¿Aún sigues en este empleo?
//                           </span>
//                           <input
//                             type="checkbox"
//                             name="EDITSTILLINTHIS"
//                             onChange={handleChange}
//                             defaultChecked={
//                               editingObjectExperienciaLaboral.STILLINTHIS
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         width: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Field
//                         style={{ width: "100%" }}
//                         as="textarea"
//                         onChange={handleChange}
//                         value={values.EDITDESCRIPCION}
//                         name="EDITDESCRIPCION"
//                         maxLength={400}
//                         rows={4}
//                         maxrows={6}
//                         placeholder="Descríbenos en qué consistía tu trabajo"
//                       />
//                       <span
//                         style={{
//                           marginLeft: "auto",
//                           fontWeight: "bold",
//                           fontSize: "0.8em",
//                           color: "gray",
//                         }}
//                       >
//                         {values.DESCRIPCION
//                           ? `${values.DESCRIPCION.length}/400`
//                           : null}
//                       </span>
//                     </div>
//                   </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button
//                     style={{
//                       backgroundColor: "#ff2400",
//                       color: "white",
//                       marginRight: "auto",
//                     }}
//                     onClick={() => {
//                       deleteThisElement(editingObjectExperienciaLaboral);
//                     }}
//                   >
//                     Eliminar
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       setModalVisibility({
//                         ...modalVisibility,
//                         modal5Edit: false,
//                       });
//                     }}
//                   >
//                     Cancelar
//                   </Button>
//                   <Button
//                     type="submit"
//                     style={{ backgroundColor: "#ECB83C" }}
//                     form="modal5EditForm"
//                   >
//                     Actualizar
//                   </Button>
//                 </ModalFooter>
//               </ModalContent>
//             </Modal>
//           )}
//         </Formik>
//       );
//     } else {
//       return null;
//     }
//   }
// );
// export const Modal6 = React.memo(({ modalVisibility, setModalVisibility }) => {
//   const educativeGrades = [
//     {
//       ID: 1,
//       TITLE: "Secundaria",
//       VALUE: "secundaria",
//     },
//     {
//       ID: 2,
//       TITLE: "Bachillerato",
//       VALUE: "bachillerato",
//     },
//     {
//       ID: 3,
//       TITLE: "Técnico",
//       VALUE: "tecnico",
//     },
//     {
//       ID: 4,
//       TITLE: "Licenciatura",
//       VALUE: "licenciatura",
//     },
//     {
//       ID: 5,
//       TITLE: "Ingeniería",
//       VALUE: "ingenieria",
//     },
//     {
//       ID: 6,
//       TITLE: "Diplomado",
//       VALUE: "diplomado",
//     },
//     {
//       ID: 7,
//       TITLE: "Maestría",
//       VALUE: "maestria",
//     },
//     {
//       ID: 8,
//       TITLE: "Doctorado",
//       VALUE: "doctorado",
//     },
//   ];
//   const toast = useToast();
//   const validationSchema = Yup.object().shape({
//     TITULO: Yup.string().required(),
//     INSTITUCION: Yup.string().required(),
//     GRADO: Yup.string().required(),
//   });
//   // context
//   const { userInfoState, secondaryInfoState } = useContext(MainContext);
//   const [userInfo] = userInfoState;
//   const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
//   // states
//   const [years, setYears] = useState([]);
//   const [from, setFrom] = useState({
//     month: "01",
//     year: moment(new Date()).format("YYYY"),
//   });
//   const [to, setTo] = useState({
//     month: "01",
//     year: moment(new Date()).format("YYYY"),
//   });
//   // effects
//   useEffect(() => {
//     let years = [];
//     let limit = moment(new Date()).year() - 80;
//     for (let i = moment(new Date()).year(); i > limit; i--) {
//       years.push(i);
//     }
//     setYears(years);
//   }, []);
//   return (
//     <Formik
//       validationSchema={validationSchema}
//       initialValues={{
//         TITULO: "",
//         INSTITUCION: "",
//         GRADO: "",
//         STILLINTHIS: false,
//       }}
//       onSubmit={(values, formikBag) => {
//         let newGradoEducativo;
//         let newgrado = JSON.parse(values.GRADO).VALUE;
//         values.GRADO = newgrado;
//         values.FROM = `${from.month}/${from.year}`;
//         !values.STILLINTHIS
//           ? (values.TO = `${to.month}/${to.year}`)
//           : delete values.TO;
//         if (secondaryInfo.GRADO_EDUCATIVO) {
//           newGradoEducativo = JSON.parse(secondaryInfo.GRADO_EDUCATIVO);
//           if (newGradoEducativo.length === 0) {
//             values.ID = 1;
//           } else {
//             values.ID = newGradoEducativo.slice(-1).pop().ID + 1;
//           }
//           newGradoEducativo.push(values);
//         } else {
//           values.ID = 1;
//           newGradoEducativo = [];
//           newGradoEducativo.push(values);
//         }
//         axios
//           .post(`${apiRoute}/updateGradoEducativo.php`, {
//             ID: userInfo.ID,
//             GRADO_EDUCATIVO: newGradoEducativo,
//           })
//           .then(({ data }) => {
//             if (data.code === 200) {
//               let arraysito;
//               if (secondaryInfo.GRADO_EDUCATIVO) {
//                 arraysito = JSON.parse(secondaryInfo.GRADO_EDUCATIVO);
//                 arraysito.push(values);
//                 setSecondaryInfo({
//                   ...secondaryInfo,
//                   GRADO_EDUCATIVO: JSON.stringify(arraysito),
//                 });
//               } else {
//                 arraysito = [];
//                 arraysito.push(values);
//                 setSecondaryInfo({
//                   ...secondaryInfo,
//                   GRADO_EDUCATIVO: JSON.stringify(arraysito),
//                 });
//               }
//               setModalVisibility({ modalVisibility, modal6: false });
//               toast({
//                 title: "Información actualizada",
//                 description: "Cambios exitosos",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//               });
//               formikBag.resetForm({
//                 PUESTO: "",
//                 EMPRESA: "",
//                 DESCRIPCION: "",
//                 STILLINTHIS: false,
//               });
//             } else {
//               setModalVisibility({ modalVisibility, modal6: false });
//               toast({
//                 title: "Ocurrio un error en la actualizacion",
//                 description: "CIntentar mas tarde",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//               });
//             }
//           })
//           .catch((error) => console.log(error));
//       }}
//     >
//       {({ values, handleChange, errors, resetForm }) => (
//         <Modal
//           isOpen={modalVisibility.modal6}
//           onClose={() => {
//             setModalVisibility({ ...modalVisibility, modal6: false });
//             resetForm({
//               TITULO: "",
//               INSTITUCION: "",
//               GRADO: "",
//               STILLINTHIS: false,
//             });
//           }}
//           size="xl"
//         >
//           <ModalOverlay />
//           <ModalCloseButton />
//           <ModalContent>
//             <ModalHeader>Grado educativo</ModalHeader>
//             <ModalBody>
//               <Form id="modal6Form">
//                 <div style={{ display: "flex", marginBottom: "1em" }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       flexGrow: 1,
//                       marginRight: "1em",
//                     }}
//                   >
//                     {errors.TITULO ? (
//                       <span style={{ color: "red" }}>*</span>
//                     ) : null}
//                     <Field
//                       onChange={handleChange}
//                       value={values.TITULO}
//                       name="TITULO"
//                       placeholder="Título"
//                       style={{ marginBottom: "1em" }}
//                     />
//                     {errors.INSTITUCION ? (
//                       <span style={{ color: "red" }}>*</span>
//                     ) : null}
//                     <Field
//                       onChange={handleChange}
//                       value={values.INSTITUCION}
//                       name="INSTITUCION"
//                       placeholder="Institución"
//                     />
//                   </div>
//                   <div style={{ width: "50%" }}>
//                     <div style={{ display: "flex", flexDirection: "column" }}>
//                       <span style={{ fontSize: "0.7em", color: "gray" }}>
//                         Desde:
//                       </span>
//                       <div style={{ marginBottom: "0.5em" }}>
//                         <select
//                           style={{ marginRight: "1em" }}
//                           onChange={(e) => {
//                             setFrom({ ...from, month: e.target.value });
//                           }}
//                         >
//                           <option value="01">Enero</option>
//                           <option value="02">Febrero</option>
//                           <option value="03">Marzo</option>
//                           <option value="04">Abril</option>
//                           <option value="05">Mayo</option>
//                           <option value="06">Junio</option>
//                           <option value="07">Julio</option>
//                           <option value="08">Agosto</option>
//                           <option value="09">Septiembre</option>
//                           <option value="10">Octubre</option>
//                           <option value="11">Noviembre</option>
//                           <option value="12">Diciembre</option>
//                         </select>
//                         <select
//                           style={{ marginRight: "1em" }}
//                           onChange={(e) => {
//                             setFrom({ ...from, year: e.target.value });
//                           }}
//                         >
//                           {years.map((key) => (
//                             <option key={key} value={key}>
//                               {key}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     {values.STILLINTHIS ? null : (
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           marginBottom: "0.5em",
//                         }}
//                       >
//                         <span style={{ fontSize: "0.7em", color: "gray" }}>
//                           Hasta:
//                         </span>
//                         <div>
//                           <select
//                             style={{ marginRight: "1em" }}
//                             onChange={(e) => {
//                               setTo({ ...to, month: e.target.value });
//                             }}
//                           >
//                             <option value="01">Enero</option>
//                             <option value="02">Febrero</option>
//                             <option value="03">Marzo</option>
//                             <option value="04">Abril</option>
//                             <option value="05">Mayo</option>
//                             <option value="06">Junio</option>
//                             <option value="07">Julio</option>
//                             <option value="08">Agosto</option>
//                             <option value="09">Septiembre</option>
//                             <option value="10">Octubre</option>
//                             <option value="11">Noviembre</option>
//                             <option value="12">Diciembre</option>
//                           </select>
//                           <select
//                             onChange={(e) => {
//                               setTo({ ...to, year: e.target.value });
//                             }}
//                           >
//                             {years.map((key) => (
//                               <option key={key} value={key}>
//                                 {key}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>
//                     )}
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <span style={{ marginRight: "0.5em" }}>
//                         ¿Aún sigues estudiando aquí?
//                       </span>
//                       <input
//                         type="checkbox"
//                         name="STILLINTHIS"
//                         onChange={handleChange}
//                         value={values.STILLINTHIS}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   {errors.GRADO ? (
//                     <span style={{ color: "red" }}>*</span>
//                   ) : null}
//                   <select
//                     style={{ width: "50%" }}
//                     onChange={handleChange}
//                     value={values.GRADO}
//                     name="GRADO"
//                     placeholder="Grado educativo"
//                   >
//                     <option value="" disabled>
//                       Grado educativo
//                     </option>
//                     {educativeGrades.map((key) => (
//                       <option key={key.ID} value={JSON.stringify(key)}>
//                         {key.TITLE}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </Form>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 variant="ghost"
//                 onClick={() => {
//                   setModalVisibility({
//                     ...modalVisibility,
//                     modal6: false,
//                   });
//                 }}
//               >
//                 Cancelar
//               </Button>
//               <Button
//                 type="submit"
//                 style={{ backgroundColor: "#ECB83C" }}
//                 form="modal6Form"
//               >
//                 Agregar
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//     </Formik>
//   );
// });
// export const Modal6Edit = React.memo(
//   ({ modalVisibility, setModalVisibility, editingObjectGradoEducativo }) => {
//     const educativeGrades = [
//       {
//         ID: 1,
//         TITLE: "Secundaria",
//         VALUE: "secundaria",
//       },
//       {
//         ID: 2,
//         TITLE: "Bachillerato",
//         VALUE: "bachillerato",
//       },
//       {
//         ID: 3,
//         TITLE: "Técnico",
//         VALUE: "tecnico",
//       },
//       {
//         ID: 4,
//         TITLE: "Licenciatura",
//         VALUE: "licenciatura",
//       },
//       {
//         ID: 5,
//         TITLE: "Ingeniería",
//         VALUE: "ingenieria",
//       },
//       {
//         ID: 6,
//         TITLE: "Diplomado",
//         VALUE: "diplomado",
//       },
//       {
//         ID: 7,
//         TITLE: "Maestría",
//         VALUE: "maestria",
//       },
//       {
//         ID: 8,
//         TITLE: "Doctorado",
//         VALUE: "doctorado",
//       },
//     ];
//     const toast = useToast();
//     const validationSchema = Yup.object().shape({
//       EDITTITULO: Yup.string().required(),
//       EDITINSTITUCION: Yup.string().required(),
//       EDITGRADO: Yup.string().required(),
//     });
//     // context
//     const { userInfoState, secondaryInfoState } = useContext(MainContext);
//     const [userInfo] = userInfoState;
//     const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
//     // states
//     const [years, setYears] = useState([]);
//     const [from, setFrom] = useState({
//       month: "01",
//       year: moment(new Date()).format("YYYY"),
//     });
//     const [to, setTo] = useState({
//       month: "01",
//       year: moment(new Date()).format("YYYY"),
//     });
//     // functions
//     const deleteThisElement = (key) => {
//       let prevArray = [...JSON.parse(secondaryInfo.GRADO_EDUCATIVO)];
//       let newArray = prevArray.filter((item) => item.ID !== key.ID);
//       axios
//         .post(`${apiRoute}/updateGradoEducativo.php`, {
//           GRADO_EDUCATIVO: newArray,
//           ID: userInfo.ID,
//         })
//         .then(({ data }) => {
//           if (data.code === 200) {
//             setSecondaryInfo({
//               ...secondaryInfo,
//               GRADO_EDUCATIVO: JSON.stringify(newArray),
//             });
//             setModalVisibility({ modalVisibility, modal6Edit: false });
//             toast({
//               title: "Información actualizada",
//               description: "Cambios exitosos",
//               status: "success",
//               duration: 3000,
//               isClosable: true,
//             });
//           } else {
//             setModalVisibility({ modalVisibility, modal6Edit: false });
//             toast({
//               title: "Ocurrio un error en la actualizacion",
//               description: "CIntentar mas tarde",
//               status: "error",
//               duration: 3000,
//               isClosable: true,
//             });
//           }
//         })
//         .catch((error) => console.log(error));
//     };
//     // effects
//     useEffect(() => {
//       let years = [];
//       let limit = moment(new Date()).year() - 80;
//       for (let i = moment(new Date()).year(); i > limit; i--) {
//         years.push(i);
//       }
//       setYears(years);
//     }, []);
//     if (Object.values(editingObjectGradoEducativo).length !== 0) {
//       return (
//         <Formik
//           validationSchema={validationSchema}
//           initialValues={{
//             EDITTITULO: editingObjectGradoEducativo.TITULO,
//             EDITINSTITUCION: editingObjectGradoEducativo.INSTITUCION,
//             EDITGRADO: editingObjectGradoEducativo.GRADO,
//             EDITSTILLINTHIS: editingObjectGradoEducativo.STILLINTHIS,
//           }}
//           onSubmit={(values) => {
//             values.TITULO = values.EDITTITULO;
//             delete values.EDITTITULO;
//             values.INSTITUCION = values.EDITINSTITUCION;
//             delete values.EDITINSTITUCION;
//             values.GRADO = values.EDITGRADO;
//             delete values.EDITGRADO;
//             values.STILLINTHIS = values.EDITSTILLINTHIS;
//             delete values.EDITSTILLINTHIS;
//             if (editingObjectGradoEducativo.GRADO !== values.GRADO) {
//               let newgrado = JSON.parse(values.GRADO).VALUE;
//               values.GRADO = newgrado;
//             }
//             values.FROM = `${from.month}/${from.year}`;
//             !values.STILLINTHIS
//               ? (values.TO = `${to.month}/${to.year}`)
//               : delete values.TO;
//             let oldGradoEducativo = [
//               ...JSON.parse(secondaryInfo.GRADO_EDUCATIVO),
//             ];
//             values.ID = editingObjectGradoEducativo.ID;
//             const index = oldGradoEducativo.findIndex(
//               (item) => item.ID === editingObjectGradoEducativo.ID
//             );
//             oldGradoEducativo[index] = values;
//             axios
//               .post(`${apiRoute}/updateGradoEducativo.php`, {
//                 ID: userInfo.ID,
//                 GRADO_EDUCATIVO: oldGradoEducativo,
//               })
//               .then(({ data }) => {
//                 if (data.code === 200) {
//                   setSecondaryInfo({
//                     ...secondaryInfo,
//                     GRADO_EDUCATIVO: JSON.stringify(oldGradoEducativo),
//                   });
//                   setModalVisibility({ modalVisibility, modal6Edit: false });
//                   toast({
//                     title: "Información actualizada",
//                     description: "Cambios exitosos",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 } else {
//                   setModalVisibility({ modalVisibility, modal6Edit: false });
//                   toast({
//                     title: "Ocurrio un error en la actualizacion",
//                     description: "CIntentar mas tarde",
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 }
//               })
//               .catch((error) => console.log(error));
//           }}
//         >
//           {({ values, handleChange, errors, resetForm }) => (
//             <Modal
//               isOpen={modalVisibility.modal6Edit}
//               onClose={() => {
//                 setModalVisibility({ ...modalVisibility, modal6Edit: false });
//                 resetForm({
//                   EDITTITULO: "",
//                   EDITINSTITUCION: "",
//                   EDITGRADO: "",
//                   EDITSTILLINTHIS: false,
//                 });
//               }}
//               size="xl"
//             >
//               <ModalOverlay />
//               <ModalCloseButton />
//               <ModalContent>
//                 <ModalHeader>Editar grado educativo</ModalHeader>
//                 <ModalBody>
//                   <Form id="modal6EditForm">
//                     <div style={{ display: "flex", marginBottom: "1em" }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           flexGrow: 1,
//                           marginRight: "1em",
//                         }}
//                       >
//                         {errors.EDITTITULO ? (
//                           <span style={{ color: "red" }}>*</span>
//                         ) : null}
//                         <Field
//                           onChange={handleChange}
//                           value={values.EDITTITULO}
//                           name="EDITTITULO"
//                           placeholder="Título"
//                           style={{ marginBottom: "1em" }}
//                         />
//                         {errors.EDITINSTITUCION ? (
//                           <span style={{ color: "red" }}>*</span>
//                         ) : null}
//                         <Field
//                           onChange={handleChange}
//                           value={values.EDITINSTITUCION}
//                           name="EDITINSTITUCION"
//                           placeholder="Institución"
//                         />
//                       </div>
//                       <div style={{ width: "50%" }}>
//                         <div
//                           style={{ display: "flex", flexDirection: "column" }}
//                         >
//                           <span style={{ fontSize: "0.7em", color: "gray" }}>
//                             Desde:
//                           </span>
//                           <div style={{ marginBottom: "0.5em" }}>
//                             <select
//                               style={{ marginRight: "1em" }}
//                               onChange={(e) => {
//                                 setFrom({ ...from, month: e.target.value });
//                               }}
//                               defaultValue={moment(
//                                 editingObjectGradoEducativo.FROM,
//                                 "MM/YYYY"
//                               ).format("MM")}
//                             >
//                               <option value="01">Enero</option>
//                               <option value="02">Febrero</option>
//                               <option value="03">Marzo</option>
//                               <option value="04">Abril</option>
//                               <option value="05">Mayo</option>
//                               <option value="06">Junio</option>
//                               <option value="07">Julio</option>
//                               <option value="08">Agosto</option>
//                               <option value="09">Septiembre</option>
//                               <option value="10">Octubre</option>
//                               <option value="11">Noviembre</option>
//                               <option value="12">Diciembre</option>
//                             </select>
//                             <select
//                               style={{ marginRight: "1em" }}
//                               onChange={(e) => {
//                                 setFrom({ ...from, year: e.target.value });
//                               }}
//                               defaultValue={moment(
//                                 editingObjectGradoEducativo.FROM,
//                                 "MM/YYYY"
//                               ).format("YYYY")}
//                             >
//                               {years.map((key) => (
//                                 <option key={key} value={key}>
//                                   {key}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </div>
//                         {values.EDITSTILLINTHIS ? null : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               marginBottom: "0.5em",
//                             }}
//                           >
//                             <span style={{ fontSize: "0.7em", color: "gray" }}>
//                               Hasta:
//                             </span>
//                             <div>
//                               <select
//                                 style={{ marginRight: "1em" }}
//                                 onChange={(e) => {
//                                   setTo({ ...to, month: e.target.value });
//                                 }}
//                                 defaultValue={moment(
//                                   editingObjectGradoEducativo.TO,
//                                   "MM/YYYY"
//                                 ).format("MM")}
//                               >
//                                 <option value="01">Enero</option>
//                                 <option value="02">Febrero</option>
//                                 <option value="03">Marzo</option>
//                                 <option value="04">Abril</option>
//                                 <option value="05">Mayo</option>
//                                 <option value="06">Junio</option>
//                                 <option value="07">Julio</option>
//                                 <option value="08">Agosto</option>
//                                 <option value="09">Septiembre</option>
//                                 <option value="10">Octubre</option>
//                                 <option value="11">Noviembre</option>
//                                 <option value="12">Diciembre</option>
//                               </select>
//                               <select
//                                 onChange={(e) => {
//                                   setTo({ ...to, year: e.target.value });
//                                 }}
//                                 defaultValue={moment(
//                                   editingObjectGradoEducativo.TO,
//                                   "MM/YYYY"
//                                 ).format("YYYY")}
//                               >
//                                 {years.map((key) => (
//                                   <option key={key} value={key}>
//                                     {key}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>
//                           </div>
//                         )}
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           <span style={{ marginRight: "0.5em" }}>
//                             ¿Aún sigues estudiando aquí?
//                           </span>
//                           <input
//                             type="checkbox"
//                             name="EDITSTILLINTHIS"
//                             onChange={handleChange}
//                             defaultChecked={
//                               editingObjectGradoEducativo.STILLINTHIS
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         width: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       {errors.EDITGRADO ? (
//                         <span style={{ color: "red" }}>*</span>
//                       ) : null}
//                       <select
//                         style={{ width: "50%" }}
//                         onChange={handleChange}
//                         value={values.EDITGRADO}
//                         name="EDITGRADO"
//                         placeholder="Grado educativo"
//                       >
//                         <option value="" disabled>
//                           Grado educativo
//                         </option>
//                         {educativeGrades.map((key) => (
//                           <option key={key.ID} value={JSON.stringify(key)}>
//                             {key.TITLE}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button
//                     style={{
//                       backgroundColor: "#ff2400",
//                       color: "white",
//                       marginRight: "auto",
//                     }}
//                     onClick={() => {
//                       deleteThisElement(editingObjectGradoEducativo);
//                     }}
//                   >
//                     Eliminar
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       setModalVisibility({
//                         ...modalVisibility,
//                         modal6Edit: false,
//                       });
//                     }}
//                   >
//                     Cancelar
//                   </Button>
//                   <Button
//                     type="submit"
//                     style={{ backgroundColor: "#ECB83C" }}
//                     form="modal6EditForm"
//                   >
//                     Actualizar
//                   </Button>
//                 </ModalFooter>
//               </ModalContent>
//             </Modal>
//           )}
//         </Formik>
//       );
//     } else {
//       return null;
//     }
//   }
// );
// export const Modal7 = React.memo(({ modalVisibility, setModalVisibility }) => {
//   const toast = useToast();
//   // context
//   const { secondaryInfoState, userInfoState } = useContext(MainContext);
//   const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
//   const [userInfo] = userInfoState;
//   const validationSchema = Yup.object().shape({
//     TITULO: Yup.string().required(),
//     TIPO: Yup.string().required(),
//     DESCRIPTION: Yup.string().required(),
//   });
//   // states
//   const [years, setYears] = useState([]);
//   // effects
//   useEffect(() => {
//     let years = [];
//     let limit = moment(new Date()).year() - 80;
//     for (let i = moment(new Date()).year(); i > limit; i--) {
//       years.push(i);
//     }
//     setYears(years);
//   }, []);
//   return (
//     <Formik
//       initialValues={{
//         TITULO: "",
//         TIPO: "",
//         YEAR: "",
//         NOTAQUIRED: false,
//         DESCRIPTION: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values, formikBag) => {
//         let newCursosCertificaciones;
//         // year resolution
//         values.NOTAQUIRED
//           ? delete values.YEAR
//           : (values.YEAR = values.YEAR
//               ? values.YEAR
//               : moment(new Date()).format("YYYY"));
//         // secondaryInfo.CURSOS_CERTIFICACIONS array logic
//         if (secondaryInfo.CURSOS_CERTIFICACIONES) {
//           newCursosCertificaciones = JSON.parse(
//             secondaryInfo.CURSOS_CERTIFICACIONES
//           );
//           if (newCursosCertificaciones.length === 0) {
//             values.ID = 1;
//           } else {
//             values.ID = newCursosCertificaciones.slice(-1).pop().ID + 1;
//           }
//           newCursosCertificaciones.push(values);
//         } else {
//           values.ID = 1;
//           newCursosCertificaciones = [];
//           newCursosCertificaciones.push(values);
//         }
//         axios
//           .post(`${apiRoute}/updateCursosCertificaciones.php`, {
//             ID: userInfo.ID,
//             CURSOS_CERTIFICACIONES: newCursosCertificaciones,
//           })
//           .then(({ data }) => {
//             if (data.code === 200) {
//               let arraysito;
//               if (secondaryInfo.CURSOS_CERTIFICACIONES) {
//                 arraysito = JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES);
//                 arraysito.push(values);
//                 setSecondaryInfo({
//                   ...secondaryInfo,
//                   CURSOS_CERTIFICACIONES: JSON.stringify(arraysito),
//                 });
//               } else {
//                 arraysito = [];
//                 arraysito.push(values);
//                 setSecondaryInfo({
//                   ...secondaryInfo,
//                   CURSOS_CERTIFICACIONES: JSON.stringify(arraysito),
//                 });
//               }
//               setModalVisibility({ modalVisibility, modal7: false });
//               toast({
//                 title: "Información actualizada",
//                 description: "Cambios exitosos",
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//               });
//               formikBag.resetForm({
//                 TITULO: "",
//                 TIPO: "",
//                 YEAR: "",
//                 NOTAQUIRED: false,
//                 DESCRIPTION: "",
//               });
//             } else {
//               setModalVisibility({ modalVisibility, modal7: false });
//               toast({
//                 title: "Ocurrio un error en la actualizacion",
//                 description: "CIntentar mas tarde",
//                 status: "error",
//                 duration: 3000,
//                 isClosable: true,
//               });
//             }
//           })
//           .catch((error) => console.log(error));
//         console.log(newCursosCertificaciones);
//       }}
//     >
//       {({ values, handleChange, errors }) => (
//         <Modal isOpen={modalVisibility.modal7} size="md">
//           <ModalOverlay />
//           <ModalCloseButton />
//           <ModalContent>
//             <ModalHeader>Cursos y certificaciones</ModalHeader>
//             <ModalBody>
//               <Form id="modal7Form">
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     marginBottom: "1em",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       marginBottom: "1em",
//                     }}
//                   >
//                     {errors.TITULO ? (
//                       <span style={{ color: "red" }}>*</span>
//                     ) : null}
//                     <Field
//                       placeholder="Título"
//                       name="TITULO"
//                       value={values.TITULO}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div style={{ display: "flex", flexDirection: "column" }}>
//                     {errors.TIPO ? (
//                       <span style={{ color: "red" }}>*</span>
//                     ) : null}
//                     <Field
//                       placeholder="Tipo de certificación"
//                       name="TIPO"
//                       value={values.TIPO}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   {values.NOTAQUIRED ? null : (
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         marginRight: "1em",
//                       }}
//                     >
//                       {errors.YEAR ? (
//                         <span style={{ color: "#ff2400" }}>*</span>
//                       ) : null}
//                       <select
//                         name="YEAR"
//                         onChange={handleChange}
//                         value={values.YEAR}
//                       >
//                         <option value="" disabled>
//                           Año
//                         </option>
//                         {years.map((key) => (
//                           <option key={key} value={key}>
//                             {key}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <input
//                       type="checkbox"
//                       name="NOTAQUIRED"
//                       onChange={handleChange}
//                     />
//                     <span style={{ marginLeft: "0.5em" }}>
//                       ¿Aún no adquieres este certificado?
//                     </span>
//                   </div>
//                 </div>
//                 {errors.DESCRIPTION ? (
//                   <span style={{ color: "#ff2400" }}>*</span>
//                 ) : null}
//                 <Field
//                   value={values.DESCRIPTION}
//                   name="DESCRIPTION"
//                   onChange={handleChange}
//                   as="textarea"
//                   rows={4}
//                   maxrows={6}
//                   style={{ width: "100%", marginTop: "1em" }}
//                 />
//               </Form>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 variant="ghost"
//                 onClick={() => {
//                   setModalVisibility({
//                     ...modalVisibility,
//                     modal7: false,
//                   });
//                 }}
//               >
//                 Cancelar
//               </Button>
//               <Button
//                 type="submit"
//                 style={{ backgroundColor: "#ECB83C" }}
//                 form="modal7Form"
//               >
//                 Agregar
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//     </Formik>
//   );
// });
// export const Modal7Edit = React.memo(
//   ({
//     modalVisibility,
//     setModalVisibility,
//     editingObjectCursosCertificaciones,
//   }) => {
//     const toast = useToast();
//     // context
//     const { secondaryInfoState, userInfoState } = useContext(MainContext);
//     const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
//     const [userInfo] = userInfoState;
//     const validationSchema = Yup.object().shape({
//       EDITTITULO: Yup.string().required(),
//       EDITTIPO: Yup.string().required(),
//       EDITDESCRIPTION: Yup.string().required(),
//     });
//     // states
//     const [years, setYears] = useState([]);
//     // functions
//     const deleteThisElement = (key) => {
//       let prevArray = [...JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES)];
//       let newArray = prevArray.filter((item) => item.ID !== key.ID);
//       axios
//         .post(`${apiRoute}/updateCursosCertificaciones.php`, {
//           CURSOS_CERTIFICACIONES: newArray,
//           ID: userInfo.ID,
//         })
//         .then(({ data }) => {
//           if (data.code === 200) {
//             setSecondaryInfo({
//               ...secondaryInfo,
//               CURSOS_CERTIFICACIONES: JSON.stringify(newArray),
//             });
//             setModalVisibility({ modalVisibility, modal7Edit: false });
//             toast({
//               title: "Información actualizada",
//               description: "Cambios exitosos",
//               status: "success",
//               duration: 3000,
//               isClosable: true,
//             });
//           } else {
//             setModalVisibility({ modalVisibility, modal7Edit: false });
//             toast({
//               title: "Ocurrio un error en la actualizacion",
//               description: "CIntentar mas tarde",
//               status: "error",
//               duration: 3000,
//               isClosable: true,
//             });
//           }
//         })
//         .catch((error) => console.log(error));
//     };
//     // effects
//     useEffect(() => {
//       let years = [];
//       let limit = moment(new Date()).year() - 80;
//       for (let i = moment(new Date()).year(); i > limit; i--) {
//         years.push(i);
//       }
//       setYears(years);
//     }, []);
//     if (Object.values(editingObjectCursosCertificaciones).length !== 0) {
//       return (
//         <Formik
//           validationSchema={validationSchema}
//           initialValues={{
//             EDITTITULO: editingObjectCursosCertificaciones.TITULO,
//             EDITTIPO: editingObjectCursosCertificaciones.TIPO,
//             EDITYEAR: editingObjectCursosCertificaciones.YEAR,
//             EDITNOTAQUIRED: editingObjectCursosCertificaciones.NOTAQUIRED,
//             EDITDESCRIPTION: editingObjectCursosCertificaciones.DESCRIPTION,
//           }}
//           onSubmit={(values) => {
//             let newObj = {
//               TITULO: values.EDITTITULO,
//               TIPO: values.EDITTIPO,
//               YEAR: values.EDITYEAR,
//               NOTAQUIRED: values.EDITNOTAQUIRED,
//               DESCRIPTION: values.EDITDESCRIPTION,
//             };
//             // year resolution
//             values.EDITNOTAQUIRED
//               ? delete newObj.YEAR
//               : (newObj.YEAR = values.EDITYEAR
//                   ? values.EDITYEAR
//                   : moment(new Date()).format("YYYY"));
//             newObj.ID = editingObjectCursosCertificaciones.ID;
//             let oldCursosCertificaciones = [
//               ...JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES),
//             ];
//             const index = oldCursosCertificaciones.findIndex(
//               (item) => item.ID === editingObjectCursosCertificaciones.ID
//             );
//             oldCursosCertificaciones[index] = newObj;
//             axios
//               .post(`${apiRoute}/updateCursosCertificaciones.php`, {
//                 ID: userInfo.ID,
//                 CURSOS_CERTIFICACIONES: oldCursosCertificaciones,
//               })
//               .then(({ data }) => {
//                 if (data.code === 200) {
//                   setSecondaryInfo({
//                     ...secondaryInfo,
//                     CURSOS_CERTIFICACIONES: JSON.stringify(
//                       oldCursosCertificaciones
//                     ),
//                   });
//                   setModalVisibility({ modalVisibility, modal7Edit: false });
//                   toast({
//                     title: "Información actualizada",
//                     description: "Cambios exitosos",
//                     status: "success",
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 } else {
//                   setModalVisibility({ modalVisibility, modal7Edit: false });
//                   toast({
//                     title: "Ocurrio un error en la actualizacion",
//                     description: "CIntentar mas tarde",
//                     status: "error",
//                     duration: 3000,
//                     isClosable: true,
//                   });
//                 }
//               })
//               .catch((error) => console.log(error));
//           }}
//         >
//           {({ values, handleChange, errors }) => (
//             <Modal isOpen={modalVisibility.modal7Edit}>
//               <ModalOverlay />
//               <ModalCloseButton />
//               <ModalContent>
//                 <ModalHeader>Editar cursos y certificaciones</ModalHeader>
//                 <ModalBody>
//                   <Form id="modal7EditForm">
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         marginBottom: "1em",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           marginBottom: "1em",
//                         }}
//                       >
//                         {errors.EDITTITULO ? (
//                           <span style={{ color: "red" }}>*</span>
//                         ) : null}
//                         <Field
//                           placeholder="Título"
//                           name="EDITTITULO"
//                           value={values.EDITTITULO}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div style={{ display: "flex", flexDirection: "column" }}>
//                         {errors.EDITTIPO ? (
//                           <span style={{ color: "red" }}>*</span>
//                         ) : null}
//                         <Field
//                           placeholder="Tipo de certificación"
//                           name="EDITTIPO"
//                           value={values.EDITTIPO}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {values.EDITNOTAQUIRED ? null : (
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             marginRight: "1em",
//                           }}
//                         >
//                           <select
//                             name="EDITYEAR"
//                             onChange={handleChange}
//                             value={values.EDITYEAR}
//                           >
//                             <option value="" disabled>
//                               Año
//                             </option>
//                             {years.map((key) => (
//                               <option key={key} value={key}>
//                                 {key}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                       )}
//                       <div style={{ display: "flex", alignItems: "center" }}>
//                         <input
//                           type="checkbox"
//                           name="EDITNOTAQUIRED"
//                           onChange={handleChange}
//                           defaultChecked={
//                             editingObjectCursosCertificaciones.NOTAQUIRED
//                           }
//                         />
//                         <span style={{ marginLeft: "0.5em" }}>
//                           ¿Aún no adquieres este certificado?
//                         </span>
//                       </div>
//                     </div>
//                     <Field
//                       value={values.EDITDESCRIPTION}
//                       name="EDITDESCRIPTION"
//                       onChange={handleChange}
//                       as="textarea"
//                       rows={4}
//                       maxrows={6}
//                       style={{ width: "100%", marginTop: "1em" }}
//                     />
//                   </Form>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button
//                     style={{
//                       backgroundColor: "#ff2400",
//                       color: "white",
//                       marginRight: "auto",
//                     }}
//                     onClick={() => {
//                       deleteThisElement(editingObjectCursosCertificaciones);
//                     }}
//                   >
//                     Eliminar
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       setModalVisibility({
//                         ...modalVisibility,
//                         modal7Edit: false,
//                       });
//                     }}
//                   >
//                     Cancelar
//                   </Button>
//                   <Button
//                     type="submit"
//                     style={{ backgroundColor: "#ECB83C" }}
//                     form="modal7EditForm"
//                   >
//                     Actualizar
//                   </Button>
//                 </ModalFooter>
//               </ModalContent>
//             </Modal>
//           )}
//         </Formik>
//       );
//     } else {
//       return null;
//     }
//   }
// );
// export const CVModal = React.memo(({ modalVisibility, setModalVisibility }) => {
//   const { secondaryInfoState, userInfoState } = useContext(MainContext);
//   const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
//   const [userInfo] = userInfoState;
//   return (
//     <Modal
//       size="6xl"
//       isOpen={modalVisibility.CVmodal}
//       onClose={() => {
//         setModalVisibility({ ...modalVisibility, CVmodal: false });
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <div
//           style={{
//             position: "absolute",
//             left: "2em",
//             top: "2em",
//             display: "flex",
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: "white",
//               padding: "1em",
//               display: "flex",
//               justifyContent: "center",
//               justifyItems: "center",
//               borderRadius: "5em",
//               marginRight: "1em",
//             }}
//             onClick={() => {
//               setModalVisibility({ ...modalVisibility, CVmodal: false });
//             }}
//           >
//             <Close />
//           </button>
//           <button
//             style={{
//               backgroundColor: "white",
//               padding: "1em",
//               display: "flex",
//               justifyContent: "center",
//               justifyItems: "center",
//               borderRadius: "5em",
//             }}
//           >
//             <CloudDownload />
//           </button>
//         </div>

//         <CVModalComponent userInfo={userInfo} secondaryInfo={secondaryInfo} />
//         {/* <PDFViewer>
//             <CVpdf secondaryInfo={secondaryInfo} userInfo={userInfo} />
//           </PDFViewer> */}
//       </ModalContent>
//     </Modal>
//   );
// });
