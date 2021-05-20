import Link from "next/link";
import style from "../../styles/button.module.css";
export default function Button({ onClick, title, color, link, href, type }) {
  if (!link) {
    return (
      <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className={style.button}
        type={type}
      >
        {title}
      </button>
    );
  } else {
    return (
      <div style={{ backgroundColor: color }} className={style.button}>
        <Link href={href}>{title ? title : ""}</Link>
      </div>
    );
  }
}
