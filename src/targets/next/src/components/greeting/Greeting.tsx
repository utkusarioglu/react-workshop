import scroll from "@/style/scroll.module.css";
import style from "./Greeting.module.css";

export const Greeting = () => (
  <h1 className={[style.title, scroll.headerSnapTarget].join(" ")}>
    Good Morning
  </h1>
);
