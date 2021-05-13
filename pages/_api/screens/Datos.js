import React, { useContext, useState } from "react";
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
} from "@chakra-ui/react";
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
import { CustomModal, ConfirmDelete } from "../components/Modals";
// styles
import style from "../../../styles/datos.module.css";
const DatosContext = React.createContext();
const Datos = React.memo(() => {
  const toast = useToast();
  // states
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalContent, setModalContent] = useState(0);
  const [workingItem, setWorkingItem] = useState();
  const [deleteFunction, setDeleteFunction] = useState();
  const [disponibleState, setDisponibleState] = useState();
  const [userImageError, setUserImageError] = useState(false);
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
            isClosable: true,
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
    <DatosContext.Provider
      value={{
        workingItemState: [workingItem, setWorkingItem],
        deleteFunctionState: [deleteFunction, setDeleteFunction],
        confirmDeleteState: [confirmDelete, setConfirmDelete],
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
            <div className={style.userImage}>
              {userImageError ? (
                <div className={style.userImageErrorIcon}>
                  <Person style={{ fontSize: "5em" }} />
                </div>
              ) : (
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
              setModalContent(1);
              setModal(!modal);
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
        hook={{ modalState: [modal, setModal] }}
        content={modalContent}
      />
      <ConfirmDelete
        hook={{ dialogState: [confirmDelete, setConfirmDelete] }}
        workingItem={workingItem}
        deleteFunction={deleteFunction}
      />
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
  const {
    workingItemState,
    deleteFunctionState,
    confirmDeleteState,
  } = useContext(DatosContext);
  const [, setConfirmDelete] = confirmDeleteState;
  const [, setWorkingItem] = workingItemState;
  const [, setDeleteFunction] = deleteFunctionState;
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
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
    <Flex direction="column" w="100%" borderBottom="1px solid black">
      <Flex justify="space-between">
        <Text fontWeight="bold" mt={4}>
          {data.PUESTO}
        </Text>
        <Menu>
          <MenuButton as="button">
            <MoreVert style={{ fontSize: "1em", color: "gray" }} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Edit />}>Editar</MenuItem>
            <MenuItem
              icon={<Delete />}
              onClick={() => {
                setWorkingItem(data);
                setDeleteFunction(DeleteFromExperienciaLaboral);
                setConfirmDelete(true);
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
  );
});
export default Datos;
