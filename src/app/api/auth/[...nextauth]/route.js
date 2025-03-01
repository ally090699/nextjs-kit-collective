import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            async authorize(credentials) {
              console.log("Credentials provider called");
              const { username, password } = credentials;
      
              const user = await prisma.users.findUnique({
                where: { 
                  username: username 
                },
                include: {
                  product_reviews: {
                    include: {
                      product: true,
                    }
                  },
                }
              });
      
              if (!user) {
                return null;
              }
              console.log("Prisma User:", user);
              console.log("product reviews: ", user.product_reviews)

              const passwordMatch = await bcrypt.compare(password, user.password_hash);
      
              if (!passwordMatch) {
                return null;
              }
              
              return user;
            },
          }),
        ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({session, token}) {
      if (session?.user && token.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
        if(user){
          token.user = user;
        }
        return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };