import type { FC, PropsWithChildren } from "react";
import style from "./frame.module.css";

interface FrameProps {
  position: "top" | "bottom";
}

export const Frame: FC<PropsWithChildren<FrameProps>> = ({
  position,
  children,
}) => {
  const top = position === "top";

  return (
    <div
      className={style.container}
      style={{
        // @ts-expect-error
        "--top-transparency": +top,
        "--bottom-transparency": +!top,
        "--top": !top ? "auto" : 0,
        "--bottom": !!top ? "auto" : 0,
      }}
    >
      {children}
    </div>
  );
};
