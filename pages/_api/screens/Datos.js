import React from "react";
import {
  Box,
  Switch,
  Table,
  Tbody,
  Tr,
  Td,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { Add, Close, CloudDownload, Edit } from "@material-ui/icons";
import { MainContext } from "../resources/MainContext";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import * as Yup from "yup";
import Estados from "../resources/states_mexico.json";
import Cities from "../resources/cities_mexico.json";
import axios from "axios";
import apiRoute from "../resources/apiRoute";
import { PDFViewer } from "@react-pdf/renderer";
// components
import Footer from "../components/Footer";
import CVpdf from "../components/CVpdf";
import CVModalComponent from "../components/CVmodal";
// styles
import style from "../../../styles/datos.module.css";
const Datos = React.memo(() => {
  const toast = useToast();

  // states
  const [modalsVisibility, setModalsVisibility] = React.useState({
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
    modal5Edit: false,
    modal6: false,
    modal6Edit: false,
    modal7: false,
    modal7Edit: false,
    CVmodal: false,
  });
  const [disponibleState, setDisponibleState] = React.useState();
  const [
    editingObjectExperienciaLaboral,
    setEditingObjectExperienciaLaboral,
  ] = React.useState({});
  const [
    editingObjectGradoEducativo,
    setEditingObjectGradoEducativo,
  ] = React.useState({});
  const [
    editingObjectCursosCertificaciones,
    setEditingObjectCursosCertificaciones,
  ] = React.useState({});
  // context
  const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  // functions
  const ChangeAvailability = (e) => {
    axios
      .post(`${apiRoute}/changeAvailability.php`, {
        state: e.target.checked,
        userId: userInfo.ID,
      })
      .then(({ data }) => {
        if (data.code === 200) {
          toast({
            title: data.current ? "Disponible para trabajar" : "No disponible",
            description: "Has cambiado tu disponibilidad de trabajo",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          let secondaryInfoCopy = { ...secondaryInfo };
          secondaryInfoCopy.DISPONIBLE = data.current.toString();
          setSecondaryInfo(secondaryInfoCopy);
          setDisponibleState(!Boolean(disponibleState));
        } else {
          console.log("ocurrio un error");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <Card
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal1: true });
            }}
          >
            <div className={style.userImage}>
              <img src={`${userInfo.IMAGE_URL}?v=${Date.now()}`} />
            </div>
            <span
              className={style.personalLabel}
            >{`${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME}`}</span>
            <span className={style.userTitle}>{`${secondaryInfo.TITULO}`}</span>
            <button className={style.CVButton}>Generar CV</button>
            <div className={style.disponibleContainer}>
              <span>Disponible para trabajar</span>
              <Switch
                size="md"
                mt={2}
                defaultChecked={Boolean(parseInt(secondaryInfo.DISPONIBLE))}
                onChange={ChangeAvailability}
              />
            </div>
          </Card>
          <Card
            title="Datos personales"
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal2: true });
            }}
          >
            <Table variant="simple" borderBottom="0px">
              <Tbody>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Edad</Td>
                  <Td>{userInfo.AGE + " años"}</Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Género</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.GENRE}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Teléfono</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.TEL_NUMBER}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Estado</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.STATE}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Ciudad</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.CITY}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Idiomas</Td>
                  <Td
                    style={{
                      textTransform: "capitalize",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {secondaryInfo.IDIOMAS ? (
                      JSON.parse(secondaryInfo.IDIOMAS).map((key) => (
                        <Badge
                          key={key.ID}
                          mb={
                            JSON.parse(secondaryInfo.IDIOMAS).length > 2 ? 2 : 0
                          }
                        >
                          {key.TITLE}
                        </Badge>
                      ))
                    ) : (
                      <Badge>No disponible</Badge>
                    )}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Card>
          <Card
            title="Habilidades"
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal3: true });
            }}
          >
            <div className={style.habilitiesContainer}>
              {secondaryInfo.HABILIDADES ? (
                JSON.parse(secondaryInfo.HABILIDADES).length !== 0 ? (
                  JSON.parse(secondaryInfo.HABILIDADES).map((key) => (
                    <Badge key={key.ID} mb={2}>
                      {key.TITLE}
                    </Badge>
                  ))
                ) : (
                  <Badge>No disponible</Badge>
                )
              ) : (
                <Badge>No disponible</Badge>
              )}
            </div>
          </Card>
          <Card
            title="Seguridad"
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal4: true });
            }}
          >
            <Table>
              <Tbody>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Email</Td>
                  <Td style={{ fontSize: "0.85em" }}>
                    {userInfo.EMAIL.substring(0, 1) +
                      "****@" +
                      userInfo.EMAIL.split("@")[1]}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Contraseña</Td>
                  <Td>{userInfo.PASSWORD.replace(/./g, "*")}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Card>
        </div>
        <div className={style.rigth}>
          <Card2
            title="Experiencia laboral"
            data={secondaryInfo.EXPERIENCIA_LABORAL}
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal5: true });
            }}
          />
          <Card2
            title="Grado Educativo"
            data={secondaryInfo.GRADO_EDUCATIVO}
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal6: true });
            }}
          />
          <Card2
            title="Cursos y certificaciones"
            data={secondaryInfo.CURSOS_CERTIFICACIONES}
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, modal7: true });
            }}
          />
        </div>
      </div>
      <Modal1
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
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
      <Modal5
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Modal5Edit
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
        editingObjectExperienciaLaboral={editingObjectExperienciaLaboral}
      />
      <Modal6
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Modal6Edit
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
        editingObjectGradoEducativo={editingObjectGradoEducativo}
      />
      <Modal7
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Modal7Edit
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
        editingObjectCursosCertificaciones={editingObjectCursosCertificaciones}
      />
      <CVModal
        modalsVisibility={modalsVisibility}
        setModalsVisibility={setModalsVisibility}
      />
      <Footer />
    </>
  );
});
const Card = React.memo(({ children, props, title, onClick }) => {
  return (
    <Box
      {...props}
      boxShadow="md"
      p={2}
      rounded="md"
      bg="white"
      w="100%"
      mb={4}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {title ? (
          <span
            style={{
              marginRight: "auto",
              fontWeight: "bold",
              fontSize: "1.1em",
            }}
          >
            {title}
          </span>
        ) : null}
        <button onClick={onClick}>
          <Edit />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </Box>
  );
});
const Card2 = React.memo(({ props, title, data, onClick }) => {
  return (
    <Box
      {...props}
      boxShadow="md"
      p={2}
      rounded="md"
      bg="white"
      w="100%"
      mb={4}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {title ? (
          <span
            style={{
              marginRight: "auto",
              fontWeight: "bold",
              fontSize: "1.3em",
            }}
          >
            {title}
          </span>
        ) : null}
        <button onClick={onClick}>
          <Add />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {data ? (
          JSON.parse(data).map((key) => <div key={key.ID}></div>)
        ) : (
          <div className={style.noData}>
            <span>Aún no has agregado ningún campo.</span>
            <span>
              Aumenta tus posibilidades de éxito agregando experiencia en este
              campo.
            </span>
          </div>
        )}
      </div>
    </Box>
  );
});
const Modal1 = React.memo(
  ({
    setModalsVisibility,
    modalsVisibility,
    userImgError,
    setUserImgError,
    setEditModalVisibility,
    setImageHash,
  }) => {
    const fileUploaderButton = React.useRef();
    const toast = useToast();
    const RetroError = () => {
      return (
        <span style={{ color: "red", fontSize: "0.8em" }}>Requerido*</span>
      );
    };
    const validationSchema = Yup.object().shape({
      NAMES: Yup.string().required(),
      LAST_NAME: Yup.string().required(),
    });
    const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
    const [userInfo, setUserInfo] = userInfoState;
    const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
    const updateUserPhoto = (userID, image) => {
      const formData = new FormData();
      // setModals({ ...modals, submit: true });
      formData.append("userID", parseInt(userID));
      formData.append("image", image);
      axios
        .post(`${apiRoute}/uploadProfilePhoto.php`, formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          setUserImgError(true);

          if (response.data.code === 200) {
            let userInfoCopy = { ...userInfo };
            console.log(userInfoCopy);
            userInfoCopy.IMAGE_URL = response.data.IMAGE_URL;
            setUserInfo(userInfoCopy);
            setImageHash((imageHash) => imageHash + 1);
            setUserImgError(false);
            toast({
              title: "Imagen actualizada",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Ocurrio un error, intenta mas tarde.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch(() => {
          toast({
            title: "Ocurrio un error, intenta mas tarde.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    };
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          NAMES: userInfo.NAMES,
          LAST_NAME: userInfo.LAST_NAME,
          MOTHERS_LAST_NAME: userInfo.MOTHERS_LAST_NAME,
          TITULO: secondaryInfo.TITULO ? secondaryInfo.TITULO : "",
        }}
        onSubmit={(values) => {
          if (
            values.NAMES === userInfo.NAMES &&
            values.LAST_NAME === userInfo.LAST_NAME &&
            values.MOTHERS_LAST_NAME === userInfo.MOTHERS_LAST_NAME &&
            values.TITULO === secondaryInfo.TITULO
          ) {
            setEditModalVisibility(!editModalVisibility);
          } else {
            values["ID"] = parseInt(userInfo.ID);
            axios
              .post(`${apiRoute}/updatePrimaryInfo.php`, values)
              .then(({ data }) => {
                if (data.code === 200) {
                  let userInfoCopy = { ...userInfo };
                  let secondaryInfoCopy = { ...secondaryInfo };
                  userInfoCopy.NAMES = values.NAMES.toLowerCase();
                  userInfoCopy.LAST_NAME = values.LAST_NAME.toLowerCase();
                  userInfoCopy.MOTHERS_LAST_NAME = values.MOTHERS_LAST_NAME.toLowerCase();
                  secondaryInfoCopy.TITULO = values.TITULO.toLowerCase();
                  setUserInfo(userInfoCopy);
                  setSecondaryInfo(secondaryInfoCopy);
                  setEditModalVisibility(false);
                  toast({
                    title: "Información actualizada",
                    description: "Cambios exitosos",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Ocurrio un error, intenta mas tarde.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              })
              .catch((error) => console.log(error));
          }
        }}
      >
        {({ values, handleChange, errors, handleBlur }) => (
          <>
            <Modal
              isOpen={modalsVisibility.modal1}
              onClose={() => {
                setModalsVisibility({ ...modalsVisibility, modal1: false });
              }}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  ¿Quieres actualizar tus datos personales?
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div className={style.modal1Upper}>
                    {!userImgError ? (
                      <button
                        onClick={() => {
                          fileUploaderButton.current.click();
                        }}
                      >
                        <input
                          ref={fileUploaderButton}
                          type="file"
                          id="fileUploader"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            updateUserPhoto(userInfo.ID, e.target.files[0])
                          }
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                        <img
                          className={style.profile}
                          src={`${userInfo.IMAGE_URL}?v=${Date.now()}`}
                          onError={() => {
                            setUserImgError(true);
                          }}
                        />
                      </button>
                    ) : (
                      <div className={style.iconContainer}>
                        <button
                          onClick={() => {
                            fileUploaderButton.current.click();
                          }}
                        >
                          <input
                            ref={fileUploaderButton}
                            type="file"
                            id="fileUploader"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              updateUserPhoto(userInfo.ID, e.target.files[0])
                            }
                            onClick={(event) => {
                              event.target.value = null;
                            }}
                          />
                          <Icon name="user" size="huge" color="grey" />
                        </button>
                      </div>
                    )}
                    <Form
                      style={{ display: "flex", flexDirection: "column" }}
                      id="modal1Form"
                    >
                      {errors.NAMES ? <RetroError /> : null}
                      <Field
                        type="text"
                        placeholder="Nombres"
                        name="NAMES"
                        onChange={handleChange}
                        value={values.NAMES}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                      {errors.LAST_NAME ? <RetroError /> : null}
                      <Field
                        type="text"
                        placeholder="Apellido"
                        name="LAST_NAME"
                        onChange={handleChange}
                        value={values.LAST_NAME}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                      <Field
                        type="text"
                        placeholder="Apellido Materno"
                        name="MOTHERS_LAST_NAME"
                        onChange={handleChange}
                        value={values.MOTHERS_LAST_NAME}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                      <Field
                        type="text"
                        placeholder="Titulo/Puesto"
                        name="TITULO"
                        onChange={handleChange}
                        value={values.TITULO}
                        onBlur={handleBlur}
                        style={{ textTransform: "capitalize" }}
                      />
                    </Form>
                  </div>
                  <div className={style.modal1Lower}>
                    <div>
                      <p href="#">Fotografía</p>
                      <p>
                        Puedes escoger la fotografía que prefieras pero por
                        motivos profecionales sugerimos una fotografía de
                        aspecto formal y seria.
                      </p>
                    </div>
                    <div>
                      <a href="#">Generar y actualizar CV</a>
                      <p>
                        Crea un currículum con nosotros usando tus datos en esta
                        sección para generarlo de forma automatica y así puedas
                        enviarlo en tus postulaciones de empleo.
                      </p>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter style={{ justifyContent: "center" }}>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setModalsVisibility({
                        ...modalsVisibility,
                        modal1: false,
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ECB83C" }}
                    form="modal1Form"
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Formik>
    );
  }
);
const Modal2 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const toast = useToast();
  const [years, setYears] = React.useState([]);
  const [days, setDays] = React.useState();
  const [selectedCityID, setSelectedCityID] = React.useState("0");
  const [selectedStateID, setSelectedStateID] = React.useState("0");
  const [selectedYear, setSelectedYear] = React.useState(
    moment(new Date()).year()
  );
  const [selectedMonth, setSelectedMonth] = React.useState("01");
  const [selectedDay, setSelectedDay] = React.useState("01");
  const [languages, setLanguages] = React.useState([]);
  const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [languagesList, setLanguagesList] = React.useState([
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
  React.useEffect(() => {
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
  React.useEffect(() => {
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
                      justifyContent: "space-between",
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
                      style={{ padding: "0.5em", width: "100%" }}
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
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
                    />
                  </div>
                  <span>Número telefónico</span>
                  <div
                    style={{
                      padding: "0.5em",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "0.5em" }}>(+52)</span>
                    <Field
                      name="TEL_NUMBER"
                      type="number"
                      onChange={handleChange}
                      value={values.TEL_NUMBER}
                      style={{ flexGrow: 1 }}
                    />
                  </div>
                  <span>Estado</span>
                  <div style={{ padding: "0.5em" }}>
                    <select
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
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
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
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
                            <Close />
                          </button>
                        </div>
                      ))
                    : null}
                </div>
                <div style={{ padding: "0.5em" }}>
                  {languages.length >= 4 ? null : (
                    <select
                      style={{ width: "100%" }}
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
  const { secondaryInfoState, userInfoState } = React.useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [habilities, setHabilities] = React.useState([]);
  const [habilitiesList, setHabilitiesList] = React.useState([
    { ID: 1, TITLE: "Pensamiento Crítico", VALUES: "pensamiento critico" },
    { ID: 2, TITLE: "Trabajo en equipo", VALUES: "trabajo en equipo" },
    { ID: 3, TITLE: "Comunicacion", VALUES: "comunicacion" },
  ]);
  // funciones
  const submitHabilities = () => {
    axios
      .post(`${apiRoute}/updateHabilities.php`, {
        HABILIDADES: JSON.stringify(habilities),
        ID: userInfo.ID,
      })
      .then(({ data }) => {
        console.log(data);
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
  React.useEffect(() => {
    console.log(secondaryInfo.HABILIDADES);
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
                    <Close />
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
  const { userInfoState } = React.useContext(MainContext);
  const [userInfo, setUserInfo] = userInfoState;
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
          toast({
            title: "No se ha actualizado ningún dato",
            description:
              "Ingresa tu contraseña anterior y las nuevas dos contraseñas tienen que ser iguales",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
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
const Modal5 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    PUESTO: Yup.string().required(),
    EMPRESA: Yup.string().required(),
    DESCRIPCION: Yup.string().required(),
  });
  // context
  const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  // states
  const [years, setYears] = React.useState([]);
  const [from, setFrom] = React.useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  const [to, setTo] = React.useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  // effects
  React.useEffect(() => {
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
  }, []);
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        PUESTO: "",
        EMPRESA: "",
        DESCRIPCION: "",
        STILLINTHIS: false,
      }}
      onSubmit={(values, formikBag) => {
        let newExperienciaLaboral;
        values.FROM = `${from.month}/${from.year}`;
        !values.STILLINTHIS
          ? (values.TO = `${to.month}/${to.year}`)
          : delete values.TO;
        if (secondaryInfo.EXPERIENCIA_LABORAL) {
          newExperienciaLaboral = JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL);
          if (newExperienciaLaboral === 0) {
            values.ID = 1;
          } else {
            values.ID = newExperienciaLaboral.slice(-1).pop().ID + 1;
          }
          newExperienciaLaboral.push(values);
        } else {
          values.ID = 1;
          newExperienciaLaboral = [];
          newExperienciaLaboral.push(values);
        }
        axios
          .post(`${apiRoute}/updateExperienciaLaboral.php`, {
            ID: userInfo.ID,
            EXPERIENCIA_LABORAL: newExperienciaLaboral,
          })
          .then(({ data }) => {
            if (data.code === 200) {
              let arraysito;
              if (secondaryInfo.EXPERIENCIA_LABORAL) {
                arraysito = JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL);
                arraysito.push(values);
                setSecondaryInfo({
                  ...secondaryInfo,
                  EXPERIENCIA_LABORAL: JSON.stringify(arraysito),
                });
              } else {
                arraysito = [];
                arraysito.push(values);
                setSecondaryInfo({
                  ...secondaryInfo,
                  EXPERIENCIA_LABORAL: JSON.stringify(arraysito),
                });
              }
              setModalsVisibility({ modalsVisibility, modal5: false });
              toast({
                title: "Información actualizada",
                description: "Cambios exitosos",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              formikBag.resetForm({
                PUESTO: "",
                EMPRESA: "",
                DESCRIPCION: "",
                STILLINTHIS: false,
              });
            } else {
              setModalsVisibility({ modalsVisibility, modal5: false });
              toast({
                title: "Ocurrio un error en la actualizacion",
                description: "CIntentar mas tarde",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .catch((error) => console.log(error));
      }}
    >
      {({ values, handleChange, errors, resetForm }) => (
        <Modal
          isOpen={modalsVisibility.modal5}
          onClose={() => {
            setModalsVisibility({ ...modalsVisibility, modal5: false });
            resetForm({
              PUESTO: "",
              EMPRESA: "",
              DESCRIPCION: "",
              STILLINTHIS: false,
            });
          }}
          size="xl"
        >
          <ModalOverlay />
          <ModalCloseButton />
          <ModalContent>
            <ModalHeader>Experiencia laboral</ModalHeader>
            <ModalBody>
              <Form id="modal5Form">
                <div style={{ display: "flex", marginBottom: "1em" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      marginRight: "1em",
                    }}
                  >
                    {errors.PUESTO ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                    <Field
                      onChange={handleChange}
                      value={values.PUESTO}
                      name="PUESTO"
                      placeholder="Puesto desempeñado"
                      style={{ marginBottom: "1em" }}
                    />
                    {errors.EMPRESA ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                    <Field
                      onChange={handleChange}
                      value={values.EMPRESA}
                      name="EMPRESA"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.7em", color: "gray" }}>
                        Desde:
                      </span>
                      <div style={{ marginBottom: "0.5em" }}>
                        <select
                          style={{ marginRight: "1em" }}
                          onChange={(e) => {
                            setFrom({ ...from, month: e.target.value });
                          }}
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
                          style={{ marginRight: "1em" }}
                          onChange={(e) => {
                            setFrom({ ...from, year: e.target.value });
                          }}
                        >
                          {years.map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {values.STILLINTHIS ? null : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "0.5em",
                        }}
                      >
                        <span style={{ fontSize: "0.7em", color: "gray" }}>
                          Hasta:
                        </span>
                        <div>
                          <select
                            style={{ marginRight: "1em" }}
                            onChange={(e) => {
                              setTo({ ...to, month: e.target.value });
                            }}
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
                            onChange={(e) => {
                              setTo({ ...to, year: e.target.value });
                            }}
                          >
                            {years.map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "0.5em" }}>
                        ¿Aún sigues en este empleo?
                      </span>
                      <input
                        type="checkbox"
                        name="STILLINTHIS"
                        onChange={handleChange}
                        value={values.STILLINTHIS}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {errors.DESCRIPCION ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : null}
                  <Field
                    style={{ width: "100%" }}
                    as="textarea"
                    onChange={handleChange}
                    value={values.DESCRIPCION}
                    name="DESCRIPCION"
                    maxLength={400}
                    rows={4}
                    maxrows={6}
                    placeholder="Descríbenos en qué consistía tu trabajo"
                  />
                  <span
                    style={{
                      marginLeft: "auto",
                      fontWeight: "bold",
                      fontSize: "0.8em",
                      color: "gray",
                    }}
                  >{`${values.DESCRIPCION.length}/400`}</span>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setModalsVisibility({
                    ...modalsVisibility,
                    modal5: false,
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#ECB83C" }}
                form="modal5Form"
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
});
const Modal5Edit = React.memo(
  ({
    modalsVisibility,
    setModalsVisibility,
    editingObjectExperienciaLaboral,
  }) => {
    const toast = useToast();
    // context
    const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
    const [userInfo] = userInfoState;
    const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
    // states
    const [years, setYears] = React.useState([]);
    const [from, setFrom] = React.useState({
      month: "01",
      year: moment(new Date()).format("YYYY"),
    });
    const [to, setTo] = React.useState({
      month: "01",
      year: moment(new Date()).format("YYYY"),
    });
    // functions
    const deleteThisElement = (key) => {
      let prevArray = [...JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL)];
      let newArray = prevArray.filter((item) => item.ID !== key.ID);
      axios
        .post(`${apiRoute}/updateExperienciaLaboral.php`, {
          EXPERIENCIA_LABORAL: newArray,
          ID: userInfo.ID,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            setSecondaryInfo({
              ...secondaryInfo,
              EXPERIENCIA_LABORAL: JSON.stringify(newArray),
            });
            setModalsVisibility({ modalsVisibility, modal5: false });
            toast({
              title: "Información actualizada",
              description: "Cambios exitosos",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            setModalsVisibility({ modalsVisibility, modal5: false });
            toast({
              title: "Ocurrio un error en la actualizacion",
              description: "CIntentar mas tarde",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((error) => console.log(error));
    };
    // effects
    React.useEffect(() => {
      let years = [];
      let limit = moment(new Date()).year() - 80;
      for (let i = moment(new Date()).year(); i > limit; i--) {
        years.push(i);
      }
      setYears(years);
    }, []);
    if (Object.values(editingObjectExperienciaLaboral).length !== 0) {
      return (
        <Formik
          initialValues={{
            EDITPUESTO: editingObjectExperienciaLaboral.PUESTO,
            EDITEMPRESA: editingObjectExperienciaLaboral.EMPRESA,
            EDITDESCRIPCION: editingObjectExperienciaLaboral.DESCRIPCION,
            EDITSTILLINTHIS: editingObjectExperienciaLaboral.STILLINTHIS,
          }}
          onSubmit={(values) => {
            values.PUESTO = values.EDITPUESTO;
            delete values.EDITPUESTO;
            values.EMPRESA = values.EDITEMPRESA;
            delete values.EDITEMPRESA;
            values.DESCRIPCION = values.EDITDESCRIPCION;
            delete values.EDITDESCRIPCION;
            values.STILLINTHIS = values.EDITSTILLINTHIS;
            delete values.EDITSTILLINTHIS;
            let oldExperienciaLaboral = [
              ...JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL),
            ];
            values.ID = editingObjectExperienciaLaboral.ID;
            values.FROM = `${from.month}/${from.year}`;
            !values.STILLINTHIS
              ? (values.TO = `${to.month}/${to.year}`)
              : delete values.TO;
            const index = oldExperienciaLaboral.findIndex(
              (item) => item.ID === editingObjectExperienciaLaboral.ID
            );
            oldExperienciaLaboral[index] = values;
            axios
              .post(`${apiRoute}/updateExperienciaLaboral.php`, {
                ID: userInfo.ID,
                EXPERIENCIA_LABORAL: oldExperienciaLaboral,
              })
              .then(({ data }) => {
                if (data.code === 200) {
                  setSecondaryInfo({
                    ...secondaryInfo,
                    EXPERIENCIA_LABORAL: JSON.stringify(oldExperienciaLaboral),
                  });
                  setModalsVisibility({ modalsVisibility, modal5Edit: false });
                  toast({
                    title: "Información actualizada",
                    description: "Cambios exitosos",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  setModalsVisibility({ modalsVisibility, modal5Edit: false });
                  toast({
                    title: "Ocurrio un error en la actualizacion",
                    description: "CIntentar mas tarde",
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
              isOpen={modalsVisibility.modal5Edit}
              onClose={() => {
                setModalsVisibility({ ...modalsVisibility, modal5Edit: false });
              }}
              size="xl"
            >
              <ModalOverlay />
              <ModalCloseButton />
              <ModalContent>
                <ModalHeader>Editar eperiencia laboral</ModalHeader>
                <ModalBody>
                  <Form id="modal5EditForm">
                    <div style={{ display: "flex", marginBottom: "1em" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          marginRight: "1em",
                        }}
                      >
                        <Field
                          onChange={handleChange}
                          value={values.EDITPUESTO}
                          name="EDITPUESTO"
                          placeholder="Puesto desempeñado"
                          style={{ marginBottom: "1em" }}
                        />
                        <Field
                          onChange={handleChange}
                          value={values.EDITEMPRESA}
                          name="EDITEMPRESA"
                          placeholder="Nombre de la empresa"
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{ fontSize: "0.7em", color: "gray" }}>
                            Desde:
                          </span>
                          <div style={{ marginBottom: "0.5em" }}>
                            <select
                              style={{ marginRight: "1em" }}
                              onChange={(e) => {
                                setFrom({ ...from, month: e.target.value });
                              }}
                              defaultValue={moment(
                                editingObjectExperienciaLaboral.FROM,
                                "MM/YYYY"
                              ).format("MM")}
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
                              style={{ marginRight: "1em" }}
                              onChange={(e) => {
                                setFrom({ ...from, year: e.target.value });
                              }}
                              defaultValue={moment(
                                editingObjectExperienciaLaboral.FROM,
                                "MM/YYYY"
                              ).format("YYYY")}
                            >
                              {years.map((key) => (
                                <option key={key} value={key}>
                                  {key}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {values.EDITSTILLINTHIS ? null : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: "0.5em",
                            }}
                          >
                            <span style={{ fontSize: "0.7em", color: "gray" }}>
                              Hasta:
                            </span>
                            <div>
                              <select
                                style={{ marginRight: "1em" }}
                                onChange={(e) => {
                                  setTo({ ...to, month: e.target.value });
                                }}
                                defaultValue={moment(
                                  editingObjectExperienciaLaboral.TO,
                                  "MM/YYYY"
                                ).format("MM")}
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
                                onChange={(e) => {
                                  setTo({ ...to, year: e.target.value });
                                }}
                                defaultValue={moment(
                                  editingObjectExperienciaLaboral.TO,
                                  "MM/YYYY"
                                ).format("YYYY")}
                              >
                                {years.map((key) => (
                                  <option key={key} value={key}>
                                    {key}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "0.5em" }}>
                            ¿Aún sigues en este empleo?
                          </span>
                          <input
                            type="checkbox"
                            name="EDITSTILLINTHIS"
                            onChange={handleChange}
                            defaultChecked={
                              editingObjectExperienciaLaboral.STILLINTHIS
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Field
                        style={{ width: "100%" }}
                        as="textarea"
                        onChange={handleChange}
                        value={values.EDITDESCRIPCION}
                        name="EDITDESCRIPCION"
                        maxLength={400}
                        rows={4}
                        maxrows={6}
                        placeholder="Descríbenos en qué consistía tu trabajo"
                      />
                      <span
                        style={{
                          marginLeft: "auto",
                          fontWeight: "bold",
                          fontSize: "0.8em",
                          color: "gray",
                        }}
                      >
                        {values.DESCRIPCION
                          ? `${values.DESCRIPCION.length}/400`
                          : null}
                      </span>
                    </div>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    style={{
                      backgroundColor: "#ff2400",
                      color: "white",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      deleteThisElement(editingObjectExperienciaLaboral);
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setModalsVisibility({
                        ...modalsVisibility,
                        modal5Edit: false,
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ECB83C" }}
                    form="modal5EditForm"
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Formik>
      );
    } else {
      return null;
    }
  }
);
const Modal6 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const educativeGrades = [
    {
      ID: 1,
      TITLE: "Secundaria",
      VALUE: "secundaria",
    },
    {
      ID: 2,
      TITLE: "Bachillerato",
      VALUE: "bachillerato",
    },
    {
      ID: 3,
      TITLE: "Técnico",
      VALUE: "tecnico",
    },
    {
      ID: 4,
      TITLE: "Licenciatura",
      VALUE: "licenciatura",
    },
    {
      ID: 5,
      TITLE: "Ingeniería",
      VALUE: "ingenieria",
    },
    {
      ID: 6,
      TITLE: "Diplomado",
      VALUE: "diplomado",
    },
    {
      ID: 7,
      TITLE: "Maestría",
      VALUE: "maestria",
    },
    {
      ID: 8,
      TITLE: "Doctorado",
      VALUE: "doctorado",
    },
  ];
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    TITULO: Yup.string().required(),
    INSTITUCION: Yup.string().required(),
    GRADO: Yup.string().required(),
  });
  // context
  const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  // states
  const [years, setYears] = React.useState([]);
  const [from, setFrom] = React.useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  const [to, setTo] = React.useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  // effects
  React.useEffect(() => {
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
  }, []);
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        TITULO: "",
        INSTITUCION: "",
        GRADO: "",
        STILLINTHIS: false,
      }}
      onSubmit={(values, formikBag) => {
        let newGradoEducativo;
        let newgrado = JSON.parse(values.GRADO).VALUE;
        values.GRADO = newgrado;
        values.FROM = `${from.month}/${from.year}`;
        !values.STILLINTHIS
          ? (values.TO = `${to.month}/${to.year}`)
          : delete values.TO;
        if (secondaryInfo.GRADO_EDUCATIVO) {
          newGradoEducativo = JSON.parse(secondaryInfo.GRADO_EDUCATIVO);
          if (newGradoEducativo.length === 0) {
            values.ID = 1;
          } else {
            values.ID = newGradoEducativo.slice(-1).pop().ID + 1;
          }
          newGradoEducativo.push(values);
        } else {
          values.ID = 1;
          newGradoEducativo = [];
          newGradoEducativo.push(values);
        }
        axios
          .post(`${apiRoute}/updateGradoEducativo.php`, {
            ID: userInfo.ID,
            GRADO_EDUCATIVO: newGradoEducativo,
          })
          .then(({ data }) => {
            if (data.code === 200) {
              let arraysito;
              if (secondaryInfo.GRADO_EDUCATIVO) {
                arraysito = JSON.parse(secondaryInfo.GRADO_EDUCATIVO);
                arraysito.push(values);
                setSecondaryInfo({
                  ...secondaryInfo,
                  GRADO_EDUCATIVO: JSON.stringify(arraysito),
                });
              } else {
                arraysito = [];
                arraysito.push(values);
                setSecondaryInfo({
                  ...secondaryInfo,
                  GRADO_EDUCATIVO: JSON.stringify(arraysito),
                });
              }
              setModalsVisibility({ modalsVisibility, modal6: false });
              toast({
                title: "Información actualizada",
                description: "Cambios exitosos",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              formikBag.resetForm({
                PUESTO: "",
                EMPRESA: "",
                DESCRIPCION: "",
                STILLINTHIS: false,
              });
            } else {
              setModalsVisibility({ modalsVisibility, modal6: false });
              toast({
                title: "Ocurrio un error en la actualizacion",
                description: "CIntentar mas tarde",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .catch((error) => console.log(error));
      }}
    >
      {({ values, handleChange, errors, resetForm }) => (
        <Modal
          isOpen={modalsVisibility.modal6}
          onClose={() => {
            setModalsVisibility({ ...modalsVisibility, modal6: false });
            resetForm({
              TITULO: "",
              INSTITUCION: "",
              GRADO: "",
              STILLINTHIS: false,
            });
          }}
          size="xl"
        >
          <ModalOverlay />
          <ModalCloseButton />
          <ModalContent>
            <ModalHeader>Grado educativo</ModalHeader>
            <ModalBody>
              <Form id="modal6Form">
                <div style={{ display: "flex", marginBottom: "1em" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      marginRight: "1em",
                    }}
                  >
                    {errors.TITULO ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                    <Field
                      onChange={handleChange}
                      value={values.TITULO}
                      name="TITULO"
                      placeholder="Título"
                      style={{ marginBottom: "1em" }}
                    />
                    {errors.INSTITUCION ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                    <Field
                      onChange={handleChange}
                      value={values.INSTITUCION}
                      name="INSTITUCION"
                      placeholder="Institución"
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.7em", color: "gray" }}>
                        Desde:
                      </span>
                      <div style={{ marginBottom: "0.5em" }}>
                        <select
                          style={{ marginRight: "1em" }}
                          onChange={(e) => {
                            setFrom({ ...from, month: e.target.value });
                          }}
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
                          style={{ marginRight: "1em" }}
                          onChange={(e) => {
                            setFrom({ ...from, year: e.target.value });
                          }}
                        >
                          {years.map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {values.STILLINTHIS ? null : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "0.5em",
                        }}
                      >
                        <span style={{ fontSize: "0.7em", color: "gray" }}>
                          Hasta:
                        </span>
                        <div>
                          <select
                            style={{ marginRight: "1em" }}
                            onChange={(e) => {
                              setTo({ ...to, month: e.target.value });
                            }}
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
                            onChange={(e) => {
                              setTo({ ...to, year: e.target.value });
                            }}
                          >
                            {years.map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "0.5em" }}>
                        ¿Aún sigues estudiando aquí?
                      </span>
                      <input
                        type="checkbox"
                        name="STILLINTHIS"
                        onChange={handleChange}
                        value={values.STILLINTHIS}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {errors.GRADO ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : null}
                  <select
                    style={{ width: "50%" }}
                    onChange={handleChange}
                    value={values.GRADO}
                    name="GRADO"
                    placeholder="Grado educativo"
                  >
                    <option value="" disabled>
                      Grado educativo
                    </option>
                    {educativeGrades.map((key) => (
                      <option key={key.ID} value={JSON.stringify(key)}>
                        {key.TITLE}
                      </option>
                    ))}
                  </select>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setModalsVisibility({
                    ...modalsVisibility,
                    modal6: false,
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#ECB83C" }}
                form="modal6Form"
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
});
const Modal6Edit = React.memo(
  ({ modalsVisibility, setModalsVisibility, editingObjectGradoEducativo }) => {
    const educativeGrades = [
      {
        ID: 1,
        TITLE: "Secundaria",
        VALUE: "secundaria",
      },
      {
        ID: 2,
        TITLE: "Bachillerato",
        VALUE: "bachillerato",
      },
      {
        ID: 3,
        TITLE: "Técnico",
        VALUE: "tecnico",
      },
      {
        ID: 4,
        TITLE: "Licenciatura",
        VALUE: "licenciatura",
      },
      {
        ID: 5,
        TITLE: "Ingeniería",
        VALUE: "ingenieria",
      },
      {
        ID: 6,
        TITLE: "Diplomado",
        VALUE: "diplomado",
      },
      {
        ID: 7,
        TITLE: "Maestría",
        VALUE: "maestria",
      },
      {
        ID: 8,
        TITLE: "Doctorado",
        VALUE: "doctorado",
      },
    ];
    const toast = useToast();
    const validationSchema = Yup.object().shape({
      EDITTITULO: Yup.string().required(),
      EDITINSTITUCION: Yup.string().required(),
      EDITGRADO: Yup.string().required(),
    });
    // context
    const { userInfoState, secondaryInfoState } = React.useContext(MainContext);
    const [userInfo] = userInfoState;
    const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
    // states
    const [years, setYears] = React.useState([]);
    const [from, setFrom] = React.useState({
      month: "01",
      year: moment(new Date()).format("YYYY"),
    });
    const [to, setTo] = React.useState({
      month: "01",
      year: moment(new Date()).format("YYYY"),
    });
    // functions
    const deleteThisElement = (key) => {
      let prevArray = [...JSON.parse(secondaryInfo.GRADO_EDUCATIVO)];
      let newArray = prevArray.filter((item) => item.ID !== key.ID);
      axios
        .post(`${apiRoute}/updateGradoEducativo.php`, {
          GRADO_EDUCATIVO: newArray,
          ID: userInfo.ID,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            setSecondaryInfo({
              ...secondaryInfo,
              GRADO_EDUCATIVO: JSON.stringify(newArray),
            });
            setModalsVisibility({ modalsVisibility, modal6Edit: false });
            toast({
              title: "Información actualizada",
              description: "Cambios exitosos",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            setModalsVisibility({ modalsVisibility, modal6Edit: false });
            toast({
              title: "Ocurrio un error en la actualizacion",
              description: "CIntentar mas tarde",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((error) => console.log(error));
    };
    // effects
    React.useEffect(() => {
      let years = [];
      let limit = moment(new Date()).year() - 80;
      for (let i = moment(new Date()).year(); i > limit; i--) {
        years.push(i);
      }
      setYears(years);
    }, []);
    if (Object.values(editingObjectGradoEducativo).length !== 0) {
      return (
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            EDITTITULO: editingObjectGradoEducativo.TITULO,
            EDITINSTITUCION: editingObjectGradoEducativo.INSTITUCION,
            EDITGRADO: editingObjectGradoEducativo.GRADO,
            EDITSTILLINTHIS: editingObjectGradoEducativo.STILLINTHIS,
          }}
          onSubmit={(values) => {
            values.TITULO = values.EDITTITULO;
            delete values.EDITTITULO;
            values.INSTITUCION = values.EDITINSTITUCION;
            delete values.EDITINSTITUCION;
            values.GRADO = values.EDITGRADO;
            delete values.EDITGRADO;
            values.STILLINTHIS = values.EDITSTILLINTHIS;
            delete values.EDITSTILLINTHIS;
            if (editingObjectGradoEducativo.GRADO !== values.GRADO) {
              let newgrado = JSON.parse(values.GRADO).VALUE;
              values.GRADO = newgrado;
            }
            values.FROM = `${from.month}/${from.year}`;
            !values.STILLINTHIS
              ? (values.TO = `${to.month}/${to.year}`)
              : delete values.TO;
            let oldGradoEducativo = [
              ...JSON.parse(secondaryInfo.GRADO_EDUCATIVO),
            ];
            values.ID = editingObjectGradoEducativo.ID;
            const index = oldGradoEducativo.findIndex(
              (item) => item.ID === editingObjectGradoEducativo.ID
            );
            oldGradoEducativo[index] = values;
            axios
              .post(`${apiRoute}/updateGradoEducativo.php`, {
                ID: userInfo.ID,
                GRADO_EDUCATIVO: oldGradoEducativo,
              })
              .then(({ data }) => {
                if (data.code === 200) {
                  setSecondaryInfo({
                    ...secondaryInfo,
                    GRADO_EDUCATIVO: JSON.stringify(oldGradoEducativo),
                  });
                  setModalsVisibility({ modalsVisibility, modal6Edit: false });
                  toast({
                    title: "Información actualizada",
                    description: "Cambios exitosos",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  setModalsVisibility({ modalsVisibility, modal6Edit: false });
                  toast({
                    title: "Ocurrio un error en la actualizacion",
                    description: "CIntentar mas tarde",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              })
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleChange, errors, resetForm }) => (
            <Modal
              isOpen={modalsVisibility.modal6Edit}
              onClose={() => {
                setModalsVisibility({ ...modalsVisibility, modal6Edit: false });
                resetForm({
                  EDITTITULO: "",
                  EDITINSTITUCION: "",
                  EDITGRADO: "",
                  EDITSTILLINTHIS: false,
                });
              }}
              size="xl"
            >
              <ModalOverlay />
              <ModalCloseButton />
              <ModalContent>
                <ModalHeader>Editar grado educativo</ModalHeader>
                <ModalBody>
                  <Form id="modal6EditForm">
                    <div style={{ display: "flex", marginBottom: "1em" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          marginRight: "1em",
                        }}
                      >
                        {errors.EDITTITULO ? (
                          <span style={{ color: "red" }}>*</span>
                        ) : null}
                        <Field
                          onChange={handleChange}
                          value={values.EDITTITULO}
                          name="EDITTITULO"
                          placeholder="Título"
                          style={{ marginBottom: "1em" }}
                        />
                        {errors.EDITINSTITUCION ? (
                          <span style={{ color: "red" }}>*</span>
                        ) : null}
                        <Field
                          onChange={handleChange}
                          value={values.EDITINSTITUCION}
                          name="EDITINSTITUCION"
                          placeholder="Institución"
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span style={{ fontSize: "0.7em", color: "gray" }}>
                            Desde:
                          </span>
                          <div style={{ marginBottom: "0.5em" }}>
                            <select
                              style={{ marginRight: "1em" }}
                              onChange={(e) => {
                                setFrom({ ...from, month: e.target.value });
                              }}
                              defaultValue={moment(
                                editingObjectGradoEducativo.FROM,
                                "MM/YYYY"
                              ).format("MM")}
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
                              style={{ marginRight: "1em" }}
                              onChange={(e) => {
                                setFrom({ ...from, year: e.target.value });
                              }}
                              defaultValue={moment(
                                editingObjectGradoEducativo.FROM,
                                "MM/YYYY"
                              ).format("YYYY")}
                            >
                              {years.map((key) => (
                                <option key={key} value={key}>
                                  {key}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {values.EDITSTILLINTHIS ? null : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: "0.5em",
                            }}
                          >
                            <span style={{ fontSize: "0.7em", color: "gray" }}>
                              Hasta:
                            </span>
                            <div>
                              <select
                                style={{ marginRight: "1em" }}
                                onChange={(e) => {
                                  setTo({ ...to, month: e.target.value });
                                }}
                                defaultValue={moment(
                                  editingObjectGradoEducativo.TO,
                                  "MM/YYYY"
                                ).format("MM")}
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
                                onChange={(e) => {
                                  setTo({ ...to, year: e.target.value });
                                }}
                                defaultValue={moment(
                                  editingObjectGradoEducativo.TO,
                                  "MM/YYYY"
                                ).format("YYYY")}
                              >
                                {years.map((key) => (
                                  <option key={key} value={key}>
                                    {key}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "0.5em" }}>
                            ¿Aún sigues estudiando aquí?
                          </span>
                          <input
                            type="checkbox"
                            name="EDITSTILLINTHIS"
                            onChange={handleChange}
                            defaultChecked={
                              editingObjectGradoEducativo.STILLINTHIS
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {errors.EDITGRADO ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : null}
                      <select
                        style={{ width: "50%" }}
                        onChange={handleChange}
                        value={values.EDITGRADO}
                        name="EDITGRADO"
                        placeholder="Grado educativo"
                      >
                        <option value="" disabled>
                          Grado educativo
                        </option>
                        {educativeGrades.map((key) => (
                          <option key={key.ID} value={JSON.stringify(key)}>
                            {key.TITLE}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    style={{
                      backgroundColor: "#ff2400",
                      color: "white",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      deleteThisElement(editingObjectGradoEducativo);
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setModalsVisibility({
                        ...modalsVisibility,
                        modal6Edit: false,
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ECB83C" }}
                    form="modal6EditForm"
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Formik>
      );
    } else {
      return null;
    }
  }
);
const Modal7 = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const toast = useToast();
  // context
  const { secondaryInfoState, userInfoState } = React.useContext(MainContext);
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [userInfo] = userInfoState;
  const validationSchema = Yup.object().shape({
    TITULO: Yup.string().required(),
    TIPO: Yup.string().required(),
    DESCRIPTION: Yup.string().required(),
  });
  // states
  const [years, setYears] = React.useState([]);
  // effects
  React.useEffect(() => {
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
  }, []);
  return (
    <Formik
      initialValues={{
        TITULO: "",
        TIPO: "",
        YEAR: "",
        NOTAQUIRED: false,
        DESCRIPTION: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, formikBag) => {
        let newCursosCertificaciones;
        // year resolution
        values.NOTAQUIRED
          ? delete values.YEAR
          : (values.YEAR = values.YEAR
              ? values.YEAR
              : moment(new Date()).format("YYYY"));
        // secondaryInfo.CURSOS_CERTIFICACIONS array logic
        if (secondaryInfo.CURSOS_CERTIFICACIONES) {
          newCursosCertificaciones = JSON.parse(
            secondaryInfo.CURSOS_CERTIFICACIONES
          );
          if (newCursosCertificaciones.length === 0) {
            values.ID = 1;
          } else {
            values.ID = newCursosCertificaciones.slice(-1).pop().ID + 1;
          }
          newCursosCertificaciones.push(values);
        } else {
          values.ID = 1;
          newCursosCertificaciones = [];
          newCursosCertificaciones.push(values);
        }
        axios
          .post(`${apiRoute}/updateCursosCertificaciones.php`, {
            ID: userInfo.ID,
            CURSOS_CERTIFICACIONES: newCursosCertificaciones,
          })
          .then(({ data }) => {
            if (data.code === 200) {
              let arraysito;
              if (secondaryInfo.CURSOS_CERTIFICACIONES) {
                arraysito = JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES);
                arraysito.push(values);
                setSecondaryInfo({
                  ...secondaryInfo,
                  CURSOS_CERTIFICACIONES: JSON.stringify(arraysito),
                });
              } else {
                arraysito = [];
                arraysito.push(values);
                setSecondaryInfo({
                  ...secondaryInfo,
                  CURSOS_CERTIFICACIONES: JSON.stringify(arraysito),
                });
              }
              setModalsVisibility({ modalsVisibility, modal7: false });
              toast({
                title: "Información actualizada",
                description: "Cambios exitosos",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              formikBag.resetForm({
                TITULO: "",
                TIPO: "",
                YEAR: "",
                NOTAQUIRED: false,
                DESCRIPTION: "",
              });
            } else {
              setModalsVisibility({ modalsVisibility, modal7: false });
              toast({
                title: "Ocurrio un error en la actualizacion",
                description: "CIntentar mas tarde",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .catch((error) => console.log(error));
        console.log(newCursosCertificaciones);
      }}
    >
      {({ values, handleChange, errors }) => (
        <Modal isOpen={modalsVisibility.modal7} size="md">
          <ModalOverlay />
          <ModalCloseButton />
          <ModalContent>
            <ModalHeader>Cursos y certificaciones</ModalHeader>
            <ModalBody>
              <Form id="modal7Form">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "1em",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "1em",
                    }}
                  >
                    {errors.TITULO ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                    <Field
                      placeholder="Título"
                      name="TITULO"
                      value={values.TITULO}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {errors.TIPO ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                    <Field
                      placeholder="Tipo de certificación"
                      name="TIPO"
                      value={values.TIPO}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {values.NOTAQUIRED ? null : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "1em",
                      }}
                    >
                      {errors.YEAR ? (
                        <span style={{ color: "#ff2400" }}>*</span>
                      ) : null}
                      <select
                        name="YEAR"
                        onChange={handleChange}
                        value={values.YEAR}
                      >
                        <option value="" disabled>
                          Año
                        </option>
                        {years.map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      name="NOTAQUIRED"
                      onChange={handleChange}
                    />
                    <span style={{ marginLeft: "0.5em" }}>
                      ¿Aún no adquieres este certificado?
                    </span>
                  </div>
                </div>
                {errors.DESCRIPTION ? (
                  <span style={{ color: "#ff2400" }}>*</span>
                ) : null}
                <Field
                  value={values.DESCRIPTION}
                  name="DESCRIPTION"
                  onChange={handleChange}
                  as="textarea"
                  rows={4}
                  maxrows={6}
                  style={{ width: "100%", marginTop: "1em" }}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setModalsVisibility({
                    ...modalsVisibility,
                    modal7: false,
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#ECB83C" }}
                form="modal7Form"
              >
                Agregar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
});
const Modal7Edit = React.memo(
  ({
    modalsVisibility,
    setModalsVisibility,
    editingObjectCursosCertificaciones,
  }) => {
    const toast = useToast();
    // context
    const { secondaryInfoState, userInfoState } = React.useContext(MainContext);
    const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
    const [userInfo] = userInfoState;
    const validationSchema = Yup.object().shape({
      EDITTITULO: Yup.string().required(),
      EDITTIPO: Yup.string().required(),
      EDITDESCRIPTION: Yup.string().required(),
    });
    // states
    const [years, setYears] = React.useState([]);
    // functions
    const deleteThisElement = (key) => {
      let prevArray = [...JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES)];
      let newArray = prevArray.filter((item) => item.ID !== key.ID);
      axios
        .post(`${apiRoute}/updateCursosCertificaciones.php`, {
          CURSOS_CERTIFICACIONES: newArray,
          ID: userInfo.ID,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            setSecondaryInfo({
              ...secondaryInfo,
              CURSOS_CERTIFICACIONES: JSON.stringify(newArray),
            });
            setModalsVisibility({ modalsVisibility, modal7Edit: false });
            toast({
              title: "Información actualizada",
              description: "Cambios exitosos",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            setModalsVisibility({ modalsVisibility, modal7Edit: false });
            toast({
              title: "Ocurrio un error en la actualizacion",
              description: "CIntentar mas tarde",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((error) => console.log(error));
    };
    // effects
    React.useEffect(() => {
      let years = [];
      let limit = moment(new Date()).year() - 80;
      for (let i = moment(new Date()).year(); i > limit; i--) {
        years.push(i);
      }
      setYears(years);
    }, []);
    if (Object.values(editingObjectCursosCertificaciones).length !== 0) {
      return (
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            EDITTITULO: editingObjectCursosCertificaciones.TITULO,
            EDITTIPO: editingObjectCursosCertificaciones.TIPO,
            EDITYEAR: editingObjectCursosCertificaciones.YEAR,
            EDITNOTAQUIRED: editingObjectCursosCertificaciones.NOTAQUIRED,
            EDITDESCRIPTION: editingObjectCursosCertificaciones.DESCRIPTION,
          }}
          onSubmit={(values) => {
            let newObj = {
              TITULO: values.EDITTITULO,
              TIPO: values.EDITTIPO,
              YEAR: values.EDITYEAR,
              NOTAQUIRED: values.EDITNOTAQUIRED,
              DESCRIPTION: values.EDITDESCRIPTION,
            };
            // year resolution
            values.EDITNOTAQUIRED
              ? delete newObj.YEAR
              : (newObj.YEAR = values.EDITYEAR
                  ? values.EDITYEAR
                  : moment(new Date()).format("YYYY"));
            newObj.ID = editingObjectCursosCertificaciones.ID;
            let oldCursosCertificaciones = [
              ...JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES),
            ];
            const index = oldCursosCertificaciones.findIndex(
              (item) => item.ID === editingObjectCursosCertificaciones.ID
            );
            oldCursosCertificaciones[index] = newObj;
            axios
              .post(`${apiRoute}/updateCursosCertificaciones.php`, {
                ID: userInfo.ID,
                CURSOS_CERTIFICACIONES: oldCursosCertificaciones,
              })
              .then(({ data }) => {
                if (data.code === 200) {
                  setSecondaryInfo({
                    ...secondaryInfo,
                    CURSOS_CERTIFICACIONES: JSON.stringify(
                      oldCursosCertificaciones
                    ),
                  });
                  setModalsVisibility({ modalsVisibility, modal7Edit: false });
                  toast({
                    title: "Información actualizada",
                    description: "Cambios exitosos",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  setModalsVisibility({ modalsVisibility, modal7Edit: false });
                  toast({
                    title: "Ocurrio un error en la actualizacion",
                    description: "CIntentar mas tarde",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              })
              .catch((error) => console.log(error));
          }}
        >
          {({ values, handleChange, errors }) => (
            <Modal isOpen={modalsVisibility.modal7Edit}>
              <ModalOverlay />
              <ModalCloseButton />
              <ModalContent>
                <ModalHeader>Editar cursos y certificaciones</ModalHeader>
                <ModalBody>
                  <Form id="modal7EditForm">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1em",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "1em",
                        }}
                      >
                        {errors.EDITTITULO ? (
                          <span style={{ color: "red" }}>*</span>
                        ) : null}
                        <Field
                          placeholder="Título"
                          name="EDITTITULO"
                          value={values.EDITTITULO}
                          onChange={handleChange}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {errors.EDITTIPO ? (
                          <span style={{ color: "red" }}>*</span>
                        ) : null}
                        <Field
                          placeholder="Tipo de certificación"
                          name="EDITTIPO"
                          value={values.EDITTIPO}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {values.EDITNOTAQUIRED ? null : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginRight: "1em",
                          }}
                        >
                          <select
                            name="EDITYEAR"
                            onChange={handleChange}
                            value={values.EDITYEAR}
                          >
                            <option value="" disabled>
                              Año
                            </option>
                            {years.map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="checkbox"
                          name="EDITNOTAQUIRED"
                          onChange={handleChange}
                          defaultChecked={
                            editingObjectCursosCertificaciones.NOTAQUIRED
                          }
                        />
                        <span style={{ marginLeft: "0.5em" }}>
                          ¿Aún no adquieres este certificado?
                        </span>
                      </div>
                    </div>
                    <Field
                      value={values.EDITDESCRIPTION}
                      name="EDITDESCRIPTION"
                      onChange={handleChange}
                      as="textarea"
                      rows={4}
                      maxrows={6}
                      style={{ width: "100%", marginTop: "1em" }}
                    />
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    style={{
                      backgroundColor: "#ff2400",
                      color: "white",
                      marginRight: "auto",
                    }}
                    onClick={() => {
                      deleteThisElement(editingObjectCursosCertificaciones);
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setModalsVisibility({
                        ...modalsVisibility,
                        modal7Edit: false,
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#ECB83C" }}
                    form="modal7EditForm"
                  >
                    Actualizar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Formik>
      );
    } else {
      return null;
    }
  }
);
const CVModal = React.memo(({ modalsVisibility, setModalsVisibility }) => {
  const { secondaryInfoState, userInfoState } = React.useContext(MainContext);
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [userInfo] = userInfoState;
  return (
    <Modal
      size="6xl"
      isOpen={modalsVisibility.CVmodal}
      onClose={() => {
        setModalsVisibility({ ...modalsVisibility, CVmodal: false });
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <div
          style={{
            position: "absolute",
            left: "2em",
            top: "2em",
            display: "flex",
          }}
        >
          <button
            style={{
              backgroundColor: "white",
              padding: "1em",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              borderRadius: "5em",
              marginRight: "1em",
            }}
            onClick={() => {
              setModalsVisibility({ ...modalsVisibility, CVmodal: false });
            }}
          >
            <Close />
          </button>
          <button
            style={{
              backgroundColor: "white",
              padding: "1em",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              borderRadius: "5em",
            }}
          >
            <CloudDownload />
          </button>
        </div>

        <CVModalComponent userInfo={userInfo} secondaryInfo={secondaryInfo} />
        {/* <PDFViewer>
          <CVpdf secondaryInfo={secondaryInfo} userInfo={userInfo} />
        </PDFViewer> */}
      </ModalContent>
    </Modal>
  );
});
export default Datos;
