import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

import clientPromise from '@libs/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export const authOptions = {
  // Configure one or more authentication providers
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_KEY,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   async authorize(credentials, req) {},
    // }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
