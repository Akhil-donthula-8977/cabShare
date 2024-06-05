import { connectDatabase as connectToDB } from "@/lib/db";
import NextAuth from "next-auth"
import UserModel, { User } from "../../../models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthError from "next-auth";
import { Awaitable } from "next-auth";
import { RequestInternal } from "next-auth";
import { redirect } from "next/navigation";
import { NextApiRequest } from "next";
import { ApiError } from "next/dist/server/api-utils";

export const options = {
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
      },  //@ts-ignore
      async authorize(credentials: (credentials: Record<never, string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) => Awaitable<User | null>) {
        try {
          let flag = "";
          await connectToDB();

          //   if(credentials.role=="TEACHER"){
          //     foundUser=await Teacher.findOne({email:credentials.email}).lean().exec()
          //   }
          //   else if(credentials.role=="STUDENT"){
          //     foundUser=await Student.findOne({email:credentials.email}).lean().exec()
          //   }
          //@ts-ignore
          const datafind = await UserModel.findOne({ email: credentials.email, password: credentials.password }).lean().exec()
          if (!datafind) {
            return null;
          }
          if (datafind) {
            //@ts-ignore
            delete datafind?.password;
            return datafind;
          }
        } catch (e: unknown) {
          //@ts-ignore
          return new ApiError(e.message);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      
      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (session?.user) {
        session.user._id = token._id;
      }
    
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
