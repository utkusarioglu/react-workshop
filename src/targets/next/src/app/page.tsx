import { getRecents } from "@/actions/recents.action";
import { Recent } from "@/components/recent/Recent";
import { RecentSkeleton } from "@/components/recent/Recent.skeleton";
import { Greeting } from "@/components/greeting/Greeting";
import { Suspense } from "react";

export default () => {
  const r = getRecents();

  return (
    <div>
      <Greeting />
      <Suspense fallback={<RecentSkeleton />}>
        <Recent recents={r} />
      </Suspense>

      <hr />

      <ol>
        {Array(100)
          .fill(null)
          .map((_, i) => (
            <li key={i}>{i}</li>
          ))}
      </ol>
    </div>
  );
};
