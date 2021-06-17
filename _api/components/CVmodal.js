import { useContext } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVpdf from "./CVpdf";
import styled from "styled-components";
import style from "../../styles/pdfcv.module.css";
import { DatosContext } from "../screens/Datos";
import { MainContext } from "../resources/MainContext";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { Close, CloudDownloadTwoTone } from "@material-ui/icons";
export default function CVmodal() {
  const { cvmodal_vis_state, information_complete_state } = useContext(DatosContext);
  const [cvmodal_vis, set_cvmodal_vis] = cvmodal_vis_state;
  const { userInfoState, secondaryInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const [secondaryInfo] = secondaryInfoState;
  const [information_complete] = information_complete_state;
  if (information_complete) {
    return (
      <Modal isOpen={cvmodal_vis} size="6xl" onClose={() => set_cvmodal_vis((cvmodal_vis) => !cvmodal_vis)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding={0}>
            <div className={style.container}>
              <CVButtonsContainer>
                <CVButtonAction onClick={() => set_cvmodal_vis((cvmodal_vis) => !cvmodal_vis)}>
                  <Close />
                </CVButtonAction>
                <CVButtonAction>
                  <PDFDownloadLink document={<CVpdf />} fileName={`${userInfo.ID}_CV.pdf`}>
                    {({ blob, url, loading, error }) => (loading ? "" : <CloudDownloadTwoTone />)}
                  </PDFDownloadLink>
                </CVButtonAction>
              </CVButtonsContainer>
              <div className={style.header}>
                <div className={style.logo}>
                  <h1>Descubre</h1>
                  <span>El currículum de </span>
                </div>
                <div className={style.photo}>
                  <img src={userInfo.IMAGE_URL} />
                </div>
                <div className={style.userPrimaryInfo}>
                  <span>{`${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME} `}</span>
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <span style={{ textTransform: "capitalize", fontWeight: "bold", marginRight: "0.5em" }}>{secondaryInfo.TITULO}</span>
                    <span>{`${userInfo.GENRE === "masculino" ? "Hombre de" : userInfo.GENRE === "none" ? "" : "Mujer de"} ${userInfo.AGE} años`}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Teléfono</span>
                    <span>{` ${userInfo.TEL_NUMBER}`}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Correo</span>
                    <span>{` ${userInfo.EMAIL}`}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Ubicación</span>
                    <span style={{ textTransform: "capitalize" }}>{` ${userInfo.CITY}, ${userInfo.STATE}`}</span>
                  </div>
                </div>
              </div>
              <div className={style.body}>
                <div className={style.bodyFix}>
                  <div className={style.section}>
                    <div className={style.sectionHeader}>
                      {/* <div /> */}
                      <span>Experiencia laboral</span>
                    </div>
                    {JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL).map((key) => (
                      <div key={key.ID} className={style.sectionItem}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "5em",
                            marginBottom: "1em",
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>{`${key.PUESTO} `}</span>
                            <span>{!key.STILL ? `de ${key.FECHA_INICIO} a ${key.FECHA_FIN}` : `desde ${key.FECHA_INICIO}`}</span>
                          </div>
                          <span>{key.EMPRESA}</span>
                          <p>{key.DESCRIPCION}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={style.section}>
                    <div className={style.sectionHeader}>
                      <span>Grado educativo</span>
                    </div>
                    {JSON.parse(secondaryInfo.GRADO_EDUCATIVO).map((key) => (
                      <div key={key.ID} className={style.sectionItem}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "5em",
                            marginBottom: "1em",
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>{`${key.TITULO_ACADEMICO} `}</span>
                            <span>{!key.STILL ? `de ${key.FECHA_INICIO} a ${key.FECHA_FIN}` : `desde ${key.FECHA_INICIO}`}</span>
                          </div>
                          <span>{key.INSTITUCION}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={style.section}>
                    <div className={style.sectionHeader}>
                      <span>Cursos y certificaciones</span>
                    </div>
                    {JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES).map((key) => (
                      <div key={key.ID} className={style.sectionItem}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "5em",
                            marginBottom: "1em",
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>{`${key.TITULO_CURSO} `}</span>
                            <span>{` Impartido en ${key.FECHA_INICIO}`}</span>
                          </div>
                          <span>{key.TIPO}</span>
                          <p>{key.DESCRIPTION}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={style.section}>
                    <div className={style.sectionHeader}>
                      <span>Habilidades</span>
                    </div>
                    <div className={style.sectionItem}>
                      <div
                        style={{
                          marginLeft: "5em",
                          marginBottom: "1em",
                        }}
                      >
                        <ul>
                          {JSON.parse(secondaryInfo.HABILIDADES).map((key, i) => (
                            <li key={i}>{`${key.TITLE}  `}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={style.section}>
                    <div className={style.sectionHeader}>
                      <span>Idiomas</span>
                    </div>
                    <div className={style.sectionItem}>
                      <div
                        style={{
                          marginLeft: "5em",
                          marginBottom: "1em",
                        }}
                      >
                        <ul>
                          {JSON.parse(secondaryInfo.IDIOMAS).map((key, i) => (
                            <li key={i}>{`${key.TITLE}  `}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  } else {
    return null;
  }
}
const CVButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10em;
  height: 10em;
  padding-top: 1em;
  padding-left: 1em;
`;
const CVButtonAction = styled.button`
  background-color: white;
  border-radius: 10px;
  width: 3em;
  height: 2em;
  margin-right: 0.5em;
  cursor: pointer;
  border: none;
  &:active {
    transform: scale(0.9);
    transition: all 0.1s;
  }
`;
