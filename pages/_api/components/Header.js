import React, { useContext } from "react";
import { MainContext } from "../resources/MainContext";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
// styles
import header from "../../../styles/header.module.css";
import { useRouter } from "next/router";
const Header = React.memo(() => {
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [, setUserInfo] = userInfoState;
  // const hamburguerNavMenu = (
  //   <Menu>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" href="/salud">
  //         <BulbOutlined style={{ fontSize: "1.1em" }} />
  //         Por salud Mental
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" href="/blog">
  //         <BoldOutlined style={{ fontSize: "1.1em" }} />
  //         <span>Blog Descubre</span>
  //       </a>
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item>
  //       <a
  //         rel="noopener noreferrer"
  //         style={{ color: "red" }}
  //         onClick={() => {
  //           setUserInfo({});
  //           router.push("/login");
  //         }}
  //       >
  //         <PoweroffOutlined style={{ fontSize: "1.1em" }} />
  //         Cerrar Sesión
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <header className={header.container}>
      <div className={header.containerInner}>
        <div className={header.logoContainer}>
          <Link to="/">Descubre</Link>
        </div>
        <nav className={header.linkContainer}>
          <Link className={header.link} to="/search">
            {/* <SearchOutlined size={30} style={{ marginRight: "0.5em" }} /> */}
            Explorar
          </Link>
          <Link className={header.link} to="/">
            {/* <HomeFilled size={30} style={{ marginRight: "0.5em" }} /> */}
            Inicio
          </Link>
          <Link className={header.link} to="/data">
            {/* <UserOutlined size={30} style={{ marginRight: "0.5em" }} /> */}
            Mis datos
          </Link>
        </nav>
        <div className={header.navButtonsContainer}>
          <button className={header.navButton}>
            {/* <MessageFilled style={{ fontSize: "1.8em", color: "white" }} /> */}
          </button>
          <img src="/icon-lamp-white.png" className={header.icon} />
          <Menu>
            <Button
              as={Button}
              variant="unstyled"
              colorScheme="white"
              _hover={{ backgroundColor: "transparent", outline: "none" }}
              _focus={{ outline: "none" }}
              _after={{ outline: "none" }}
            >
              <Icon name="bars" size="large" />
            </Button>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </header>
  );
});
export const EnterpriseHeader = React.memo(() => {
  const { userInfoState } = useContext(MainContext);
  const [, setUserInfo] = userInfoState;
  // const hamburguerNavMenu = (
  //   <Menu>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" href="#">
  //         <BulbOutlined style={{ fontSize: "1.1em" }} />
  //         Por salud Mental
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a rel="noopener noreferrer" href="#">
  //         <BoldOutlined style={{ fontSize: "1.1em" }} />
  //         <span>Blog Descubre</span>
  //       </a>
  //     </Menu.Item>
  //     <Menu.Divider />
  //     <Menu.Item>
  //       <a
  //         rel="noopener noreferrer"
  //         style={{ color: "red" }}
  //         onClick={() => {
  //           setUserInfo({});
  //         }}
  //       >
  //         <PoweroffOutlined style={{ fontSize: "1.1em" }} />
  //         Cerrar Sesión
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <header className={header.container}>
      <div className={header.containerInner}>
        <div className={header.logoContainer}>
          <Link to="/">Descubre</Link>
        </div>
        <nav className={header.linkContainer}>
          <Link className={header.link} to="/search">
            {/* <SearchOutlined size={30} style={{ marginRight: "0.5em" }} /> */}
            Explorar
          </Link>
          <Link className={header.link} to="/">
            {/* <HomeFilled size={30} style={{ marginRight: "0.5em" }} /> */}
            Inicio
          </Link>
          <Link className={header.link} to="/data">
            {/* <UserOutlined size={30} style={{ marginRight: "0.5em" }} /> */}
            Mis datos
          </Link>
        </nav>
        <div className={header.navButtonsContainer}>
          <button className={header.navButton}>
            {/* <MessageFilled style={{ fontSize: "1.8em", color: "white" }} /> */}
          </button>
          <img src="/icon-lamp-white.png" className={header.icon} />
          {/* <Dropdown overlay={hamburguerNavMenu} placement="bottomRight">
            <button className={header.navButton}>
              <MenuOutlined style={{ fontSize: "1.8em", color: "white" }} />
            </button>
          </Dropdown> */}
        </div>
      </div>
    </header>
  );
});
export default Header;
