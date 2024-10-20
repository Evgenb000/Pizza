import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<Props> = ({
  className,
  width = 48,
  height = 48,
}) => {
  return (
    <div className={cn("", className)}>
      <Image
        src={
          "https://img.icons8.com/?size=100&id=SFcWbNyRIEu1&format=png&color=000000"
        }
        alt={"Logo"}
        width={width}
        height={height}
      />
    </div>
  );
};
