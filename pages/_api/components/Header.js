import React, { useContext, useState, useRef, useEffect } from "react";
import { MainContext } from "../resources/MainContext";
import { Link } from "react-router-dom";
// styles
import header from "../../../styles/header.module.css";
import { useRouter } from "next/router";
import { Search } from "@material-ui/icons";
const Header = React.memo(() => {
  const wrapperRef = useRef(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const { userInfoState } = useContext(MainContext);
  const [, setUserInfo] = userInfoState;
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
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
          {/* <SearchOutlined  /> */}
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
        <div className={header.menuWrapper} ref={wrapperRef}>
          <button
            onClick={() => {
              setMenuVisible(!menuVisible);
            }}
          >
            {/* <Icon name="bars" size="large" /> */}
          </button>
          {menuVisible ? (
            <div className={header.menuContainer}>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      router.push("/salud");
                    }}
                  >
                    Salud
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      router.push("/blog");
                    }}
                  >
                    Blog
                  </button>
                </li>
                <div className={header.menuDivider} />
                <li>
                  <button>Reportar un problema</button>
                </li>
                <div className={header.menuDivider} />
                <li>
                  <button
                    style={{ textAlign: "center" }}
                    onClick={() => {
                      setUserInfo({});
                      router.push("/entra");
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
});
// export const EnterpriseHeader = React.memo(() => {
//   const router = useRouter();
//   const wrapperRef = useRef(null);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const { userInfoState } = useContext(MainContext);
//   const [, setUserInfo] = userInfoState;
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setMenuVisible(false);
//       }
//     }

//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [wrapperRef]);
//   return (
//     <header className={header.container}>
//       <div className={header.containerInner}>
//         <div className={header.logoContainer}>
//           <Link to="/">Descubre</Link>
//         </div>
//         <nav className={header.linkContainer}>
//           <Link className={header.link} to="/">
//             <BarChartOutlined size={30} style={{ marginRight: "0.5em" }} />
//             Estadisticas
//           </Link>
//           <Link className={header.link} to="/publish">
//             <FormOutlined size={30} style={{ marginRight: "0.5em" }} />
//             Publicar
//           </Link>
//           <Link className={header.link} to="/data">
//             <DatabaseOutlined size={30} style={{ marginRight: "0.5em" }} />
//             Nuestros datos
//           </Link>
//         </nav>
//         <div className={header.navButtonsContainer}>
//           <button className={header.navButton}>
//             <MessageFilled style={{ fontSize: "1.8em", color: "white" }} />
//           </button>
//           <img src="/icon-lamp-white.png" className={header.icon} />
//           <div className={header.menuWrapper} ref={wrapperRef}>
//             <button
//               onClick={() => {
//                 setMenuVisible(true);
//               }}
//             >
//               {/* <Icon name="bars" size="large" /> */}
//             </button>
//             {menuVisible ? (
//               <div className={header.menuContainer}>
//                 <ul>
//                   <li>
//                     <button
//                       onClick={() => {
//                         router.push("/salud");
//                       }}
//                     >
//                       Salud
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         router.push("/blog");
//                       }}
//                     >
//                       Blog
//                     </button>
//                   </li>
//                   <div className={header.menuDivider} />
//                   <li>
//                     <button>Reportar un problema</button>
//                   </li>
//                   <div className={header.menuDivider} />
//                   <li>
//                     <button
//                       style={{ textAlign: "center" }}
//                       onClick={() => {
//                         setUserInfo({});
//                         router.push("/login");
//                       }}
//                     >
//                       Cerrar Sesión
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// });
export default Header;
