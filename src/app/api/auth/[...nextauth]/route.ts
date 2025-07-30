// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }

        return true;
      } catch (err) {
        console.error("Sign-in error:", err);
        return false;
      }
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
