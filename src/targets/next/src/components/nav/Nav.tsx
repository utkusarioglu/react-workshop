import Link from "next/link";
import style from "./Nav.module.css";

const LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Playing",
    href: "/playing",
  },
  {
    title: "Users",
    href: "/users",
  },
];

export const Nav = () => (
  <nav>
    <ul className={style.ul}>
      {LINKS.map(({ title, href }) => (
        <li
          key={title}
          className={style.li}
        >
          <Link
            className={style.link}
            href={href}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
