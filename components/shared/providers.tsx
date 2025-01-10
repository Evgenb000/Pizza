"use client";

import NextTopLoader from "nextjs-toploader";
import React from "react";
import { SessionProvider } from "next-auth/react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextTopLoader />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};
