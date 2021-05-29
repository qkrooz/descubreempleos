import { SaludHeader } from "../../_api/components/Header";
import { SaludFooter } from "../../_api/components/Footer";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Text, Flex } from "@chakra-ui/react";
import styled from "styled-components";
export default function Salud() {
  const validation = Yup.object().shape({
    EMAIL: Yup.string().required("Este campo requerido*"),
  });
  return (
    <>
      <SaludHeader />
      <MainContainer>
        <div>
          <img
            src="https://descubrempleos.com/webServices/img/salud-bg.jpg"
            alt="salud-bg"
          />
          <Decorator />
          <Formik
            validationSchema={validation}
            initialValues={{ NAME: "", EMAIL: "", TEL_NUMBER: "", ISSUE: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, errors, handleChange }) => (
              <Form>
                <FormContainer>
                  <Text
                    fontWeight="bold"
                    fontSize="1.2em"
                    fontWeight="bold"
                    mb={4}
                  >
                    ¿Quieres más información?
                  </Text>
                  <Flex direction="column" width="20em">
                    <Text>Nombre</Text>
                    <Field
                      name="NAME"
                      value={values.NAME}
                      onChange={handleChange}
                      placeholder="Nombres completo"
                    />
                  </Flex>
                  <Flex direction="column" width="20em">
                    <Text>Número de teléfono</Text>
                    <Field
                      name="TEL_NUMBER"
                      value={values.TEL_NUMBER}
                      onChange={handleChange}
                      placeholder="Teléfono con código de área"
                    />
                  </Flex>
                  <Flex direction="column" width="20em">
                    <Text>Correo electrónico</Text>
                    <Field
                      name="EMAIL"
                      value={values.EMAIL}
                      onChange={handleChange}
                      placeholder="Correo electrónico"
                      type="email"
                    />
                    {errors.EMAIL ? (
                      <Text textAlign="end" fontSize="0.8em" color="red">
                        {errors.EMAIL}
                      </Text>
                    ) : null}
                  </Flex>
                  <Flex direction="column" width="20em">
                    <Text>Háblanos de tu problema (opcional)</Text>
                    <Field
                      as="textarea"
                      name="ISSUE"
                      value={values.ISSUE}
                      onChange={handleChange}
                      placeholder="..."
                      rows={6}
                    />
                  </Flex>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#004A5B",
                      borderRadius: "10px",
                      color: "white",
                      padding: "0.5em 0em",
                      width: "100%",
                      fontWeight: "bold",
                      marginTop: "1em",
                    }}
                  >
                    Enviar datos para contacto
                  </button>
                </FormContainer>
              </Form>
            )}
          </Formik>
          <div>
            <div
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Text fontSize="3em" color="white" fontWeight="bold">
                ¿Estresado por el trabajo?
              </Text>
              <Text color="white" fontSize="2em">
                El estrés, la ansiedad y la depresión, son de los principales
                motivos de consulta en terapia psicológica.
              </Text>
            </div>
          </div>
        </div>
      </MainContainer>
      <Section2>
        <Description>
          <p>Equipo profesional</p>
          <div>
            <p>Contamos con</p>
            <p>
              Un equipo de psicólogos con diversas especialidades y maestrías,
              originarios de México, Estados Unidos y Cuba.
            </p>
          </div>
        </Description>
        <Description>
          <p>Servicio para candidatos</p>
          <div>
            <p>Brindamos</p>
            <p>
              Terapia individual, de pareja, familiar, en modalidad presencial y
              virtual con precios accesibles que van desde $150.
            </p>
          </div>
        </Description>
        <Description>
          <p>Servicio para empresas</p>
          <div>
            <p>Ofrecemos</p>
            <p>
              Hacer un convenio con tu empresa para cuidar la salud mental de tu
              personal. También te podemos apoyar en evaluar el clima
              organizacional, así como aplicar la NOM-035.
            </p>
          </div>
        </Description>
      </Section2>
      <SaludFooter />
    </>
  );
}
const MainContainer = styled.section`
  height: auto !important;
  & > div:first-child {
    position: relative;
    width: 100%;
    height: calc(100vh - 4em);
  }
  & > div:first-child > img {
    height: 100%;
    z-index: 0;
    position: absolute;
    object-fit: cover;
    right: 0;
    width: 100%;
  }
  & > div > div:last-child {
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    display: flex;
    justify-content: flex-end;
    background-color: #0c0c0c70;
    z-index: 4;
  }
`;
const Decorator = styled.div`
  background-color: #002625;
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 500px;
  z-index: 5;
  transform: translateX(-50%);
`;
const Section2 = styled.section`
  width: 100%;
  background-color: #002625;
  display: flex;
  justify-content: space-evenly;
  padding: 1em 0;
`;
const Description = styled.article`
  width: 20%;
  background-color: white;
  border-radius: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  & > p:first-child {
    background-color: #004a5b;
    color: white;
    text-align: center;
    padding: 0.5em 0;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: 10px;
  }
  & > div > p:first-child {
    font-weight: bold;
    color: #004a5b;
  }
  & > div {
    padding: 1.5em;
  }
`;
const FormContainer = styled.div`
  background-color: white;
  padding: 2em;
  position: absolute;
  z-index: 7;
  border-radius: 10px;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div > textarea {
    resize: none;
  }
`;
