import type { FC, PropsWithChildren } from "react";
import { Frame } from "@/components/frame/Frame";
import { ProfilePhoto } from "@/components/profile-photo/ProfilePhoto";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Frame position="top">
      <ProfilePhoto id="4" />
      {children}
    </Frame>
  );
};

export default Layout;
