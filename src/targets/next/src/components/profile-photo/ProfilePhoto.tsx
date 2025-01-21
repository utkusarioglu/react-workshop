import Image from "next/image";
import type { FC } from "react";
import style from "./ProfilePhoto.module.css";

interface ProfilePhotoProps {
  id: string;
}

const AVATAR_SIZE = 40;

export const ProfilePhoto: FC<ProfilePhotoProps> = ({ id }) => (
  <Image
    className={style.image}
    src={`https://picsum.photos/seed/${id}/${AVATAR_SIZE}.webp`}
    width={AVATAR_SIZE}
    height={AVATAR_SIZE}
    alt="Profile image"
  />
);
