"use client";

import { SessionProvider, getSession } from "next-auth/react";

export const AuthProvider = ({ children, session }: any) => {
  const getLayout = children.getLayout || ((page: any) => page);
  return getLayout(
    <SessionProvider session={session}>{children}</SessionProvider>
  );
};

AuthProvider.getInitialProps = async (context: any) => {
  const { ctx } = context;
  const session = await getSession(ctx);

  return {
    session,
  };
};
