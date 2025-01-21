import Link from "next/link";
import style from "./Nav.module.css";

export const HomeLink = () => (
  <Link
    className={style.link}
    href="/"
  >
    Home
  </Link>
);
