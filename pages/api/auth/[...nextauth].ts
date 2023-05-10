import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';

import clientPromise from '@libs/mongodb';
import dbConnect from '@libs/mongoose';
import User from '@models/user';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export const authOptions = {
  // Configure one or more authentication providers
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_KEY,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credentials, req) {
        console.log("cred: ", credentials);
        console.log("req: ", req);
        await dbConnect();
        //@ts-ignore
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        console.log("user", user);
        if (!user) {
          throw new Error("Invalid Email or Password");
          return null;
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
