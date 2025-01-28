"use server";

import { getAllUsers } from "@/actions/user.action";
import { RegisterUser } from "@/components/register-user/RegisterUser";
import { Suspense } from "react";

export default async () => {
  const users = await getAllUsers();

  return (
    <div>
      <Suspense fallback={<h1>L</h1>}>
        <RegisterUser users={users} />
      </Suspense>
    </div>
  );
};
