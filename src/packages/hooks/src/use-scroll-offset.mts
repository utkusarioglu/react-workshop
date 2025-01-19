import type { RefObject } from "react";
import { useImperativeHandle, useRef } from "react";

interface WithScrollOffset {
  scrollOffset: (offset: number) => void;
}

export function useScrollOffset<T extends HTMLElement>(
  rawRef: RefObject<T | null>,
) {
  type WithHandle = T & WithScrollOffset;
  type RefWithHandle = RefObject<WithHandle>;

  const ref = useRef<T>(null);
  const handle = rawRef as RefWithHandle;

  useImperativeHandle(handle, () => {
    return {
      scrollOffset: (offset: number) => {
        const dims = ref.current!.getBoundingClientRect();
        const top = window.scrollY + dims.top + offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      },
    } as WithHandle;
  }, []);

  return {
    handle,
    ref,
  };
}
