import React from "react";
// style
import style from "../../../styles/loadingscreen.module.css";
export default function LoadingScreen({ visible }) {
  if (visible) {
    return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <div className={style.loader}>Loading...</div>
          <img src="./favicon.png" alt="descubrelogo" />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
