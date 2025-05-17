import Image from "next/image";
import recentStyles from "./Recent.module.css";
import scroll from "@/style/scroll.module.css";
import recentCardStyles from "./RecentCard.module.css";
import animationStyles from "@/style/fade-in.module.css";
import { use } from "react";
import type { FC } from "react";
import type { RecentItem } from "@/actions/recents.action";
import { THUMB_SIZE } from "./constants";

type RecentCardProps = RecentItem;

const RecentCard: FC<RecentCardProps> = ({ id, title }) => (
  <div className={recentCardStyles.container}>
    <Image
      className={[recentCardStyles.image, animationStyles.fadeIn].join(" ")}
      style={{
        // @ts-expect-error
        "--size-px": `${THUMB_SIZE}px`,
      }}
      width={THUMB_SIZE}
      height={THUMB_SIZE}
      alt="Album art"
      src={`https://picsum.photos/seed/${id}/60/60.webp`}
    />
    <span className={animationStyles.fadeIn}>{title}</span>
  </div>
);

interface RecentProps {
  recents: Promise<RecentItem[]>;
}

export const Recent: FC<RecentProps> = ({ recents }) => {
  return (
    <ol className={[recentStyles.ol, scroll.headerSnapTarget].join(" ")}>
      {use(recents).map(({ id, title }) => (
        <li key={id}>
          <RecentCard
            id={id}
            title={title}
          />
        </li>
      ))}
    </ol>
  );
};
