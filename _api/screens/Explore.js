import React from "react";
import { Formik, Form, Field } from "formik";
import { Flex, Text, Button } from "@chakra-ui/react";
import styled from "styled-components";
// components
import Footer from "../components/Footer";
export default function BusquedaComponent() {
  return (
    <>
      <SearchContainer>
        <Text fontWeight="bold" fontSize="1.2em" mb="1em">
          Encuentra ese trabajo que has estado esperando
        </Text>
        <Formik initialValues={{ KEYSTRING: "", UBICATION: "" }}>
          {({ values, handleChange, errors }) => (
            <Form>
              <Flex align="flex-end">
                <Flex direction="column" width="25%" mr="1em">
                  <Text mb="0.5em">¿Qué estás buscando?</Text>
                  <Field
                    value={values.KEYSTRING}
                    name="KEYSTRING"
                    onChange={handleChange}
                    style={{ color: "black" }}
                    placeholder="Palabras clave"
                  />
                </Flex>
                <Flex direction="column" width="25%" mr="1em">
                  <Text mb="0.5em">¿Dónde estás buscando?</Text>
                  <Field
                    value={values.UBICATION}
                    name="UBICATION"
                    onChange={handleChange}
                    style={{ color: "black" }}
                    placeholder="Ubicación"
                  />
                </Flex>
                <Button colorScheme="yellow">Buscar</Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </SearchContainer>
      <ResultsContainer>
        <div></div>
        <div></div>
      </ResultsContainer>
      <Footer />
    </>
  );
}
const SearchContainer = styled.div`
  background-color: #101d39;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 1.5em 0;
  padding-left: 10%;
`;
const ResultsContainer = styled.div`
  & > div::first-child {
    flex-grow: 1;
  }
  & > div::last-child {
    width: 15%;
  }
`;
