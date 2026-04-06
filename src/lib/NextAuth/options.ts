import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "@/helpers/fetcher";
import { getClientIP } from "@/helpers/clientIP";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email / Username", type: "text" },
        password: { label: "Password", type: "password" },
        user_agent: { label: "User Agent", type: "text" },
        ip_address: { label: "IP Address", type: "text" },
      },

      async authorize(credentials, req) {
        console.log("🔐 Direct Login authorize() called");

        try {
          const res = await fetcher({
            method: "POST",
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
              user_agent: credentials?.user_agent,
              ip_address: credentials?.ip_address || (await getClientIP()),
              endpointUrlPath: "/api/auth/login", // 🔥 PASSWORD LOGIN API
            }),
          });
          console.log("LOGIN RESPONSE 👉", res);
          if (res?.data?.status === 200 && res?.data?.data) {
            return res.data.data; // user object
          }

          throw new Error(res?.data?.message || "Invalid credentials");
        } catch (error: any) {
          console.error("❌ Login failed:", error.message);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "defaultsecret",

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
