"use client";

import { selectColor } from "@/store";

export const Color = () => {
  const color = selectColor();

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: color,
      }}
    />
  );
};
