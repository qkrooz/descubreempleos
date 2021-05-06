import React, { useContext } from "react";
import apiRoute from "../resources/apiRoute";
import Link from "next/link";
import { MainContext } from "../resources/MainContext";
import { Flex, Box, Badge, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
// components
import Footer from "../components/Footer";
// style
import style from "../../../styles/enterprisedata.module.css";
import { Edit, Person } from "@material-ui/icons";
const EnterpriseData = React.memo(() => {
  // context
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  // states
  const [userImageError, setUserImageError] = React.useState(false);
  return (
    <>
      <Flex w="100%">
        <Flex w="25%" pl="1em" pt="1em" direction="column">
          <BoxComponent>
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
              <div className={style.companyDescription}>
                {secondaryInfo.DESCRIPTION ? (
                  secondaryInfo.DESCRIPTION
                ) : (
                  <Badge>no disponible</Badge>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                {secondaryInfo.WEBSITE ? (
                  <Text color="Highlight" textDecoration="underline">
                    <Link href={secondaryInfo.WEBSITE}>
                      {secondaryInfo.WEBSITE}
                    </Link>
                  </Text>
                ) : (
                  <Badge>no disponible</Badge>
                )}
              </div>
            </Flex>
          </BoxComponent>
          <BoxComponent title="Seguridad">
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
          </BoxComponent>
          <BoxComponent title="Datos de cobro"></BoxComponent>
        </Flex>
        <Flex grow={1} direction="column" pl="1em" pt="1em" pr="1em">
          <BoxComponent title="Datos personales"></BoxComponent>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
});
const BoxComponent = React.memo(({ children, title, onClick, props }) => {
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
      {children}
    </Box>
  );
});
export default EnterpriseData;
