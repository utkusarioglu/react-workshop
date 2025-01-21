export interface RecentItem {
  id: number;
  title: string;
}

const RECENTS: RecentItem[] = [
  {
    id: 1,
    title: "something",
  },
  {
    id: 2,
    title: "another something",
  },
  {
    id: 3,
    title: "cats and dogs",
  },
  {
    id: 4,
    title: "evil bananas",
  },
  {
    id: 5,
    title: "Black death",
  },
  {
    id: 6,
    title: "Dance till you puke",
  },
  {
    id: 7,
    title: "I love bunnies",
  },
  {
    id: 8,
    title: "Blackwater park",
  },
];

export async function getRecents() {
  return new Promise<RecentItem[]>((r) => setTimeout(() => r(RECENTS), 2e3));
}
