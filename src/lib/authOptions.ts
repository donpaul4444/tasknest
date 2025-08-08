// lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import type { NextAuthOptions, Session } from "next-auth";

// Extend the Session user type to include _id
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      _id?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
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
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
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

    async session({ session }) {
      await connectToDB();
      const dbUser = await User.findOne({ email: session.user?.email });
      if (dbUser) {
        // Add custom fields to session
        if (session.user) {
          session.user._id = dbUser._id.toString();
        }
      }
      return session;
    },
  },
};
