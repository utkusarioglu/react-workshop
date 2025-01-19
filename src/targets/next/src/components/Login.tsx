"use client";

import type { FC } from "react";
import { addMessageAction } from "@/actions/db.action";
import { useColor } from "@/store";
import { use, useActionState, useEffect, useRef } from "react";
import type { Message } from "@react-workshop/db";
import { useScrollOffset } from "@react-workshop/hooks";

interface LoginProps {
  initialMessagesPromise: Promise<Message[]>;
}

export const Login: FC<LoginProps> = ({ initialMessagesPromise }) => {
  const messages = use(initialMessagesPromise);
  const { handle, ref } = useScrollOffset(useRef<HTMLInputElement>(null));
  const { setColor, color } = useColor();
  const [state, formAction, isPending] = useActionState(addMessageAction, {
    count: messages.length,
    messages,
  });

  useEffect(() => {
    if (!isPending) {
      handle.current?.scrollOffset(-200);
    }
  }, [isPending]);

  return (
    <>
      <input
        name="accentColor"
        type="color"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
      <hr />
      <button onClick={() => handle.current.scrollOffset(-50)}>Go</button>
      <div style={{ height: "100vh" }} />
      <hr />
      <h1>Count: {state.count}</h1>
      <div>
        {state.messages.map(({ id, message, timestamp }) => (
          <div key={id}>
            {id} - {message} ({new Date(timestamp).toUTCString()})
          </div>
        ))}
      </div>

      <hr />
      <form action={formAction}>
        <input
          ref={ref}
          name="message"
          type="text"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
        >
          Send
        </button>
      </form>
      <div style={{ height: "100vh" }} />
    </>
  );
};
