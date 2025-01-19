import { Login } from "@/components/Login";
import { Color } from "@/components/Color";
import { Messages } from "@react-workshop/db";
import { Suspense } from "react";

export default () => {
  const initialMessagesPromise = Messages.select();

  return (
    <div>
      aaaaa
      <Color />
      <Suspense fallback={<h3>Loading db</h3>}>
        <Login initialMessagesPromise={initialMessagesPromise} />
      </Suspense>
    </div>
  );
};
