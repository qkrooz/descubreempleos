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
import { Add, Close, CloudDownload, Edit, Person } from "@material-ui/icons";
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
// modals
import { Modal1 } from "../components/Modals/";
// styles
import style from "../../../styles/datos.module.css";
const Datos = React.memo(() => {
  const toast = useToast();
  // states
  const [modalVisibility, setModalVisibility] = React.useState({
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
  const [userImageError, setUserImageError] = React.useState(true);
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
              {userImageError ? (
                <div className={style.userImageErrorIcon}>
                  <Person style={{ fontSize: "5em" }} />
                </div>
              ) : (
                <img
                  src={`${userInfo.IMAGE_URL}?v=${Date.now()}`}
                  onError={() => {}}
                />
              )}
            </div>
            <span
              className={style.personalLabel}
            >{`${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME}`}</span>
            <span className={style.userTitle}>
              {secondaryInfo.TITULO ? (
                secondaryInfo.TITULO
              ) : (
                <Badge>titulo no disponible</Badge>
              )}
            </span>
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
                  <Td>
                    {userInfo.AGE ? (
                      userInfo.AGE + " años"
                    ) : (
                      <Badge>no disponible</Badge>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Género</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.GENRE ? (
                      userInfo.GENRE
                    ) : (
                      <Badge>no disponible</Badge>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Teléfono</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.TEL_NUMBER ? (
                      userInfo.TEL_NUMBER
                    ) : (
                      <Badge>no disponible</Badge>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Estado</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.STATE ? (
                      userInfo.STATE
                    ) : (
                      <Badge>no disponible</Badge>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Ciudad</Td>
                  <Td style={{ textTransform: "capitalize" }}>
                    {userInfo.CITY ? (
                      userInfo.CITY
                    ) : (
                      <Badge>no disponible</Badge>
                    )}
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
                    <Badge key={key.ID} mb={5}>
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
        modalVisibility={modalsVisibility.modal1}
        setModalVisibility={setModalVisibility}
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
      border="1px"
      borderColor="#ebebeb"
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
      border="1px"
      borderColor="#ebebeb"
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

export default Datos;
