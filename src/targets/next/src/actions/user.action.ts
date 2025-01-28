"use server";

import { User } from "@react-workshop/db";
import type {
  UserInsertOneParams,
  UserInsertOneReturn,
} from "@react-workshop/db";

export type UserInsert = {
  form: UserInsertOneParams;
  response: UserInsertOneReturn;
};

export async function getAllUsers() {
  const response = await User.selectAll();
  return response.rows;
}

export async function userInsertOneAction(
  _state: UserInsert,
  form: FormData,
): Promise<UserInsert> {
  const params: UserInsertOneParams = {
    username: String(form.get("username")),
    password: String(form.get("password")),
    email: String(form.get("email")),
    first_name: String(form.get("first-name")),
    last_name: String(form.get("last-name")),
  };
  const response = await User.insertOne(params);
  const row = response.rows[0];
  if (!row) {
    throw new Error(`Returned empty row from user insert`);
  }

  return {
    form: params,
    response: {
      id: row.id,
      creation_date: row.creation_date,
    },
  };
}
