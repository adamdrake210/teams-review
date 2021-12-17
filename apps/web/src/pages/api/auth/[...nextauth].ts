import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,

  // callbacks: {
  //   // async signIn(user, account, profile) { return true },
  //   async redirect(url, baseUrl) {
  //     return url.startsWith(baseUrl) ? url : baseUrl;
  //   },
  //   async session(session, token) {
  //     // Add property to session, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     // Add access_token to the token right after signin
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //     }
  //     return token;
  //   },
  // },
};
