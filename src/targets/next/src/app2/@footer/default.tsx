import Image from "next/image";
import { Frame } from "@/components/frame/Frame";
import style from "./default.module.css";

const IMG_SIZE = 40;

export default () => (
  <>
    <Frame position="bottom">
      <Image
        src={`https://picsum.photos/seed/10/${IMG_SIZE}.webp`}
        width={IMG_SIZE}
        height={IMG_SIZE}
        alt="Now playing"
      />
      {/* <div
      style={{
        height: "60px",
        width: "10px",
        backgroundColor: "rgb(var(--color-accent-1-dark-rgb))",
      }}
    /> */}
    </Frame>
    <div className={style.playContainer}>
      <div className={style.play} />
      {/* <svg
        className={style.play}
        width="60"
        height="60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="30"
          cy="30"
          r="28"
          stroke="black"
          strokeWidth="3"
          fill="rgb(var(--color-accent-1-dark-rgb))"
        />
      </svg> */}
    </div>
  </>
);
