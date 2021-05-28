import React, { useState, useContext, useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import { Person } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import style from "../../styles/modals.module.css";
const ThisContext = React.createContext();
export default function EnterpriseCustomModal(props) {
  const router = useRouter();
  const toast = useToast();
  const { vis, content } = props;
  const [modalVis, setModalVis] = vis;
  const { userInfoState, secondaryInfoState, ResetInfo } =
    useContext(MainContext);
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [userInfo, setUserInfo] = userInfoState;
  const primaryKeys = [
    "NAMES",
    "MOTHERS_LAST_NAME",
    "LAST_NAME",
    "EMAIL",
    "PASSWORD",
    "COMPANY_NAME",
    "RAZON_SOCIAL",
    "RFC",
    "TEL_NUMBER",
    "STATE",
    "CITY",
  ];
  const secondaryKeys = ["COMPANY_DESCRIPTION", "WEBSITE", "FUNDATION_DATE"];
  const [formInitialValues, setFormInitialValues] = useState();
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
  const onClose = () => {
    setModalVis(!modalVis);
  };
  useEffect(() => {
    let formInitialValues;
    formInitialValues = EnterpriseModalContentIndex[content].formInitialValues;
    console.log(formInitialValues);
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
  }, [modalVis]);
  const FormContentComponent = EnterpriseModalContentIndex[content].form;
  return (
    <Modal
      isOpen={modalVis}
      size={EnterpriseModalContentIndex[content].modalSize}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{EnterpriseModalContentIndex[content].title}</ModalHeader>
        <ModalCloseButton />
        <Formik
          validationSchema={EnterpriseModalContentIndex[content].validation}
          initialValues={formInitialValues}
          onSubmit={(values) => {
            values.ID = userInfo.ID;
            axios
              .post(EnterpriseModalContentIndex[content].apiURL, values)
              .then(({ data }) => {
                console.log(data);
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
              <Form id="enterpriseModalForm">
                <ThisContext.Provider
                  value={{
                    handleChange: handleChange,
                    errors: errors,
                    values: values,
                    content: content,
                  }}
                  children={<FormContentComponent />}
                />
              </Form>
            </ModalBody>
          )}
        </Formik>
        <ModalFooter>
          <Button mr={2} type="submit" form="enterpriseModalForm">
            Agregar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
const Content0 = () => {
  const toast = useToast();
  const imgInputRef = useRef();
  const { handleChange, values, errors, content } = useContext(ThisContext);
  const { userInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
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
    <Flex direction="column" align="center" w="100%">
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
      <Flex direction="column" w="100%" align="flex-start" mb={3} mt={5}>
        {errors.COMPANY_NAME ? (
          <Text color="red" ml="auto">
            Campo requerido*
          </Text>
        ) : null}
        <Field
          onChange={handleChange}
          name="COMPANY_NAME"
          value={values.COMPANY_NAME}
          placeholder="Nombre de la compañía"
          style={{ width: "100%" }}
        />
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Nombre de la compañía
        </Text>
      </Flex>
      <Flex direction="column" w="100%" align="flex-start" mb={3}>
        {errors.COMPANY_DESCRIPTION ? (
          <Text color="red" ml="auto">
            Campo requerido*
          </Text>
        ) : null}
        <Field
          onChange={handleChange}
          name="COMPANY_DESCRIPTION"
          value={values.COMPANY_DESCRIPTION}
          placeholder="Descripción de la compañía"
          style={{ width: "100%" }}
          maxLength={50}
        />
        <Flex w="100%">
          <Text fontWeight="bold" color="gray" fontSize="0.8em">
            Descripción de la compañía
          </Text>
          <Text
            ml="auto"
            color="gray"
            fontSize="0.8em"
          >{`${values.COMPANY_DESCRIPTION.length}/50`}</Text>
        </Flex>
      </Flex>
      <Flex direction="column" w="100%" align="flex-start" mb={3}>
        {errors.WEBSITE ? (
          <Text color="red" ml="auto">
            Campo requerido*
          </Text>
        ) : null}
        <Field
          onChange={handleChange}
          name="WEBSITE"
          value={values.WEBSITE}
          placeholder="Sitio web"
          style={{ width: "100%" }}
        />
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Sitio web
        </Text>
      </Flex>
    </Flex>
  );
};
const Content1 = () => {
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
      <Text fontSize="0.8em" textAlign="center">
        Al actualizar tu contraseña, cerraremos la sesión, revisa que tus nuevas
        contraseñas coincidas y no las olvides.
      </Text>
    </Flex>
  );
};
const Content2 = () => {
  const [years, setYears] = useState([]);
  const [days, setDays] = useState();
  const [selectedYear, setSelectedYear] = useState(moment(new Date()).year());
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [stateID, setStateID] = useState();
  const [cityID, setCityID] = useState();
  const { values, handleChange, errors } = useContext(ThisContext);
  const { userInfoState } = useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    setDays(
      moment(`${selectedYear},${selectedMonth}`, "YYYY-MM").daysInMonth()
    );
    values.FUNDATION_DATE = `${selectedYear}-${selectedMonth}-${selectedDay}`;
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
  }, [cityID]);
  return (
    <Flex direction="column" w="100%">
      <Flex w="100%" direction="column" mb="1em">
        <Flex w="100%">
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
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Fecha de fundación
        </Text>
      </Flex>
      <Flex w="100%" direction="column" mb="1em">
        <Flex direction="column">
          {errors.NAMES ? (
            <Text color="red" fontSize="0.7em" ml="auto">
              Campo requerido*
            </Text>
          ) : null}
          <Field
            style={{ marginBottom: "0.5em" }}
            name="NAMES"
            value={values.NAMES}
            onChange={handleChange}
          />
        </Flex>
        <Flex w="100%">
          <Flex direction="column">
            {errors.MOTHERS_LAST_NAME ? (
              <Text color="red" fontSize="0.7em" ml="auto">
                Campo requerido*
              </Text>
            ) : null}
            <Field
              style={{ flexGrow: 1 }}
              name="MOTHERS_LAST_NAME"
              value={values.MOTHERS_LAST_NAME}
              onChange={handleChange}
            />
          </Flex>
          <Flex direction="column">
            {errors.LAST_NAME ? (
              <Text color="red" fontSize="0.7em" ml="auto">
                Campo requerido*
              </Text>
            ) : null}
            <Field
              style={{ flexGrow: 1, marginLeft: "1em" }}
              name="LAST_NAME"
              value={values.LAST_NAME}
              onChange={handleChange}
            />
          </Flex>
        </Flex>
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Nombre de la cuenta
        </Text>
      </Flex>
      <Flex w="100%" direction="column" mb="1em">
        {errors.RAZON_SOCIAL ? (
          <Text color="red" fontSize="0.7em" ml="auto">
            Campo requerido*
          </Text>
        ) : null}
        <Field
          name="RAZON_SOCIAL"
          value={values.RAZON_SOCIAL}
          onChange={handleChange}
        />
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Razón social
        </Text>
      </Flex>
      <Flex w="100%" direction="column" mb="1em">
        {errors.RFC ? (
          <Text color="red" fontSize="0.7em" ml="auto">
            Campo requerido*
          </Text>
        ) : null}
        <Field name="RFC" value={values.RFC} onChange={handleChange} />
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          RFC
        </Text>
      </Flex>
      <Flex w="100%" direction="column" mb="1em">
        {errors.TEL_NUMBER ? (
          <Text color="red" fontSize="0.7em" ml="auto">
            Campo requerido*
          </Text>
        ) : null}
        <Field
          name="TEL_NUMBER"
          value={values.TEL_NUMBER}
          onChange={handleChange}
        />
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Número telefónico
        </Text>
      </Flex>
      <Flex w="100%" direction="column" mb="1em">
        <Flex>
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
            <option value="">Estado</option>
            {Cities.cities
              .filter((item) => item.state_id === stateID)
              .map((key) => (
                <option key={key.id} value={key.id}>
                  {key.name}
                </option>
              ))}
          </Field>
        </Flex>
        <Text fontWeight="bold" color="gray" fontSize="0.8em">
          Ubicación
        </Text>
      </Flex>
    </Flex>
  );
};

const EnterpriseModalContentIndex = [
  {
    id: 0,
    modalSize: "sm",
    title: "",
    form: () => <Content0 />,
    apiURL: `${apiRoute}/updateCompanyPrimaryInfo.php`,
    formInitialValues: {
      COMPANY_NAME: "",
      COMPANY_DESCRIPTION: "",
      WEBSITE: "",
      RAZON_SOCIAL: "",
    },
    validation: Yup.object().shape({
      COMPANY_NAME: Yup.string().required("Este campo es requerido"),
      COMPANY_DESCRIPTION: Yup.string().required("Este campo es requerido"),
      WEBSITE: Yup.string().required("Este campo es requerido"),
    }),
  },
  {
    id: 1,
    modalSize: "sm",
    title: "Actualizar datos de seguridad",
    form: () => <Content1 />,
    apiURL: `${apiRoute}/updatePassword.php`,
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
    id: 2,
    modalSize: "md",
    title: "Actualizar datos personales",
    form: () => <Content2 />,
    apiURL: `${apiRoute}/updateCompanySecondaryInfo.php`,
    formInitialValues: {
      NAMES: "",
      MOTHERS_LAST_NAME: "",
      LAST_NAME: "",
      RAZON_SOCIAL: "",
      RFC: "",
      TEL_NUMBER: "",
      STATE: "",
      CITY: "",
    },
    validation: Yup.object().shape({
      NAMES: Yup.string().required("Campo requerido"),
      MOTHERS_LAST_NAME: Yup.string().required("Campo requerido"),
      LAST_NAME: Yup.string().required("Campo requerido"),
    }),
  },
];
