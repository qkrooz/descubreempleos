import React from "react";
import { red } from "../resources/theme";
const Footer = React.memo(() => {
  return (
    <div style={{ width: "100%", backgroundColor: red }}>Soy el Footer</div>
  );
});
export default Footer;
