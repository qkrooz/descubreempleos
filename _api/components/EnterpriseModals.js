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
import { Close, Person } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import style from "../../styles/modals.module.css";
const ThisContext = React.createContext();
export default function EnterpriseCustomModal(props) {
  const toast = useToast();
  const { vis, content } = props;
  const [modalVis, setModalVis] = vis;
  const { userInfoState, secondaryInfoState, ResetInfo } =
    useContext(MainContext);
  const [secondaryInfo, setSecondaryInfo] = secondaryInfoState;
  const [userInfo, setUserInfo] = userInfoState;
  const primaryKeys = ["COMPANY_NAME", "COMPANY_DESCRIPTION", "WEBSITE"];
  const secondaryKeys = [];
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
    },
    validation: Yup.object().shape({
      COMPANY_NAME: Yup.string().required("Este campo es requerido"),
      COMPANY_DESCRIPTION: Yup.string().required("Este campo es requerido"),
      WEBSITE: Yup.string().required("Este campo es requerido"),
    }),
  },
];
