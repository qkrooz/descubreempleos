import React, { useEffect, useContext } from "react";
import { MainContext } from "../_api/resources/MainContext";
import { useRouter } from "next/router";
import Footer from "../_api/components/Footer";
import Header from "../_api/components/Header";
import { MemoryRouter as Router } from "react-router-dom";
import { Button, Card, Icon } from "semantic-ui-react";
import style from "../../styles/blog.module.css";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Blog = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [userInfo] = userInfoState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      router.push("/login");
    }
  }, [userInfo]);
  return (
    <Router>
      <Header></Header>
      <div className={style.backgroundwhite}> .</div>
      <button onClick={onOpen} className={style.buttonModalFirst}>
        <Icon className="plus circle" size="huge"></Icon>
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={style.port}>
            Agregar imagen de portada <Icon className="add circle"></Icon>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className={style.modalcontent}>
            <h3 className={style.titleadd}>Titulo</h3>
            <p className={style.text}> Texto</p>
          </ModalBody>
          <ModalFooter className={style.flexfooter}>
            <div className={style.flexbuttons}>
              <Button color="yellow" className={style.button}>
                Publicar
              </Button>
              <Button color="yellow" className={style.button} onClick={onClose}>
                Cancelar
              </Button>
            </div>
            <img src="./ToolsBar.png" className={style.imgtool}></img>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal} onClose={onCloseModal} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={style.backgroundHeader}>
            <div className={style.titleheadertext}>
              <h1 className={style.titleprincipal}>
                Medios para salir de lo cotidiano
              </h1>
              <div className={style.flexhead}>
                <p>Escrito por Jose Antonio Higuera V.</p>
                <p>Publicado el 10 de Oct del 2020</p>
                <div className={style.flexhead}>
                  <p className={style.likes}> Likes 15</p>
                  <Icon className="icon heart" color="red"></Icon>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className={style.containermodal}>
            A sea una pequeña, mediana o gran empresa; ya sea un empleado de
            medio tiempo, jo, por contrato, pasante o practicante; aquí en
            “Descubre” queremos ayudarte a encontrar lo que ejemplica en el
            campo del orden moderno.
            <h1 className={style.titlefirst}>Asenciones de ambito moderno</h1>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui ocia deserunt mollit anim id est laborum."{" "}
            <h1 className={style.titlesecond}>
              ¿Porque usar nos nuevos parametros?
            </h1>
            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
            magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non nu.
            <div className={style.heartcontainer}>
              <Icon className="icon heart" color="grey" size="massive"></Icon>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={style.content}>
        <img src="./BlogBg.png" className={style.widthimage}></img>
        <div className={style.flexcontent}>
          <div className={style.containercard}>
            <Card onClick={onOpenModal}>
              <img src="./ImgCard1.png"></img>
              <Card.Content>
                <div>
                  <h1 className={style.titlecard}>
                    Medios para salir de lo cotidiano
                  </h1>

                  <p> Escrito por Jose Antonio Higuera V.</p>
                  <p>
                    A sea una pequeña, mediana o gran empresa; ya sea un
                    empleado de medio tiempo, jo, por contrato, pasante o
                    practicante; aquí en “Descubre” queremos ayudarte a
                    encontrar lo q..
                  </p>
                  <div className={style.flexdate}>
                    <p>Publicado el 10 de Oct del 2020</p>
                    <div className={style.flexdate1}>
                      <p className={style.textmargin}> Likes 15</p>
                      <Icon className="heart" color="red"></Icon>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
          <div className={style.containercard}>
            <Card onClick={onOpenModal}>
              <img src="./ImgCard2.png"></img>
              <Card.Content>
                <div>
                  <h1 className={style.titlecard}>
                    Llega a ese puesto que has estado esperando
                  </h1>

                  <p> Escrito por Jose Antonio Higuera V.</p>
                  <p>
                    A sea una pequeña, mediana o gran empresa; ya sea un
                    empleado de medio tiempo, jo, por contrato, pasante o
                    practicante; aquí en “Descubre” queremos ayudarte a
                    encontrar lo q...
                  </p>
                  <div className={style.flexdate}>
                    <p>Publicado el 14 de Sep del 2020</p>
                    <div className={style.flexdate1}>
                      <p className={style.textmargin}> Likes 45</p>
                      <Icon className="heart" color="red"></Icon>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
          <div className={style.containercard}>
            <Card onClick={onOpenModal}>
              <img src="./ImgCard3.png"></img>
              <Card.Content>
                <div>
                  <h1 className={style.titlecard}>
                    Diseño en espacios de trabajo modernos
                  </h1>
                  <p>Escrito por Jose Antonio Higuera V.</p>
                  <p>
                    A sea una pequeña, mediana o gran empresa; ya sea un
                    empleado de medio tiempo, jo, por contrato, pasante o
                    practicante; aquí en “Descubre” queremos ayudarte a
                    encontrar lo q...
                  </p>
                  <div className={style.flexdate}>
                    <p>Publicado el 08 de Ago del 2020</p>
                    <div className={style.flexdate1}>
                      <p className={style.textmargin}> Likes 56</p>
                      <Icon className="heart" color="red"></Icon>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Router>
  );
});
export default Blog;
