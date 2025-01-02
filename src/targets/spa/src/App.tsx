import type { FC } from "react";
import { useDeferredValue, useState } from "react";

interface ListProps {
  input: string;
}

const List: FC<ListProps> = ({ input }) => {
  const deferred = useDeferredValue(input);
  return (
    <div>
      {Array(2e4)
        .fill(null)
        .map((_, i) => (
          <div key={i}>{deferred}</div>
        ))}
    </div>
  );
};

export const App = () => {
  const [text, setText] = useState("");

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <List input={text} />
    </>
  );
};
