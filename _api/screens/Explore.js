import { useEffect, useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { Flex, Text, Button } from "@chakra-ui/react";
import { MainContext } from "../resources/MainContext";
import styled from "styled-components";
// components
import Footer from "../components/Footer";
import { Search } from "@material-ui/icons";
export default function BusquedaComponent() {
  const [recent_searches, set_recent_searches] = useState([]);
  // context
  const { already_searched_state } = useContext(MainContext);
  const [already_searched, set_already_searched] = already_searched_state;
  useEffect(() => {
    if (localStorage.getItem("recent_searches")) {
      set_recent_searches(JSON.parse(localStorage.getItem("recent_searches")));
    }
  }, []);
  return (
    <>
      <div style={{ minHeight: "calc(100vh - 8.6em)", maxHeight: "calc(100vh - 8.6em)", height: "calc(100vh - 8.6em)" }}>
        <SearchContainer searched={already_searched}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1em" }}>
            {!already_searched ? <img src="/favicon.png" alt="" style={{ width: "5em", height: "5em", marginRight: "1em" }} /> : null}
            <Text fontWeight="bold" fontSize={already_searched ? "1.2em" : "2em"}>
              Encuentra ese trabajo que has estado esperando
            </Text>
          </div>
          <Formik
            initialValues={{ KEYSTRING: "", UBICATION: "" }}
            onSubmit={(values) => {
              if (values.KEYSTRING !== "") {
                set_already_searched(true);
                let recent_searches_copy = [...recent_searches];
                if (recent_searches_copy.length > 3) {
                  recent_searches_copy.pop();
                }
                recent_searches_copy.unshift(values);
                localStorage.setItem("recent_searches", JSON.stringify(recent_searches_copy));
              }
            }}
          >
            {({ values, handleChange, errors }) => (
              <Form style={!already_searched ? { marginBottom: "3em" } : {}}>
                <Flex align="flex-end">
                  <Flex direction="column" width="25%" mr="1em">
                    <Text mb="0.5em">¿Qué estás buscando?</Text>
                    <Field value={values.KEYSTRING} name="KEYSTRING" onChange={handleChange} style={{ color: "black" }} placeholder="Palabras clave" maxLength={40} />
                  </Flex>
                  <Flex direction="column" width="25%" mr="1em">
                    <Text mb="0.5em">¿Dónde estás buscando?</Text>
                    <Field value={values.UBICATION} name="UBICATION" onChange={handleChange} style={{ color: "black" }} placeholder="Ubicación" />
                  </Flex>
                  <Button type="submit" colorScheme="yellow">
                    Buscar
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
          {!already_searched ? <RecentSearches>{recent_searches ? recent_searches.map((data, i) => <SearchItem key={i} data={data} />) : null}</RecentSearches> : null}
        </SearchContainer>
        {already_searched ? (
          <ResultsContainer>
            <div></div>
            <div></div>
          </ResultsContainer>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
const SearchItem = ({ data }) => {
  return (
    <SearchItemContainer>
      <Search />
      <span>{data.KEYSTRING}</span>
    </SearchItemContainer>
  );
};
const SearchContainer = styled.div`
  background-color: #101d39;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding: 1.5em 0;
  padding-left: 10%;
  height: ${(props) => (props.searched ? "auto" : "calc(100vh - 8.6em)")};
`;
const RecentSearches = styled.div`
  margin-right: 10%;
  display: flex;
  justify-content: center;
`;
const SearchItemContainer = styled.button`
  margin-right: 1em;
  background-color: #dfdfdf;
  color: #363636;
  padding: 1em;
  display: flex;
  align-items: center;
  border: none;
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.96);
    transition: all 0.2s;
  }
  & > span {
    margin-left: 0.5em;
  }
`;
const ResultsContainer = styled.div`
  & > div::first-child {
    flex-grow: 1;
  }
  & > div::last-child {
    width: 15%;
  }
`;
