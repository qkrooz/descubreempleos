import React, { useContext, useState } from "react";
import apiRoute from "../resources/apiRoute";
import Link from "next/link";
import { MainContext } from "../resources/MainContext";
import { Formik, Form, Field } from "formik";
import { Flex, Box, Badge, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
// components
import Footer from "../components/Footer";
import EnterpriseCustomModal from "../components//EnterpriseModals";
// style
import style from "../../styles/enterprisedata.module.css";
import { Edit, Lock, Person } from "@material-ui/icons";
import moment from "moment";
const EnterpriseData = React.memo(() => {
  var pattern = /^((http|https|ftp):\/\/)/;
  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  // states
  const [userImageError, setUserImageError] = React.useState(false);
  const [editModal, setEditModal] = useState(false);
  const [content, setContent] = useState(0);
  return (
    <>
      <Flex w="100%">
        <Flex w="25%" pl="1em" pt="1em" direction="column">
          <BoxComponent
            onClick={() => {
              setContent(0);
              setEditModal(true);
            }}
          >
            <Flex align="center" direction="column">
              {userImageError ? (
                <div className={style.userImageErrorIcon}>
                  <Person style={{ fontSize: "5em" }} />
                </div>
              ) : (
                <img
                  className={style.userImage}
                  src={`${userInfo.IMAGE_URL}?v=${Date.now()}`}
                  alt="userprile"
                  onError={() => {
                    setUserImageError(true);
                  }}
                />
              )}
              <span className={style.companyName}>{userInfo.COMPANY_NAME}</span>
              <div className={style.companyDescription}>{secondaryInfo.COMPANY_DESCRIPTION ? secondaryInfo.COMPANY_DESCRIPTION : <Badge>no disponible</Badge>}</div>
              <div style={{ marginTop: "1em" }}>
                {secondaryInfo.WEBSITE ? (
                  <Text color="Highlight" textDecoration="underline">
                    <a href={!pattern.test(secondaryInfo.WEBSITE) ? "http://" + secondaryInfo.WEBSITE : secondaryInfo.WEBSITE} target="_blank" rel="noreferrer">
                      {secondaryInfo.WEBSITE}
                    </a>
                  </Text>
                ) : (
                  <Badge>no disponible</Badge>
                )}
              </div>
            </Flex>
          </BoxComponent>
          <BoxComponent
            title="Seguridad"
            onClick={() => {
              setContent(1);
              setEditModal(true);
            }}
          >
            <Table>
              <Tbody>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Email</Td>
                  <Td style={{ fontSize: "0.85em" }}>{userInfo.EMAIL ? userInfo.EMAIL.substring(0, 1) + "****@" + userInfo.EMAIL.split("@")[1] : null}</Td>
                </Tr>
                <Tr>
                  <Td style={{ fontWeight: "bold" }}>Contraseña</Td>
                  <Td>{userInfo.PASSWORD ? userInfo.PASSWORD.replace(/./g, "*") : null}</Td>
                </Tr>
              </Tbody>
            </Table>
          </BoxComponent>
          {/* <BoxComponent
            title="Datos de cobro"
            onClick={() => {
              setContent(2);
              setEditModal(true);
            }}
          ></BoxComponent> */}
        </Flex>
        <Flex grow={1} direction="column" pl="1em" pt="1em" pr="1em">
          <Box boxShadow="md" p={2} rounded="md" bg="white" w="100%" mb={4} border="1px" borderColor="#ebebeb">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  marginRight: "auto",
                  fontWeight: "bold",
                  fontSize: "1.7em",
                  paddingTop: "0.5em",
                  paddingLeft: "2em",
                }}
              >
                Datos personales
              </div>
              <button
                onClick={() => {
                  setContent(2);
                  setEditModal(true);
                }}
              >
                <Edit />
              </button>
            </div>
            <div className={style.dataRow}>
              <div>
                <span>Fundación</span>
                <span>{secondaryInfo.FUNDATION_DATE ? moment(secondaryInfo.FUNDATION_DATE).format("DD/MM/YYYY") : <Badge>no disponible</Badge>}</span>
              </div>
              <div>
                <span>Nombre</span>
                <span>
                  {userInfo.NAMES && (userInfo.LAST_NAME || userInfo.MOTHERS_LAST_NAME) ? `${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME}` : <Badge>no disponible</Badge>}
                </span>
              </div>
            </div>
            <div className={style.dataRow}>
              <div>
                <span>Razon social</span>
                <span>{userInfo.RAZON_SOCIAL ? userInfo.RAZON_SOCIAL : <Badge>no disponible</Badge>}</span>
              </div>
              <div>
                <span>RFC</span>
                <span style={{ textTransform: "uppercase" }}>{userInfo.RFC ? userInfo.RFC : <Badge>no disponible</Badge>}</span>
              </div>
            </div>
            <div className={style.dataRow}>
              <div>
                <span>Telefono</span>
                <span>{userInfo.TEL_NUMBER ? userInfo.TEL_NUMBER : <Badge>no disponible</Badge>}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span>Ubicacion</span>
                <span style={{ textTransform: "capitalize" }}>
                  {userInfo.STATE && userInfo.CITY ? (
                    <div>
                      <span>{`${userInfo.STATE}, `}</span>
                      <span>{` ${userInfo.CITY}`}</span>
                    </div>
                  ) : (
                    <Badge>no disponible</Badge>
                  )}
                </span>
              </div>
            </div>
            <div className={style.disclaimer}>
              Estos datos personales son privados y sólo son para tener un mejor control de usuarios, para poder tener un mejor conocimiento de tu empresa y para poder generar los datos de
              facturación.
            </div>
          </Box>
          {/* <Box boxShadow="md" p={2} rounded="md" bg="white" w="100%" mb={4} border="1px" borderColor="#ebebeb">
            <Flex direction="column" p={4}>
              <div
                style={{
                  marginRight: "auto",
                  fontWeight: "bold",
                  fontSize: "1.7em",
                  paddingTop: "0.5em",
                  paddingLeft: "2em",
                }}
              >
                Ingresa los datos de tu tarjeta
              </div>
              <Formik>
                {({ values, handleChange, errors }) => (
                  <Form>
                    <Flex></Flex>
                    <Flex pr={4} pl={4} pb={7} pt={7}>
                      <Field placeholder="Titular" style={{ flexGrow: 1, marginRight: "1em" }} />
                      <Field placeholder="Número de tarjeta" style={{ flexGrow: 1 }} />
                    </Flex>
                    <Flex pr={4} pl={4} pb={1} pt={1}>
                      <Field placeholder="Vencimiento" style={{ marginRight: "1em" }} />
                      <Field placeholder="CVV" />
                    </Flex>
                    <Flex className={style.buttonsRow} justify="flex-end">
                      <button type="submit">Aceptar</button>
                      <button>Cancelar</button>
                    </Flex>
                  </Form>
                )}
              </Formik>
              <Flex alignItems="center">
                <div>
                  <Lock style={{ fontSize: "3em", marginRight: "0.2em" }} />
                </div>
                <div>
                  <Text fontSize="1.5em">Este es un sitio seguro</Text>
                  <Text>Utilizamos conexiones seguras para proteger tu informacion</Text>
                </div>
              </Flex>
            </Flex>
          </Box>
         */}
        </Flex>
      </Flex>
      <Footer />
      <EnterpriseCustomModal vis={[editModal, setEditModal]} content={content} />
    </>
  );
});
const BoxComponent = React.memo(({ children, title, onClick, props }) => {
  return (
    <Box {...props} boxShadow="md" p={2} rounded="md" bg="white" w="100%" mb={4} border="1px" borderColor="#ebebeb">
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
      {children}
    </Box>
  );
});
export default EnterpriseData;
