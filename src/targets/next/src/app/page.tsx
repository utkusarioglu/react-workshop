"use client";

import { useImperativeHandle, useRef } from "react";
import type { RefObject } from "react";
import "./style.css";

interface WithScrollOffset {
  scrollOffset: (offset: number) => void;
}

function useScrollOffset<T extends HTMLElement | null>(rawRef: RefObject<T>) {
  type WithMethod = T & WithScrollOffset;
  type Enhanced = RefObject<WithMethod>;

  const attach = useRef<T>(null);

  const ref = rawRef as Enhanced;
  useImperativeHandle(
    ref,
    () =>
      ({
        scrollOffset: (offset) => {
          const dims = attach.current!.getBoundingClientRect();
          const top = dims.top + window.scrollY + offset;
          window.scrollTo({
            top,
            behavior: "smooth",
          });
        },
      }) as WithMethod,
    [],
  );

  return {
    ref,
    attach,
  };
}

export default () => {
  const { ref, attach } = useScrollOffset(useRef<HTMLHeadingElement>(null));

  return (
    <>
      <button onClick={() => ref.current.scrollOffset(-100)}>Go</button>
      <div />
      <h1 ref={attach}>Target</h1>
      <div />
    </>
  );
};
