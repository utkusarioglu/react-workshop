import type { FC, PropsWithChildren, ReactNode } from "react";
import "./reset.css";
import "./vars.css";
import style from "./layout.module.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "100",
  subsets: ["latin", "latin-ext"],
});

interface LayoutProps {
  header: ReactNode;
  footer: ReactNode;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  header,
  footer,
}) => {
  return (
    <html>
      <body className={roboto.className}>
        <main>
          {header}
          <div className={style.container}>{children}</div>
          {footer}
        </main>
      </body>
    </html>
  );
};

export default Layout;
