"use server";

import { Messages } from "@react-workshop/db";
import type { Message } from "@react-workshop/db";
import { revalidatePath } from "next/cache";

interface State {
  count: number;
  messages: Message[];
}

const FAIL = [{ id: -1, message: "fail", timestamp: Date.now().toString() }];

export async function addMessageAction(state: State, form: FormData) {
  let response;

  try {
    response = await Messages.insert(String(form.get("message")));
  } catch (e) {
    console.error("add", e);
  }

  if (!response) {
    throw new Error("No response");
  }

  revalidatePath("/");

  return {
    ...state,
    count: state.count + response?.length || -1,
    messages: [
      ...state.messages,
      ...(response?.map(({ id, message, timestamp }) => ({
        id,
        message,
        timestamp,
      })) || FAIL),
    ],
  };
}
