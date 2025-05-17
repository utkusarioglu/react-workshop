import { getRecents } from "@/actions/recents.action";
import { Recent } from "@/components/recent/Recent";
import { RecentSkeleton } from "@/components/recent/Recent.skeleton";
import { Greeting } from "@/components/greeting/Greeting";
import { Suspense } from "react";
import { Sideways } from "@/components/sideways/Sideways";

export default () => {
  const r = getRecents();
  const sideways = Promise.resolve([
    {
      type: "album" as "album",
      title: "One album",
      subtitle: "Some artist",
      src: "https://picsum.photos/seed/1/1000.webp",
    },
    {
      type: "artist" as "artist",
      title: "Hot stuff",
      subtitle: "1 new release",
      src: "https://picsum.photos/seed/2/1000.webp",
    },
    {
      type: "playlist" as "playlist",
      title: "big songs",
      subtitle: "444 songs",
      src: "https://picsum.photos/seed/3/1000.webp",
    },
    {
      type: "artist" as "artist",
      title: "Hot stuff 2",
      subtitle: "2 new releases",
      src: "https://picsum.photos/seed/4/1000.webp",
    },
    {
      type: "album" as "album",
      title: "One album 2",
      subtitle: "Some artist yea",
      src: "https://picsum.photos/seed/5/1000.webp",
    },
    {
      type: "playlist" as "playlist",
      title: "big songs 2",
      subtitle: "443 songs",
      src: "https://picsum.photos/seed/6/1000.webp",
    },
  ]);

  return (
    <div>
      <Greeting />
      <Suspense fallback={<RecentSkeleton />}>
        <Recent recents={r} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Sideways
          title="Jump back into"
          items={sideways}
        />
      </Suspense>

      <Suspense fallback={<RecentSkeleton />}>
        <Recent recents={r} />
      </Suspense>

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
