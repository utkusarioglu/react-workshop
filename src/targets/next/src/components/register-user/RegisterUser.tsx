"use client";

import type { FC } from "react";
import { use, useActionState, useOptimistic } from "react";
import {
  // userInsertInitialState,
  userInsertOneAction,
} from "@/actions/user.action";
import type { getAllUsers, UserInsert } from "@/actions/user.action";

export const userInsertInitialState: UserInsert = {
  form: {
    username: "mrcatdog",
    password: "woof",
    email: "cat@dog.com",
    first_name: "mrcat",
    last_name: "mrmew",
  },
  response: {
    id: -1,
    creation_date: 0,
  },
};

type Unwrap<T> = T extends Promise<infer F> ? F : T;

interface RegisterUserProps {
  users: Unwrap<ReturnType<typeof getAllUsers>>;
}

export const RegisterUser: FC<RegisterUserProps> = ({ users }) => {
  const [{ form, response }, fa, isPending] = useActionState(
    userInsertOneAction,
    userInsertInitialState,
  );

  return (
    <>
      <div>
        <div>id: {response.id}</div>
        <div>creation: {String(response.creation_date)}</div>
      </div>
      <form action={fa}>
        <fieldset>
          <legend>Login details</legend>
          <div>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              defaultValue={form.username}
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              defaultValue={form.password}
              disabled={isPending}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Additional</legend>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={form.email}
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="first-name">First Name</label>
            <input
              name="first-name"
              type="text"
              defaultValue={form.first_name}
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="last-name"> Last Name</label>
            <input
              name="last-name"
              type="text"
              defaultValue={form.last_name}
              disabled={isPending}
            />
          </div>
        </fieldset>
        <button type="submit">Register</button>
      </form>
      <div></div>
      {users.map((props) => (
        <div key={props.id}>
          {Object.entries(props).map(([key, value]) => (
            <div key={key}>
              {key}: {new Date(value).toISOString()}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
