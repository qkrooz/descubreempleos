import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Switch,
  Table,
  Tbody,
  Tr,
  Td,
  Badge,
  useToast,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import moment from "moment";
import { Add, Delete, Edit, MoreVert, Person } from "@material-ui/icons";
import { MainContext } from "../resources/MainContext";
import axios from "axios";
import apiRoute from "../resources/apiRoute";
import { PDFViewer } from "@react-pdf/renderer";
// components
import Footer from "../components/Footer";
import CVpdf from "../components/CVpdf";
import CVModalComponent from "../components/CVmodal";
// modals
import { CustomModal } from "../components/Modals";
// styles
import style from "../../../styles/datos.module.css";
const DatosContext = React.createContext();
const Datos = React.memo(() => {
  const toast = useToast();
  // states
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);
  const [disponibleState, setDisponibleState] = useState();
  const [userImageError, setUserImageError] = useState(false);
  const [workingOrder, setWorkingOrder] = useState({});
  const [editionModals, setEditionModals] = useState({
    workingExperience: false,
  });
  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
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
          });
          let secondaryInfoCopy = { ...secondaryInfo };
          secondaryInfoCopy.DISPONIBLE = data.current.toString();
          setSecondaryInfo(secondaryInfoCopy);
          setDisponibleState(!Boolean(disponibleState));
        } else {
          toast({
            title: "Ocurrió un error",
            description: "No se ha podido actualizar tu disponibilidad.",
            status: "warning",
            duration: 3000,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <DatosContext.Provider
      value={{
        workingOrderState: [workingOrder, setWorkingOrder],
        editionModalsState: [editionModals, setEditionModals],
      }}
    >
      <div className={style.container}>
        <div className={style.left}>
          <Card
            onClick={() => {
              setModalContent(0);
              setModal(!modal);
            }}
          >
            {userImageError ? (
              <div className={style.userImage}>
                <div className={style.userImageErrorIcon}>
                  <Person style={{ fontSize: "5em" }} />
                </div>
              </div>
            ) : (
              <div className={style.userImage}>
                <img
                  src={`${userInfo.IMAGE_URL}?v=${Date.now()}`}
                  style={{
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  onError={() => {
                    setUserImageError(true);
                  }}
                />
              </div>
            )}
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
              setModalContent(1);
              setModal(!modal);
            }}
          >
            <Table variant="simple" borderBottom="0px">
              <Tbody>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Edad</Td>
                  <Td>
                    {parseInt(userInfo.AGE) ? (
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
                    {parseInt(userInfo.TEL_NUMBER) ? (
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
                      JSON.parse(secondaryInfo.IDIOMAS).length !== 0 ? (
                        JSON.parse(secondaryInfo.IDIOMAS).map((key) => (
                          <Badge
                            key={key.ID}
                            mb={
                              JSON.parse(secondaryInfo.IDIOMAS).length > 2
                                ? 2
                                : 0
                            }
                          >
                            {key.TITLE}
                          </Badge>
                        ))
                      ) : (
                        <Badge>No disponible</Badge>
                      )
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
              setModalContent(2);
              setModal(!modal);
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
              setModalContent(3);
              setModal(!modal);
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
              setModalContent(4);
              setModal(!modal);
            }}
            RenderItem={ExperienciLaboralItem}
          />
          <Card2
            title="Grado Educativo"
            data={secondaryInfo.GRADO_EDUCATIVO}
            onClick={() => {
              setModalContent(5);
              setModal(!modal);
            }}
          />
          <Card2
            title="Cursos y certificaciones"
            data={secondaryInfo.CURSOS_CERTIFICACIONES}
            onClick={() => {
              setModalContent(6);
              setModal(!modal);
            }}
          />
        </div>
      </div>
      <CustomModal
        hook={{
          modalState: [modal, setModal],
        }}
        content={modalContent}
      />
      <ExperienciaLaboralEdition />
      <Footer />
    </DatosContext.Provider>
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
const Card2 = React.memo(({ props, title, data, onClick, RenderItem }) => {
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
          JSON.parse(data).length !== 0 ? (
            JSON.parse(data).map((key) => (
              <RenderItem key={key.ID} data={key} />
            ))
          ) : (
            <div className={style.noData}>
              <span>Aún no has agregado ningún campo.</span>
              <span>
                Aumenta tus posibilidades de éxito agregando experiencia en este
                campo.
              </span>
            </div>
          )
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
const ExperienciLaboralItem = React.memo(({ data }) => {
  const toast = useToast();
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const { workingOrderState, editionModalsState } = useContext(DatosContext);
  const [, setWorkingOrder] = workingOrderState;
  const [editionModals, setEditionModals] = editionModalsState;
  const [alertDialogVis, setAlertDialogVis] = useState(false);
  const DeleteFromExperienciaLaboral = (data) => {
    const experienciaLaboralCopy = [
      ...JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL),
    ];
    const newArray = experienciaLaboralCopy.filter(
      (item) => item.ID !== data.ID
    );
    axios
      .post(`${apiRoute}/updateExperienciaLaboral.php`, {
        ID: userInfo.ID,
        EXPERIENCIA_LABORAL: JSON.stringify(newArray),
      })
      .then(({ data }) => {
        if (data.code === 200) {
          setSecondaryInfo({
            ...secondaryInfo,
            EXPERIENCIA_LABORAL: JSON.stringify(newArray),
          });
          toast({
            title: "Información actualizada",
            description: "Has actualizado tu experiencia laboral",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Ocurrió un error",
            description: "Por favor intente más tarde",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        if (error)
          toast({
            title: "Ocurrió un error",
            description: "Por favor intente más tarde",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      });
  };
  return (
    <>
      <Flex direction="column" w="100%" borderBottom="1px solid black">
        <Flex justify="space-between">
          <Text fontWeight="bold" mt={4}>
            {data.PUESTO}
          </Text>
          <Menu>
            <MenuButton as="button">
              <MoreVert style={{ fontSize: "1.2em", color: "gray" }} />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<Edit />}
                onClick={() => {
                  setEditionModals({
                    ...editionModals,
                    workingExperience: true,
                  });
                  setWorkingOrder(data);
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                icon={<Delete />}
                onClick={() => {
                  setAlertDialogVis(true);
                }}
                color="red"
              >
                Eliminar
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex justify="space-between">
          <Text>{data.EMPRESA}</Text>
          <Text fontSize="0.9em" color="gray">
            {data.STILL
              ? `Desde ${data.FECHA_INICIO}`
              : `Desde ${data.FECHA_INICIO} hasta ${data.FECHA_FIN}`}
          </Text>
        </Flex>
        <Text fontSize="0.9em" mb={4}>
          {data.DESCRIPCION}
        </Text>
      </Flex>
      <AlertDialog isOpen={alertDialogVis}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ¿Eliminar este registro?
          </AlertDialogHeader>
          <AlertDialogBody>Esta acción no se puede deshacer</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setAlertDialogVis(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                DeleteFromExperienciaLaboral(data);
              }}
              ml={3}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
const ExperienciaLaboralEdition = React.memo(() => {
  const toast = useToast();
  const { secondaryInfoState, userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryinfo, setSecondaryInfo] = secondaryInfoState;
  const { editionModalsState, workingOrderState } = useContext(DatosContext);
  const [workingOrder, setWorkingOrder] = workingOrderState;
  const [editionModals, setEditionModals] = editionModalsState;
  const [years, setYears] = useState([]);
  const [from, setFrom] = useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  const [to, setTo] = useState({
    month: "01",
    year: moment(new Date()).format("YYYY"),
  });
  const onClose = () => {
    setWorkingOrder({});
    setEditionModals({ ...editionModals, workingExperience: false });
  };
  useEffect(() => {
    let years = [];
    let limit = moment(new Date()).year() - 80;
    for (let i = moment(new Date()).year(); i > limit; i--) {
      years.push(i);
    }
    setYears(years);
  }, []);
  useEffect(() => {
    if (Object.values(workingOrder).length !== 0) {
      setFrom({
        ...from,
        month: workingOrder.FECHA_INICIO.split("/")[0],
        year: workingOrder.FECHA_INICIO.split("/")[1],
      });
      if (!workingOrder.STILL) {
        setTo({
          ...to,
          month: workingOrder.FECHA_FIN.split("/")[0],
          year: workingOrder.FECHA_FIN.split("/")[1],
        });
      }
    }
  }, [workingOrder, editionModals.workingExperience]);
  return (
    <Modal isOpen={editionModals.workingExperience} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar experiencia laboral</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              PUESTO: workingOrder.PUESTO,
              EMPRESA: workingOrder.EMPRESA,
              DESCRIPCION: workingOrder.DESCRIPCION,
              STILL: workingOrder.STILL,
              FECHA_INICIO: `${from.month}/${from.year}`,
              FECHA_FIN: `${to.month}/${to.year}`,
            }}
            onSubmit={(values) => {
              values.FECHA_INICIO = `${from.month}/${from.year}`;
              if (values.STILL) {
                delete values.FECHA_FIN;
              } else {
                values.FECHA_FIN = `${to.month}/${to.year}`;
              }
              values.ID = workingOrder.ID;

              const workExperienceCompleteCopy = [
                ...JSON.parse(secondaryinfo.EXPERIENCIA_LABORAL),
              ];
              const indexOfEditedElement = workExperienceCompleteCopy.findIndex(
                (item) => item.ID === workingOrder.ID
              );
              workExperienceCompleteCopy[indexOfEditedElement] = values;
              axios
                .post(`${apiRoute}/updateExperienciaLaboral.php`, {
                  ID: userInfo.ID,
                  EXPERIENCIA_LABORAL: JSON.stringify(
                    workExperienceCompleteCopy
                  ),
                })
                .then(({ data }) => {
                  console.log(data);
                  if (data.code === 200) {
                    setSecondaryInfo({
                      ...secondaryinfo,
                      EXPERIENCIA_LABORAL: JSON.stringify(
                        workExperienceCompleteCopy
                      ),
                    });
                    toast({
                      title: "Información actualizada",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                    setEditionModals({
                      ...editionModals,
                      workingExperience: false,
                    });
                  } else {
                    toast({
                      title: "No se pudo actualizar la información",
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
              <Form id="workingExperienceEditionForm">
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
                          onChange={(e) =>
                            setFrom({ ...from, month: e.target.value })
                          }
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
                          onChange={(e) =>
                            setFrom({ ...from, year: e.target.value })
                          }
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
                            onChange={(e) =>
                              setTo({ ...to, month: e.target.value })
                            }
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
                            onChange={(e) =>
                              setTo({ ...to, year: e.target.value })
                            }
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
                      <Text
                        children="¿Aún en este puesto?"
                        fontSize="0.9em"
                        mr={3}
                      />
                      <input
                        type="checkbox"
                        name="STILL"
                        checked={values.STILL}
                        onChange={handleChange}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex direction="column">
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
                  {/* //     
              //      
              //      
 */}
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            type="submit"
            form="workingExperienceEditionForm"
          >
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
export default Datos;
