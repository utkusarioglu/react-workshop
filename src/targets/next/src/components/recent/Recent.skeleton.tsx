import style from "./Recent.module.css";
import recentCard from "./RecentCard.module.css";
import { THUMB_SIZE } from "./constants";

const RecentCardSkeleton = () => (
  <div className={recentCard.container}>
    <div
      className={recentCard.image}
      style={{
        // @ts-expect-error
        "--size-px": `${THUMB_SIZE}px`,
      }}
    />
  </div>
);

export const RecentSkeleton = () => {
  return (
    <ol className={[style.ol, style.mask].join(" ")}>
      {Array(8)
        .fill(null)
        .map((_, id) => (
          <li key={id}>
            <RecentCardSkeleton />
          </li>
        ))}
    </ol>
  );
};
