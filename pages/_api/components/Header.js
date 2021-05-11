import React, { useContext } from "react";
import { MainContext } from "../resources/MainContext";
import { Link } from "react-router-dom";
// styles
import header from "../../../styles/header.module.css";
import { useRouter } from "next/router";
import {
  ChatBubble,
  Home,
  Person,
  Search,
  Menu as MenuIcon,
  Business,
  PostAdd,
  Equalizer,
  PowerSettingsNew,
  Flare,
  FormatBold,
} from "@material-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

const Header = React.memo(() => {
  const router = useRouter();
  // context
  const { ResetInfo } = useContext(MainContext);
  return (
    <header className={header.container}>
      <div className={header.logoContainer}>
        <Link to="/">
          <img
            src="https://descubrempleos.com/webServices/img/logo2.png"
            alt="logo2"
          />
        </Link>
      </div>
      <nav className={header.linkContainer}>
        <Link className={header.link} to="/search">
          <Search size={30} style={{ marginRight: "0.5em" }} />
          <span>Explorar</span>
        </Link>
        <Link className={header.link} to="/">
          <Home size={30} style={{ marginRight: "0.5em" }} />
          <span>Inicio</span>
        </Link>
        <Link className={header.link} to="/data">
          <Person size={30} style={{ marginRight: "0.5em" }} />
          <span>Mis datos</span>
        </Link>
      </nav>
      <div className={header.navButtonsContainer}>
        <button className={header.navButton}>
          <ChatBubble style={{ fontSize: "1.8em", color: "white" }} />
        </button>
        <Menu>
          <MenuButton>
            <MenuIcon style={{ fontSize: "2em" }} />
          </MenuButton>
          <MenuList>
            <MenuItem color="black" icon={<FormatBold />}>
              Blog
            </MenuItem>
            <MenuItem color="black" icon={<Flare />}>
              Salud
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="red"
              icon={<PowerSettingsNew />}
              onClick={() => {
                ResetInfo();
                router.push("/entra");
              }}
            >
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
});
export const EnterpriseHeader = React.memo(() => {
  const router = useRouter();
  // context
  const { ResetInfo } = useContext(MainContext);
  return (
    <header className={header.container}>
      <div className={header.logoContainer}>
        <Link to="/">
          <img
            src="https://descubrempleos.com/webServices/img/logo2.png"
            alt="logo2"
          />
        </Link>
      </div>
      <nav className={header.linkContainer}>
        <Link className={header.link} to="/search">
          <Equalizer size={30} style={{ marginRight: "0.5em" }} />
          Estadísticas
        </Link>
        <Link className={header.link} to="/">
          <PostAdd size={30} style={{ marginRight: "0.5em" }} />
          Publicar
        </Link>
        <Link className={header.link} to="/data">
          <Business size={30} style={{ marginRight: "0.5em" }} />
          Datos
        </Link>
      </nav>
      <div className={header.navButtonsContainer}>
        <button className={header.navButton}>
          <ChatBubble style={{ fontSize: "1.8em", color: "white" }} />
        </button>
        <Menu>
          <MenuButton>
            <MenuIcon style={{ fontSize: "2em" }} />
          </MenuButton>
          <MenuList>
            <MenuItem color="black" icon={<FormatBold />}>
              Blog
            </MenuItem>
            <MenuItem color="black" icon={<Flare />}>
              Salud
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="red"
              icon={<PowerSettingsNew />}
              onClick={() => {
                ResetInfo();
                router.push("/entra");
              }}
            >
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
});
export default Header;
