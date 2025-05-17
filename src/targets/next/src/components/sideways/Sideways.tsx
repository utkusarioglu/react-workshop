"use client";

import { use, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import Image from "next/image";
import sidewaysItem from "./SidewaysItem.module.css";
import sideways from "./Sideways.module.css";
import scroll from "@/style/scroll.module.css";

interface SidewaysItem {
  type: "album" | "playlist" | "artist";
  title: string;
  subtitle: string;
  src: string;
}

interface SidewaysProps {
  title: string;
  items: Promise<SidewaysItem[]>;
}

type SidewaysItemProps = SidewaysItem;

const SidewaysItem: FC<SidewaysItemProps> = ({
  type,
  title,
  subtitle,
  src,
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.boundingClientRect.top > 0) {
          setIsFocused(e.isIntersecting);
        }
      },
      {
        threshold: [0.9],
      },
    );

    if (ref.current) {
      observer.observe(ref.current!);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current!);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={sidewaysItem.container}
    >
      <div className={sidewaysItem.artworkContainer}>
        <Image
          src={src}
          alt={`${title} ${subtitle} thumbnail`}
          style={{
            scale: isFocused ? 1 : 0.9,
          }}
          className={[sidewaysItem.artwork, sidewaysItem[type]].join(" ")}
          // TODO magic numbers
          width={1000}
          height={1000}
        />
      </div>
      <hgroup
        className={[sidewaysItem.hGroupTop, sidewaysItem.hGroup].join(" ")}
      >
        <h4>{type}</h4>
      </hgroup>
      <hgroup
        className={[sidewaysItem.hGroupBottom, sidewaysItem.hGroup].join(" ")}
      >
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
      </hgroup>
    </div>
  );
};

export const Sideways: FC<SidewaysProps> = ({ title, items }) => {
  const parent = useRef<HTMLDivElement>(null);
  const child = useRef<HTMLOListElement>(null);
  const [scrollMeter, setScrollMeter] = useState(0);
  const itemsReady = use(items);

  useEffect(() => {
    if (!parent.current || !child.current) {
      return;
    }
    const childWidth = window.innerWidth * (itemsReady.length - 1);
    const things = () => {
      const scroll = parent.current?.scrollLeft || 0;
      const m = 200;
      const rounded = Math.round((scroll / childWidth) * m) / m;
      setScrollMeter(rounded);
    };
    parent.current.addEventListener("scroll", things);

    return () => parent.current?.removeEventListener("scroll", things);
  }, []);

  return (
    <div className={[sideways.container, scroll.headerSnapTarget].join(" ")}>
      <h2 className={sideways.title}>{title}</h2>
      <progress
        value={scrollMeter}
        className={sideways.progress}
      />
      <div
        ref={parent}
        className={sideways.listContainer}
      >
        <ol
          ref={child}
          className={sideways.ol}
        >
          {itemsReady.map((props) => (
            <li key={props.title}>
              <SidewaysItem {...props} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
