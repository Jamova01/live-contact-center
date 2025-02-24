import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 40,
  className = "",
}) => {
  const getInitialsAvatarUrl = (name: string) => {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=ffdfeb&textColor=ff5f7e&size=${size}`;
  };

  const avatarUrl = src || getInitialsAvatarUrl(alt);

  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={avatarUrl}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
        unoptimized={true}
      />
    </div>
  );
};
