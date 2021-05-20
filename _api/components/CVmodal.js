import React from "react";
import apiRoute from "../resources/apiRoute";
import style from "../../styles/pdfcv.module.css";

const CVmodal = React.memo(({ userInfo, secondaryInfo }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.logo}>
          <h1>Descubre</h1>
          <span>El currículum de </span>
        </div>
        <div className={style.photo}>
          <img src={`${apiRoute}/img/userprofile/${userInfo.IMAGE_URL}`} />
        </div>
        <div className={style.userPrimaryInfo}>
          <span>{`${userInfo.NAMES} ${userInfo.LAST_NAME} ${userInfo.MOTHERS_LAST_NAME} `}</span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {secondaryInfo.TITULO}
            </span>
            <span>{`${
              userInfo.GENRE === "masculino"
                ? "Hombre de"
                : userInfo.GENRE === "none"
                ? ""
                : "Mujer de"
            } ${userInfo.AGE} años`}</span>
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
            <span
              style={{ textTransform: "capitalize" }}
            >{` ${userInfo.CITY}, ${userInfo.STATE}`}</span>
          </div>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.bodyFix}>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div />
              <span>Experiencia laboral</span>
            </div>
            {JSON.parse(secondaryInfo.EXPERIENCIA_LABORAL).map((key) => (
              <div key={key.ID} className={style.sectionItem}>
                <div>
                  <div
                    style={{
                      width: "0.8em",
                      height: "0.8em",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      marginRight: "1.5em",
                      marginTop: "0.3em",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "5em",
                    marginBottom: "1em",
                  }}
                >
                  <div>
                    <span
                      style={{ fontWeight: "bold", fontSize: "1.1em" }}
                    >{`${key.PUESTO} `}</span>
                    <span>
                      {!key.STILLINTHIS
                        ? `de ${key.FROM} a ${key.TO}`
                        : `desde ${key.FROM}`}
                    </span>
                  </div>
                  <span>{key.EMPRESA}</span>
                  <p>{key.DESCRIPCION}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div />
              <span>Grado educativo</span>
            </div>
            {JSON.parse(secondaryInfo.GRADO_EDUCATIVO).map((key) => (
              <div key={key.ID} className={style.sectionItem}>
                <div>
                  <div
                    style={{
                      width: "0.8em",
                      height: "0.8em",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      marginRight: "1.5em",
                      marginTop: "0.3em",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "5em",
                    marginBottom: "1em",
                  }}
                >
                  <div>
                    <span
                      style={{ fontWeight: "bold", fontSize: "1.1em" }}
                    >{`${key.TITULO} `}</span>
                    <span>
                      {!key.STILLINTHIS
                        ? `de ${key.FROM} a ${key.TO}`
                        : `desde ${key.FROM}`}
                    </span>
                  </div>
                  <span>{key.INSTITUCION}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div />
              <span>Cursos y certificaciones</span>
            </div>
            {JSON.parse(secondaryInfo.CURSOS_CERTIFICACIONES).map((key) => (
              <div key={key.ID} className={style.sectionItem}>
                <div>
                  <div
                    style={{
                      width: "0.8em",
                      height: "0.8em",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      marginRight: "1.5em",
                      marginTop: "0.3em",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "5em",
                    marginBottom: "1em",
                  }}
                >
                  <div>
                    <span
                      style={{ fontWeight: "bold", fontSize: "1.1em" }}
                    >{`${key.TITULO} `}</span>
                    <span>{` Impartido en ${key.YEAR}`}</span>
                  </div>
                  <span>{key.TIPO}</span>
                  <p>{key.DESCRIPTION}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div />
              <span>Habilidades</span>
            </div>
            <div className={style.sectionItem}>
              <div>
                <div
                  style={{
                    width: "0.8em",
                    height: "0.8em",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    marginRight: "1.5em",
                    marginTop: "0.3em",
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: "5em",
                  marginBottom: "1em",
                }}
              >
                {JSON.parse(secondaryInfo.HABILIDADES).map((key) => (
                  <span>{`${key.TITLE}  `}</span>
                ))}
              </div>
            </div>
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div />
              <span>Idiomas</span>
            </div>
            <div className={style.sectionItem}>
              <div>
                <div
                  style={{
                    width: "0.8em",
                    height: "0.8em",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    marginRight: "1.5em",
                    marginTop: "0.3em",
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: "5em",
                  marginBottom: "1em",
                }}
              >
                {JSON.parse(secondaryInfo.IDIOMAS).map((key) => (
                  <span>{`${key.TITLE}  `}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default CVmodal;
